/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Input, Item } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChannelConvAPI from '../../lib/apiV2/ChannelConvAPI';
import { Modal } from 'react-native-paper';

/**
 * props: {editGroup: {id: string, title: string, channels: {name: string}}}
 */
export default (props) => {
  const { editGroup, onSubmit, onDelete } = props.route.params;
  const [name, setName] = useState(editGroup ? editGroup.title : '');
  const [channels, setChannels] = useState(editGroup ? editGroup.channels : []);
  const [roles, setRoles] = useState(editGroup ? editGroup.roles : []);
  const [removeVisible, setRemoveVisible] = useState(false);
  const isEdit = editGroup !== undefined;

  props.navigation.setOptions({
    title: isEdit ? 'Editar grupo' : 'Crear grupo',
  });

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
                  onDelete: async (id) => {
                    console.log('delete channel', id);
                  },
                  // channel: {name: string}
                  onAdd: async (channel) => {
                    await (async () => {
                      const result = await ChannelConvAPI.add({
                        idGroup: editGroup.id,
                        description: '',
                        name: channel.name,
                      });

                      if (!result || result.error) return;
                      onSubmit({
                        title: name,
                        channels,
                      });
                    })();

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
                  idGroup: editGroup.id,
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
        {isEdit ? (
          <Button
            text="Eliminar"
            onPress={() => {
              setRemoveVisible(true);
            }}
          />
        ) : null}
        <Button
          text={isEdit ? 'Aceptar' : 'Registrar'}
          onPress={() => {
            onSubmit({
              title: name,
              channels,
            });

            props.navigation.goBack();
          }}
        />
      </KeyboardAwareScrollView>

      <Modal
        transparent={true}
        visible={removeVisible}
        onDismiss={() => {
          setRemoveVisible(!removeVisible);
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          maxHeight: '80%',
        }}>
        <Text>{`Desea eliminar el grupo ${editGroup?.title ?? ''}?`}</Text>
        <Button
          text={'Eliminar grupo'}
          onPress={() => {
            if (editGroup === false) return;

            props.navigation.goBack();
            onDelete(editGroup.id);
          }}
        />
      </Modal>
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
