/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Input, Item } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChannelConvAPI from '../../lib/apiV2/ChannelConvAPI';
import { List, Modal } from 'react-native-paper';
import { View, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import Icons from '../../lib/Icons.json';

/**
 * props: {editGroup: {title: string, channels: {name: string}}}
 */
export default (props) => {
  const { editGroup, onSubmit } = props.route.params;
  const [name, setName] = useState(editGroup ? editGroup.title : '');
  const [channels, setChannels] = useState(editGroup ? editGroup.channels : []);
  const [roles, setRoles] = useState(editGroup ? editGroup.roles : []);
  const [iconSelectVisible, setIconSelectVisible] = useState(false);
  const [icon, setIcon] = useState(
    editGroup ? editGroup.icon : '' ?? 'account-cancel'
  );
  const isEdit = editGroup !== undefined;

  props.navigation.setOptions({
    title: isEdit ? 'Editar grupo' : 'Crear grupo',
  });

  const onIconItemPress = (newIcon) => {
    setIcon(newIcon);
    setIconSelectVisible(false);
  };

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
        <Item
          text="Cambiar icono"
          leftIcon={icon}
          onPress={() => {
            setIconSelectVisible(true);
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
        visible={iconSelectVisible}
        onDismiss={() => {
          setIconSelectVisible(!iconSelectVisible);
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          maxHeight: '80%',
        }}>
        <Text>{'Seleccione un icono'}</Text>
        <ScrollView>
          {Icons.map((v, i) => (
            <Item
              key={i.toString()}
              leftIcon={v}
              onPress={() => onIconItemPress(v)}
            />
          ))}
        </ScrollView>
        <Button
          text={'Cancelar'}
          onPress={() => {
            setIconSelectVisible(false);
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
