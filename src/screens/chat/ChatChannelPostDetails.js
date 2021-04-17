import * as React from 'react';
import { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
//import { FontAwesome5 } from '@expo/vector-icons';

function ChatChannelPostDetails({ navigation, route }) {
  const { post, channelName } = route.params;
  const [inputHeight, setInputHeight] = useState();

  navigation.setOptions({
    headerTitle: channelName,
  });

  return (
    <View style={styles.root}>
      <ChatChannelPost post={post} showComments={true} />
      <View style={styles.replyContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ minHeight: inputHeight }}
            placeholder="Escribir mensaje..."
            multiline
            onContentSizeChange={(event) =>
              setInputHeight(event.nativeEvent.contentSize.height)
            }
          />
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
  replyContainer: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#D6D6D6',
  },
  inputContainer: {
    backgroundColor: '#E7E7E7',
    padding: 10,
    borderRadius: 6,
  },
});

export default React.memo(ChatChannelPostDetails);
