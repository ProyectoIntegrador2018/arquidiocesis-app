import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from '../../components';
import { List, Modal } from 'react-native-paper';

export default (props) => {
  const { channels, onAdd, onDelete } = props.route.params;

  const [actualChannels, setActualChannels] = useState([]);
  const [channelToDelete, setChannelToDelete] = useState(null);

  useEffect(() => {
    setActualChannels(channels);
  }, []);

  return (
    <>
      <Text style={styles.header}>Canales</Text>
      <Button
        style={{ width: 250, alignSelf: 'center' }}
        text="Crear canal"
        onPress={() => {
          props.navigation.navigate('CrearCanales', {
            onAdd: (newChannel) => {
              const newChannels = [...actualChannels, newChannel];
              setActualChannels(newChannels);
              onAdd(newChannel);
            },
          });
        }}
      />
      <List.Section>
        {actualChannels.map((v, i) => (
          <List.Item
            onPress={() => {
              setChannelToDelete(v);
            }}
            title={`${v.name}`}
            key={i.toString()}
            style={{
              backgroundColor: i % 2 ? 'white' : '#f8f8f8',
            }}
            theme={{
              colors: {
                text: '#567998',
              },
            }}
          />
        ))}
      </List.Section>

      <Modal
        transparent={true}
        visible={channelToDelete !== null}
        onDismiss={() => {
          setChannelToDelete(null);
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          maxHeight: '80%',
        }}>
        <Text>{`Desea eliminar el canal ${channelToDelete?.name ?? ''}?`}</Text>
        <Button
          text={'Eliminar canal'}
          onPress={() => {
            if (channelToDelete === null) return;
            console.log(channelToDelete.id);

            props.navigation.goBack();
            onDelete(channelToDelete.id);
          }}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
});
