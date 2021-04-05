import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TextInput } from 'react-native';
import { Button } from '../../components';
import { List } from 'react-native-paper';
import GroupsConvAPI from '../../lib/apiV2/GroupsConvAPI';

// Channels
/* const channelFac = factory((fake) => ({
  id: fake.random.uuid(),
  name: fake.random.word(),
}));

const groupFac = factory((fake) => ({
  id: fake.random.uuid(),
  title: fake.random.word(),
  channels: channelFac.make(fake.random.number(10)),
})); */

export default (props) => {
  const [search, setSearch] = useState('');
  const [groups, setGroups] = useState([]);
  console.log(groups);

  useEffect(() => {
    GroupsConvAPI.all()
      .then((v) => {
        if (v.error) throw v.message;
        else return v.data;
      })
      .then((v) =>
        v.map((v) => ({
          id: v.id,
          title: v.content.group_name,
          channels: v.content.group_channels.map((ch, i) => ({
            id: i,
            name: ch,
          })),
        }))
      )
      .then(setGroups)
      .catch((v) => {
        console.error(v);
      });
  }, []);

  return (
    <View
      style={{
        height: '100%',
        overflowY: 'auto',
      }}>
      <View
        style={{
          height: '72px',
          backgroundColor: '#002e60',
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '18px',
          paddingRight: '18px',
        }}>
        <View
          style={{
            backgroundColor: '#124a7a',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'row',
            height: '40px',
          }}>
          <FontAwesome5
            name={'search'}
            size={16}
            color={'white'}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '16px',
              marginRight: '16px',
            }}
            solid
          />
          <TextInput
            style={{
              flex: 1,
              fontSize: '16px',
              color: 'white',
            }}
            placeholder="Buscar"
            placeholderTextColor="#cbcbcb"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </View>
      </View>

      <View>
        <Button
          style={{ width: 250, alignSelf: 'center' }}
          text="Nuevo grupo"
          onPress={() =>
            props.navigation.navigate('CrearGrupo', {
              // newGroup : {title: string, channels: [{name: string}]}
              onSubmit: (newGroup) => {
                GroupsConvAPI.add({
                  name: newGroup.title,
                  channels: [],
                  roles: [],
                })
                  .then((v) => {
                    if (v.error) throw v.message;
                    else return v.data;
                  })
                  .then((v) => {
                    setGroups([...groups, { ...newGroup, id: v }]);
                  })
                  .catch((v) => console.error(v));
              },
            })
          }
        />
      </View>

      <View
        style={{
          backgroundColor: 'white',
        }}>
        <List.Section title={props.title}>
          {groups
            .filter((v) => v.title.includes(search))
            .map((v, i) => (
              <List.Accordion
                title={v.title}
                key={i.toString()}
                theme={{
                  colors: {
                    primary: 'black',
                  },
                }}
                style={{
                  borderBottomColor: '#ddd',
                  borderBottomWidth: '1px',
                }}
                onLongPress={() =>
                  props.navigation.navigate('CrearGrupo', {
                    editGroup: v,
                    onSubmit: (renewed) => {
                      const newGroups = [...groups];
                      newGroups.splice(i, 1, renewed);
                      setGroups(newGroups);
                    },
                  })
                }>
                {v.channels.map((chV, chI) => (
                  <List.Item
                    title={'#General'}
                    key={chI.toString()}
                    style={{
                      backgroundColor: chI % 2 ? 'white' : '#f8f8f8',
                    }}
                    onPress={() => {
                      props.navigation.navigate('ChatChannelPosts', {
                        channelName: '#General',
                      });
                    }}
                    theme={{
                      colors: {
                        text: '#567998',
                      },
                    }}
                  />
                ))}
              </List.Accordion>
            ))}
        </List.Section>
      </View>
    </View>
  );
};
