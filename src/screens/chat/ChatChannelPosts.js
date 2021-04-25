import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
import { FontAwesome5 } from '@expo/vector-icons';
import PostsAPI from '../../lib/apiV2/PostsAPI';

function ChatChannelPosts({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  const { channelName, channelID, groupID } = route.params;

  useEffect(() => {
    (async () => {
      const res = await PostsAPI.allByChannel(channelID);
      if (!res.error) {
        setPosts(
          res.data.map((post) => ({
            authorName: `${post.authorInfo.nombre} ${
              post.authorInfo.apellido_paterno ?? ''
            } ${post.authorInfo.apellido_materno ?? ''}`,
            date: post.creation_timestamp,
            textContent: post.post_text,
            comments: [],
            attachments: post.post_files,
          }))
        );
      }
    })();
  }, []);

  const onNewPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  navigation.setOptions({
    headerTitle: channelName,
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatChannelCreatePost', {
            groupID,
            channelID,
            onNewPost,
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
      post: posts[idx],
      channelName,
    });
  };

  return (
    <ScrollView style={styles.root}>
      {posts.map((post, idx) => (
        <>
          <View style={styles.postSeparator} />
          <ChatChannelPost post={post} onPress={() => onPostPress(idx)} />
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
