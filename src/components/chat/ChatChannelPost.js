import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function ChatChannelPost({ authorName, date, textContent }) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.authorLabel}>{authorName}</Text>
        <FontAwesome5 name="ellipsis-h" size={16} color="black" light />
      </View>
      <Text style={styles.dateLabel}>{date.toLocaleString()}</Text>
      <Text style={styles.textContentLabel}>{textContent}</Text>
    </View>
  );
}

ChatChannelPost.propTypes = {
  authorName: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  textContent: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    padding: 10,
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
});

export default React.memo(ChatChannelPost);
