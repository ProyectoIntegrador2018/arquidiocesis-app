import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button } from '../../components';
import ChatChannelCreatePostOptionRow from '../../components/chat/ChatChannelCreatePostOptionRow';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
import useCurrentUser from '../../lib/apiV2/useCurrentUser';
import PostsAPI from '../../lib/apiV2/PostsAPI';
import { useChannelPostsStore } from '../../context/ChannelPostsStore';
import Alert from '../../components/Alert';

function ChatChannelCreatePost({ navigation, route }) {
  const [text, setText] = useState('');
  const { channelID, post } = route.params;
  const [, setPosts, editingPostIndex] = useChannelPostsStore();

  const user = useCurrentUser();

  useEffect(() => {
    if (post != null) {
      setText(post.textContent);
    }
  }, [post]);

  navigation.setOptions({
    headerTitle: 'Crear Publicación',
  });

  const onCameraPress = () => {};
  const onFilePress = () => {};
  const onMessageCreatePress = useCallback(async () => {
    if (text === '') {
      Alert.alert(
        'Llenar publicación',
        'Una publicación no puede estar vacía.'
      );
      return;
    }

    if (post == null) {
      // post is null, so we're creating a new one
      const res = await PostsAPI.add({
        text,
        authorID: user.id,
        channelOwnerID: channelID,
        fileIDs: [],
      });

      if (res) {
        const now = new Date();
        setPosts((prev) => [
          {
            id: res.data,
            authorName:
              `${user.nombre} ${user.apellido_paterno} ` +
              (user.apellido_materno ?? ''),
            date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
            textContent: text,
            comments: [],
            attachments: [],
          },
          ...prev,
        ]);
      }
    } else {
      // post is not null so we're editing an existing one
      const res = await PostsAPI.edit({ id: post.id, fileIDs: [], text });

      if (res) {
        const modifiedIndex = editingPostIndex.current;
        editingPostIndex.current = -1;
        setPosts((prev) =>
          prev.map((curr, idx) =>
            idx === modifiedIndex
              ? {
                  ...curr,
                  ...{
                    textContent: text,
                    attachments: [],
                  },
                }
              : curr
          )
        );
      }
    }

    navigation.goBack();
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
        text={post == null ? 'Nuevo Mensaje' : 'Editar Mensaje'}
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
