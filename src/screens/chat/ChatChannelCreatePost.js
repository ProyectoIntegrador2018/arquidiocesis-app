import * as React from 'react';
import { StyleSheet, View } from 'react-native';

function ChatChannelCreatePost() {
  return <View style={styles.root}></View>;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#EDEDED',
    paddingTop: 10,
  },
});

export default React.memo(ChatChannelCreatePost);
