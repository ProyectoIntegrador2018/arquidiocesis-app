import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';

function ChatChannelPostDetails({ navigation, route }) {
  const { post, channelName } = route.params;

  navigation.setOptions({
    headerTitle: channelName,
  });

  return (
    <View style={styles.root}>
      <ChatChannelPost post={post} showComments={true} />
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
});

export default React.memo(ChatChannelPostDetails);
