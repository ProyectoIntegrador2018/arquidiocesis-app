import * as React from 'react';
import { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
import { FontAwesome5 } from '@expo/vector-icons';
import { useChannelPostsStore } from '../../context/ChannelPostsStore';
import Alert from '../../components/Alert';
import PostsAPI from '../../lib/apiV2/PostsAPI';

function ChatChannelPostDetails({ navigation, route }) {
  const { postIndex, channelName } = route.params;
  const [inputHeight, setInputHeight] = useState();
  const [posts, setPosts, editingPostIndex] = useChannelPostsStore();
  const post = posts[postIndex];

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

  return (
    <View style={styles.root}>
      <ChatChannelPost
        post={post}
        showComments={true}
        onEditPress={onEditPress}
        onDeletePress={onDeletePress}
      />
      <View style={styles.replyContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { minHeight: inputHeight }]}
            placeholder="Escribir mensaje..."
            multiline
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
          />
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome5 name="reply" size={14} color="white" />
        </TouchableOpacity>
      </View>
    </View>
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