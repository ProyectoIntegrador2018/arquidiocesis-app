/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Input, Item } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * props: {editGroup: {title: string, channels: {name: string}}}
 */
export default (props) => {
  const { editGroup } = props.route.params;
  const [name, setName] = useState(editGroup ? editGroup.title : '');
  const [channels, setChannels] = useState(editGroup ? editGroup.channels : []);
  const [roles, setRoles] = useState(editGroup ? editGroup.roles : []);
  const isEdit = editGroup !== undefined;

  return (
    <>
      <KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
        <Text style={styles.header}>
          {isEdit ? 'Editar grupo' : 'Crear grupo'}
        </Text>
        <Input
          noTextOver
          placeholder="Nombre del grupo"
          required
          value={name}
          onChangeText={(v) => {
            setName(v);
          }}
        />
        {isEdit ? (
          <>
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
            <Item
              text="Ver usuarios"
              onPress={() => {
                props.navigation.navigate('UserOnGroup', {
                  roles,
                  onSubmit: (newRoles) => {
                    setRoles(newRoles);
                  },
                });
              }}
            />
          </>
        ) : null}
        {/* <Item
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
        /> */}
        <Button
          text={isEdit ? 'Aceptar' : 'Registrar'}
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
