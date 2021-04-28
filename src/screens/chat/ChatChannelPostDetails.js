import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
import { FontAwesome5 } from '@expo/vector-icons';
import { useChannelPostsStore } from '../../context/ChannelPostsStore';
import Alert from '../../components/Alert';
import PostsAPI from '../../lib/apiV2/PostsAPI';
import PostCommentsAPI from '../../lib/apiV2/PostCommentsAPI';
import useCurrentUser from '../../lib/apiV2/useCurrentUser';

function ChatChannelPostDetails({ navigation, route }) {
  const { postIndex, channelName } = route.params;
  const [inputHeight, setInputHeight] = useState();
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const [posts, setPosts, editingPostIndex] = useChannelPostsStore();
  const user = useCurrentUser();
  const post = posts[postIndex];

  useEffect(() => {
    (async () => {
      const res = await PostCommentsAPI.getForPost(post.id);
      if (!res.error) {
        setComments(
          res.data.map((comment) => ({
            id: comment.id,
            authorName: `${comment.authorInfo.nombre} ${
              comment.authorInfo.apellido_paterno ?? ''
            } ${comment.authorInfo.apellido_materno ?? ''}`,
            date: comment.creation_timestamp,
            content: comment.comment_text,
          }))
        );
      }
    })();
  }, []);

  navigation.setOptions({
    headerTitle: channelName,
  });

  const onEditPress = () => {
    editingPostIndex.current = postIndex;
    navigation.navigate('ChatChannelCreatePost', {
      post,
    });
  };

  const onDeletePress = () => {
    Alert.alert('Confirmar', '¿Seguro que deseas borrar esta publicación?', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: null,
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          const id = posts[postIndex].id;
          const res = await PostsAPI.remove(id);
          if (!res.error) {
            setPosts((prev) => prev.filter((post) => post.id !== id));
            navigation.goBack();
          }
        },
      },
    ]);
  };

  const onReplyPress = useCallback(async () => {
    const res = await PostCommentsAPI.add({
      authorID: user.id,
      postID: post.id,
      text,
    });
    if (!res.error) {
      const now = new Date();
      setComments((prev) => [
        {
          id: res.data,
          authorName:
            `${user.nombre} ${user.apellido_paterno} ` +
            (user.apellido_materno ?? ''),
          date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
          content: text,
        },
        ...prev,
      ]);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, commentCount: p.commentCount + 1 } : p
        )
      );
    }
    setText('');
  }, [user, text]);

  return (
    <>
      <ScrollView
        style={styles.root}
        contentContainerStyle={{ paddingBottom: 60 }}>
        <ChatChannelPost
          post={post}
          showComments={true}
          comments={comments}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
        />
      </ScrollView>
      <View style={styles.replyContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { minHeight: inputHeight }]}
            placeholder="Escribir mensaje..."
            multiline
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
            value={text}
            onChangeText={setText}
          />
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={onReplyPress}>
          <FontAwesome5 name="reply" size={14} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}

ChatChannelPostDetails.propTypes = {
  ...NavigationProps,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#EDEDED',
    paddingTop: 10,
    flex: 1,
  },
  replyContainer: {
    flexDirection: 'row',
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#D6D6D6',
    alignItems: 'flex-end',
  },
  input: {
    outlineWidth: 0,
  },
  inputContainer: {
    backgroundColor: '#E7E7E7',
    padding: 10,
    borderRadius: 6,
    flex: 1,
  },
  iconContainer: {
    backgroundColor: '#002E60',
    borderRadius: 19,
    width: 38,
    height: 38,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
});

export default React.memo(ChatChannelPostDetails);
