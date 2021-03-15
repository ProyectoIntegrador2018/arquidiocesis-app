import * as React from 'react';
import { View } from 'react-native';
import { NavigationProps } from '../../navigation/NavigationPropTypes';

function ChatChannelPosts() {
  return <View />;
}

ChatChannelPosts.propTypes = {
  ...NavigationProps,
};

// const styles = StyleSheet.create({});

export default React.memo(ChatChannelPosts);
