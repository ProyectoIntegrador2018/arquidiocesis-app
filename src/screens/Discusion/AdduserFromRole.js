import React, { useEffect, useState } from 'react';
import { AlphabetList, Button } from '../../components';
import { Text, ActivityIndicator, ScrollView } from 'react-native';
import { Modal, List } from 'react-native-paper';
import { factory } from 'node-factory';

/**
 * role = {id: string, name: string}
 * user = {id: string, name: string}
 */
export default (props) => {
  const [roles, setRoles] = useState(false);
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState(false);

  const { onAdd } = props.route.params;

  useEffect(() => {
    const fak = factory((fake) => ({
      id: fake.random.uuid(),
      name: fake.name.jobType(),
    }));
    setRoles(fak.make(15));
  }, []);

  const getPpl = async () => {
    // Hacer llamada para obtener usuarios
    const fak = factory((fake) => ({
      id: fake.random.uuid(),
      name: fake.name.firstName(),
    }));
    setUsers(fak.make(15));
    return;
  };

  const onListPress = () => {
    getPpl();
    setVisible(true);
  };

  return (
    <>
      <ScrollView>
        {roles === false ? (
          <>
            <ActivityIndicator size="large" />
            <Text
              style={{
                marginTop: 10,
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 16,
              }}>
              Cargando datos...
            </Text>
          </>
        ) : (
          <AlphabetList
            data={roles}
            onSelect={onListPress}
            scroll
            sort={'name'}
          />
        )}
      </ScrollView>
      <Modal
        transparent={true}
        visible={visible}
        onDismiss={() => {
          setVisible(!visible);
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          maxHeight: '80%',
        }}>
        <Text>
          {`Le gustaria agregar a ${users?.length ?? 0} persona${
            users && users.length > 1 ? 's' : ''
          }?`}
        </Text>
        <ScrollView>
          {users !== false ? (
            users.map((v, i) => {
              return (
                <List.Item
                  key={i.toString()}
                  title={v.name}
                  left={(props) => <List.Icon {...props} icon="account" />}
                />
              );
            })
          ) : (
            <>
              <ActivityIndicator size="large" />
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Cargando datos...
              </Text>
            </>
          )}
        </ScrollView>
        <Button
          text={`Agregar usuario${users && users.length > 1 ? 's' : ''}`}
          onPress={() => {
            if (users === false) return;

            props.navigation.goBack();
            onAdd(users);
          }}
        />
      </Modal>
    </>
  );
};
