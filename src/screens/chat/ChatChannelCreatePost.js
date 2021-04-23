import * as React from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from '../../components';
import ChatChannelCreatePostOptionRow from '../../components/chat/ChatChannelCreatePostOptionRow';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
import useCurrentUser from '../../lib/apiV2/useCurrentUser';
import PostsAPI from '../../lib/apiV2/PostsAPI';

function ChatChannelCreatePost({ navigation, route }) {
  const [text, setText] = useState('');
  const { channelID, onNewPost } = route.params;
  const user = useCurrentUser();

  navigation.setOptions({
    headerTitle: 'Crear Publicación',
  });

  const onCameraPress = () => {};
  const onFilePress = () => {};
  const onMessageCreatePress = useCallback(async () => {
    const res = await PostsAPI.add({
      text,
      authorID: user.id,
      channelOwnerID: channelID,
      fileIDs: [],
    });

    if (res) {
      const now = new Date();
      onNewPost({
        authorName:
          `${user.nombre} ${user.apellido_paterno} ` +
          (user.apellido_materno ?? ''),
        date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        textContent: text,
        comments: [],
        attachments: [],
      });
      navigation.goBack();
    }
  }, [text, user]);

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
