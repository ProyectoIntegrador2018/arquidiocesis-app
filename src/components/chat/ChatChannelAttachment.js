import * as React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

function ChatChannelAttachment({ size, attachment }) {
  const sizeStyle = { width: size, height: size };
  const { type, url } = attachment;
  const isDocument = type === 'document';

  const urlToFileName = (url) => {
    const splitted = url.split('/');
    return splitted[splitted.length - 1];
  };

  return (
    <View
      style={[
        styles.root,
        sizeStyle,
        { backgroundColor: isDocument ? '#C2C2C2' : 'transparent' },
      ]}>
      {isDocument ? (
        <View style={styles.documentContainer}>
          <View style={styles.documentIcon}>
            <FontAwesome5 name="file" size={48} color="#5F5F5F" solid />
          </View>
          <Text style={styles.documentLabel}>{urlToFileName(url)}</Text>
        </View>
      ) : (
        <>
          <Image style={[styles.image, sizeStyle]} source={{ uri: url }} />
          <View style={styles.overlay}>
            {type === 'video' && (
              <FontAwesome5 name="play-circle" size={24} color="white" solid />
            )}
          </View>
        </>
      )}
    </View>
  );
}

ChatChannelAttachment.propTypes = {
  size: PropTypes.number.isRequired,
  attachment: PropTypes.shape({
    type: PropTypes.oneOf(['image', 'video', 'document']).isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
  },
  image: {
    borderRadius: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  documentLabel: {
    fontWeight: 'bold',
    color: '#5F5F5F',
    marginBottom: 6,
  },
});

export default React.memo(ChatChannelAttachment);
