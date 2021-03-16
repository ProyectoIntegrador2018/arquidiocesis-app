import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

function ChatChannelPost({ post }) {
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.authorLabel}>{post.authorName}</Text>
          <FontAwesome5 name="ellipsis-h" size={16} color="black" light />
        </View>
        <Text style={styles.dateLabel}>{post.date.toLocaleString()}</Text>
        <Text style={styles.textContentLabel}>{post.textContent}</Text>
        {}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerSection}>
          <FontAwesome5 name="comment-alt" size={16} color="#8C8C8C" solid />
          <Text style={styles.commentsLabel}>{post.comments.length}</Text>
        </View>
        <TouchableOpacity
          style={[styles.footerSection, styles.replyButton]}
          hitSlop={12}>
          <Text style={styles.replyLabel}>Responder</Text>
        </TouchableOpacity>
        <View style={styles.footerSection} />
      </View>
    </View>
  );
}

ChatChannelPost.propTypes = {
  post: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    textContent: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  content: {
    padding: 10,
    paddingBottom: 16,
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
    fontSize: 'small',
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
    fontSize: 'small',
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
});

export default React.memo(ChatChannelPost);
