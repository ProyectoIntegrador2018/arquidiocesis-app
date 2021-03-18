import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Input, Item } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default (props) => {
  const [name, setName] = useState('');
  const [channels, setChannels] = useState([]);

  return (
    <>
      <KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
        <Text style={styles.header}>Crear grupo</Text>
        <Input
          noTextOver
          placeholder="Nombre del grupo"
          required
          value={name}
          onChangeText={(v) => {
            setName(v);
          }}
        />
        <Item
          text="Ver canales"
          onPress={() => {
            props.navigation.navigate('CanalesGrupo', {
              channels,
              // channel: {name: string}
              onSubmit: (channels) => {
                setChannels(channels);
              },
            });
          }}
        />
        <Button
          text="Registrar"
          onPress={() => {
            props.route.params.onSubmit({
              title: name,
              channels,
            });

            props.navigation.goBack();
          }}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    height: '70%',
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
});
