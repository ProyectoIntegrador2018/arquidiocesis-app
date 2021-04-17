import * as React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
//import { FontAwesome5 } from '@expo/vector-icons';

function ChatChannelPostDetails({ navigation, route }) {
  const { post, channelName } = route.params;

  navigation.setOptions({
    headerTitle: channelName,
  });

  return (
    <View style={styles.root}>
      <ChatChannelPost post={post} showComments={true} />
      <View style={styles.replyContainer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Escribir mensaje..." />
        </View>
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
});

export default React.memo(ChatChannelPostDetails);
