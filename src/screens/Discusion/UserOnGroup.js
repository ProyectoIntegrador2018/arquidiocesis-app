import React, { useEffect, useState } from 'react';
import { AlphabetList, Button } from '../../components';
import { Text, ActivityIndicator, ScrollView } from 'react-native';
import { Modal } from 'react-native-paper';
import { factory } from 'node-factory';

/**
 * user = {id: string, name: string}
 */

export default (props) => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    // Hacer llamada para obtener los usuarios de un grupo
    const fak = factory((fake) => ({
      id: fake.random.uuid(),
      name: fake.name.findName(),
    }));
    setUsers(fak.make(25));
  }, []);

  const onListPress = (item) => {
    setUser(item);
    setModalVisible(true);
  };

  const addFromRole = () => {
    props.navigation.navigate('AdduserFromRole', {
      onAdd: (newUsers) => {
        let arr = [...users];
        arr = arr.concat(newUsers);
        setUsers(arr);
      },
    });
  };

  const addIndiv = () => {
    props.navigation.navigate('AddUserIndividual', {
      onAdd: (newUsers) => {
        let arr = [...users];
        arr = arr.concat(newUsers);
        setUsers(arr);
      },
    });
  };

  return (
    <>
      <ScrollView>
        <Button
          text="Agregar usuario individual"
          style={{ width: 250, alignSelf: 'center' }}
          onPress={addIndiv}
        />
        <Button
          text="Agregar usuarios desde rol"
          style={{ width: 250, alignSelf: 'center' }}
          onPress={addFromRole}
        />
        {users.length === 0 ? (
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
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(!modalVisible);
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          maxHeight: '80%',
        }}>
        <Text
          style={{
            marginBottom: '25px',
          }}>
          {`Esta seguro que quiere remover a ${user.name} del grupo?`}
        </Text>
        <Button
          text={'Aceptar'}
          onPress={() => {
            // Hacer llamada de eliminar usuario en grupo
            setModalVisible(false);
          }}
        />
        <Button
          text={'Cancelar'}
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </Modal>
    </>
  );
};
