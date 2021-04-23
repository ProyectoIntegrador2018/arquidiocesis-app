import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import ChatChannelAttachment from './ChatChannelAttachment';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ChatChannelPostComment from './ChatChannelPostComment';
const ATTACHMENT_SIZE = 128;

const mockComments = [
  {
    authorName: 'Patricio Saldivar',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida sit amet dolor eget commodo.',
    date: new Date(),
  },
  {
    authorName: 'Daniel Gaytan',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida sit amet dolor eget commodo. Ut diam dui, auctor et tempus sed, egestas venenatis dui.',
    date: new Date(),
  },
];

function ChatChannelPost({ post, onPress, showComments = false }) {
  let attachments = post.attachments;
  let extraAttachments = 0;
  if (post.attachments.length > 2) {
    attachments = post.attachments.slice(0, 2);
    extraAttachments = post.attachments.length - 2;
  }

  return (
    <View style={styles.root}>
      <View
        style={[styles.content, { borderBottomWidth: showComments ? 1 : 0 }]}>
        <View style={styles.header}>
          <Text style={styles.authorLabel}>{post.authorName}</Text>
          <Menu style={{ maxWidth: 100 }}>
            <MenuTrigger>
              <FontAwesome5 name="ellipsis-h" size={16} color="black" light />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption text="Editar" />
              <MenuOption>
                <Text style={{ color: 'red' }}>Borrar</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <Text style={styles.dateLabel}>{post.date}</Text>
        <Text style={styles.textContentLabel}>{post.textContent}</Text>
        {attachments.length > 0 && (
          <View style={styles.attachmentsContainer}>
            {attachments.map((attachment, idx) => (
              <>
                <View style={{ width: idx === 0 ? 0 : 8 }} />
                <ChatChannelAttachment
                  key={idx}
                  attachment={attachment}
                  size={ATTACHMENT_SIZE}
                />
              </>
            ))}
            {extraAttachments > 0 && (
              <View style={styles.attachmentPlaceholder}>
                <Text style={styles.attachmentPlaceholderLabel}>
                  +{extraAttachments}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>

      {showComments ? (
        mockComments.map((comment, idx) => (
          <ChatChannelPostComment key={idx} comment={comment} />
        ))
      ) : (
        <View style={styles.footer}>
          <View style={styles.footerSection}>
            <FontAwesome5 name="comment-alt" size={16} color="#8C8C8C" solid />
            <Text style={styles.commentsLabel}>{post.comments.length}</Text>
          </View>
          <TouchableOpacity
            style={[styles.footerSection, styles.replyButton]}
            hitSlop={12}
            onPress={onPress}>
            <Text style={styles.replyLabel}>Responder</Text>
          </TouchableOpacity>
          <View style={styles.footerSection} />
        </View>
      )}
    </View>
  );
}

ChatChannelPost.propTypes = {
  post: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    textContent: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(['image', 'video', 'document']),
        url: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  showComments: PropTypes.bool,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  content: {
    padding: 10,
    paddingBottom: 16,
    borderBottomColor: '#D6D6D6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  textContentLabel: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#D6D6D6',
  },
  footerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentsLabel: {
    color: '#8C8C8C',
    marginLeft: 5,
    marginBottom: 3,
    fontSize: 12,
  },
  replyButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  replyLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#003868',
    marginBottom: 3,
  },
  attachmentsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  attachmentPlaceholder: {
    width: ATTACHMENT_SIZE,
    height: ATTACHMENT_SIZE,
    borderRadius: 8,
    backgroundColor: '#C2C2C2',
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentPlaceholderLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5F5F5F',
  },
  popupMenu: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default React.memo(ChatChannelPost);
