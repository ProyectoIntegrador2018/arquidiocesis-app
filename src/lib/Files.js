import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROOT_URL } from './apiV2/APIv2';
import { Platform } from 'react-native';
import Alert from '../components/Alert';
import { v4 as uuid } from 'uuid';
import { getThumbnails } from 'video-metadata-thumbnails';

/**
 * @returns {Promise<{uri: string, file: File} | null>}
 */
export async function requestDocument() {
  const doc = await DocumentPicker.getDocumentAsync({ type: '*/*' });
  if (doc.type === 'cancel' || doc.file == null) {
    return null;
  }

  return {
    uri: doc.uri,
    file: doc.file,
  };
}

/**
 * @returns {Promise<{file: File, base64: string, type: string, thumbnail: string} | null>}
 */
export async function requestMedia() {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Error',
        'Se necesita permiso a la galería para seleccionar un archivo.'
      );
      return null;
    }
  }

  const img = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.85,
    base64: true,
  });

  if (img.cancelled) {
    return null;
  }

  const base64 = img.uri ?? img.base64;
  const blob = await (await fetch(base64)).blob();
  let thumbnail = null;

  if (blob.type.includes('video')) {
    const thumbnails = await getThumbnails(blob);
    thumbnail = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(thumbnails[0].blob);
      reader.onloadend = () => resolve(reader.result);
    });
  }

  return {
    file: new File([blob], `${uuid()}.${blob.type.split('/')[1]}`),
    base64,
    type: blob.type.split('/')[0],
    thumbnail,
  };
}

/**
 * @param {File[]} files
 * @returns {Promise<boolean>}
 */
export async function uploadFiles(files) {
  const fd = new FormData();
  const { token } = JSON.parse(await AsyncStorage.getItem('login'));
  fd.append('files', files);

  const res = await fetch(`${ROOT_URL}upload?token=${token}`, {
    method: 'POST',
    body: fd,
  });
  return res.ok;
}
