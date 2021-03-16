import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';

const mockPost = {
  authorName: 'Daniel Gaytan',
  date: new Date(),
  textContent:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida sit amet dolor eget commodo. Ut diam dui, auctor et tempus sed, egestas venenatis dui.',
  comments: [],
};

function ChatChannelPosts() {
  return (
    <View style={styles.root}>
      <ChatChannelPost post={mockPost} />
    </View>
  );
}

ChatChannelPosts.propTypes = {
  ...NavigationProps,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#EDEDED',
  },
});

export default React.memo(ChatChannelPosts);
