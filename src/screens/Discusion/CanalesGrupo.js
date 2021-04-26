import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from '../../components';
import { List } from 'react-native-paper';

export default (props) => {
  const { channels, onSubmit } = props.route.params;

  const [actualChannels, setActualChannels] = useState([]);

  useEffect(() => {
    setActualChannels(channels);
  }, []);

  return (
    <>
      <Text style={styles.header}>Canales</Text>
      {/* <Button
        style={{ width: 250, alignSelf: 'center' }}
        text="Crear canal"
        onPress={() => {
          props.navigation.navigate('CrearCanales', {
            onSubmit: (newChannel) => {
              const newChannels = [newChannel, ...actualChannels];
              setActualChannels(newChannels);
              onSubmit(newChannels);
            },
          });
        }}
      /> */}
      <List.Section>
        {actualChannels.map((v, i) => (
          <List.Item
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
