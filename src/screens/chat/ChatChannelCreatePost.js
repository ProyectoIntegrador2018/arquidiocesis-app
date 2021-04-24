import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from '../../components';
import ChatChannelCreatePostOptionRow from '../../components/chat/ChatChannelCreatePostOptionRow';
import { NavigationProps } from '../../navigation/NavigationPropTypes';

function ChatChannelCreatePost({ navigation }) {
  const [text, setText] = useState('');

  navigation.setOptions({
    headerTitle: 'Crear Publicación',
  });

  const onCameraPress = () => {};
  const onFilePress = () => {};
  const onMessageCreatePress = () => {};

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="Escribir mensaje..."
        value={text}
        onChangeText={(text) => setText(text)}
        multiline={true}
      />

      <View style={styles.separator} />

      <ChatChannelCreatePostOptionRow
        iconName="camera"
        title="Agregar foto/video"
        onPress={onCameraPress}
      />
      <ChatChannelCreatePostOptionRow
        iconName="paperclip"
        title="Agregar archivo"
        onPress={onFilePress}
        hasTopBorder={false}
      />

      <Button
        style={styles.createButton}
        text="Nuevo Mensaje"
        onPress={onMessageCreatePress}
      />
    </View>
  );
}

ChatChannelCreatePost.propTypes = {
  ...NavigationProps,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#EDEDED',
    paddingTop: 10,
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    height: 160,
    padding: 12,
    outlineWidth: 0,
  },
  separator: {
    height: 12,
    backgroundColor: '#EDEDED',
  },
  createButton: {
    width: 250,
    alignSelf: 'center',
    backgroundColor: '#EDEDED',
  },
});

export default React.memo(ChatChannelCreatePost);
