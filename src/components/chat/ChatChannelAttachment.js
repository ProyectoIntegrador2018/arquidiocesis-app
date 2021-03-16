import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome5 } from '@expo/vector-icons';

function ChatChannelAttachment({ size, attachment }) {
  const sizeStyle = { width: size, height: size };

  return (
    <View style={[styles.root, sizeStyle]}>
      <Image
        style={[styles.image, sizeStyle]}
        source={{ uri: attachment.url }}
      />
      <View style={styles.overlay}>
        {attachment.type === 'video' && (
          <FontAwesome5 name="play-circle" size={24} color="white" solid />
        )}
      </View>
    </View>
  );
}

ChatChannelAttachment.propTypes = {
  size: PropTypes.number.isRequired,
  attachment: PropTypes.shape({
    type: PropTypes.oneOf(['image', 'video']).isRequired,
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
});

export default React.memo(ChatChannelAttachment);
