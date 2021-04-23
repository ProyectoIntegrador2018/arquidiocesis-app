import React, { useEffect, useState } from 'react';
import { AlphabetList, Button } from '../../components';
import { Text, ActivityIndicator, ScrollView } from 'react-native';
import { Modal } from 'react-native-paper';
import { factory } from 'node-factory';

/**
 * user = {id: string, name: string}
 */
export default (props) => {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState(false);
  const [user, setUser] = useState(false);

  const { onAdd } = props.route.params;

  useEffect(() => {
    const fak = factory((fake) => ({
      id: fake.random.uuid(),
      name: fake.name.jobType(),
    }));
    setUsers(fak.make(15));
  }, []);

  const onListPress = (usr) => {
    setUser(usr);
    setVisible(true);
  };

  return (
    <>
      <ScrollView>
        {users === false ? (
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
            data={users}
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
        <Text>{`Desea agregar a ${user?.name ?? ''}`}</Text>
        <Button
          text={'Agregar usuario'}
          onPress={() => {
            if (users === false) return;

            props.navigation.goBack();
            onAdd([user]);
          }}
        />
      </Modal>
    </>
  );
};
