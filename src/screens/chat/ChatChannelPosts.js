import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Alert from '../../components/Alert';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
import { FontAwesome5 } from '@expo/vector-icons';
import PostsAPI from '../../lib/apiV2/PostsAPI';
import { useChannelPostsStore } from '../../context/ChannelPostsStore';

function ChatChannelPosts({ navigation, route }) {
  const [posts, setPosts, editingPostIndex] = useChannelPostsStore();
  const { channelName, channelID, groupID } = route.params;

  useEffect(() => {
    (async () => {
      const res = await PostsAPI.allByChannel(channelID);
      if (!res.error) {
        setPosts(
          res.data.map((post) => ({
            id: post.id,
            authorName: `${post.authorInfo.nombre} ${
              post.authorInfo.apellido_paterno ?? ''
            } ${post.authorInfo.apellido_materno ?? ''}`,
            date: new Date(post.creation_timestamp._seconds * 1000),
            textContent: post.post_text,
            attachments: post.post_files,
            commentCount: (post.post_comments ?? []).length,
          }))
        );
      }
    })();
  }, []);

  navigation.setOptions({
    headerTitle: channelName,
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatChannelCreatePost', {
            groupID,
            channelID,
          })
        }>
        <View
          style={{
            marginRight: 16,
          }}>
          <FontAwesome5 name="plus" solid size={18} color="white" />
        </View>
      </TouchableOpacity>
    ),
  });

  const onPostPress = (idx) => {
    navigation.navigate('ChatChannelPostDetails', {
      postIndex: idx,
      channelName,
    });
  };

  const onEditPostPress = (idx) => {
    editingPostIndex.current = idx;
    navigation.navigate('ChatChannelCreatePost', {
      post: posts[idx],
    });
  };

  const onDeletePostPress = (idx) => {
    Alert.alert('Confirmar', '¿Seguro que deseas borrar esta publicación?', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: null,
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          const id = posts[idx].id;
          const res = await PostsAPI.remove(id);
          if (!res.error) {
            setPosts((prev) => prev.filter((post) => post.id !== id));
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.root}>
      {posts
        .sort((first, second) => second.date - first.date)
        .map((post, idx) => (
          <>
            <View style={styles.postSeparator} />
            <ChatChannelPost
              post={post}
              onPress={() => onPostPress(idx)}
              onEditPress={() => onEditPostPress(idx)}
              onDeletePress={() => onDeletePostPress(idx)}
            />
          </>
        ))}
    </ScrollView>
  );
}

ChatChannelPosts.propTypes = {
  ...NavigationProps,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#EDEDED',
  },
  postSeparator: {
    height: 10,
  },
});

export default React.memo(ChatChannelPosts);
