import * as React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import ChatChannelPost from '../../components/chat/ChatChannelPost';
import { NavigationProps } from '../../navigation/NavigationPropTypes';
import { FontAwesome5 } from '@expo/vector-icons';

const mockPosts = [
  {
    authorName: 'Daniel Gaytan',
    date: new Date(),
    textContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida sit amet dolor eget commodo. Ut diam dui, auctor et tempus sed, egestas venenatis dui.',
    comments: [],
    attachments: [],
  },
  {
    authorName: 'Patricio Saldivar',
    date: new Date(),
    textContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida sit amet dolor eget commodo.',
    comments: new Array(3),
    attachments: [],
  },
  {
    authorName: 'César Gaytan',
    date: new Date(),
    textContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    comments: new Array(1),
    attachments: [
      {
        type: 'image',
        url:
          'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        type: 'video',
        url:
          'https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Perfect-Sunset-Nature-Background-Image.jpeg',
      },
      {
        type: 'image',
        url:
          'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        type: 'image',
        url:
          'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      {
        type: 'image',
        url:
          'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
    ],
  },
  {
    authorName: 'César Barraza',
    date: new Date(),
    textContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    comments: new Array(1),
    attachments: [
      {
        type: 'document',
        url: 'http://test.com/asdf/arch.pdf',
      },
      {
        type: 'document',
        url: 'http://test2.com/asdf/fdas/arch2.pptx',
      },
    ],
  },
];

function ChatChannelPosts({ navigation, route }) {
  navigation.setOptions({
    headerTitle: route.params.channelName,
    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatChannelCreatePost', {
            groupID: route.params.groupID,
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

  return (
    <ScrollView style={styles.root}>
      {mockPosts.map((post) => (
        <>
          <View style={styles.postSeparator} />
          <ChatChannelPost post={post} />
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
