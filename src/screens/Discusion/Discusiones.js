import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { View, TextInput, Alert, StyleSheet } from 'react-native';
import { Button } from '../../components';
import { List } from 'react-native-paper';
import { factory } from 'node-factory';

const AccordionItem = (props) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title={props.title}>
      <List.Accordion
        title="Controlled Accordion"
        left={(p) => <List.Icon {...p} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

/**
 * Props: {
 * title: string,
 * items: [{
 * title: string,
 * onClick: () => void
 * }]
 * }
 */

// Channels
const channelFac = factory((fake) => ({
  id: fake.random.uuid(),
  name: fake.random.word(),
}));

const groupFac = factory((fake) => ({
  id: fake.random.uuid(),
  title: fake.random.word(),
  channels: channelFac.make(fake.random.number(10)),
}));

export default (props) => {
  const [search, setSearch] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(groupFac.make(15));
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
          onPress={() => Alert.alert('XD')}
        />
      </View>

      <View
        style={{
          backgroundColor: 'white',
        }}>
        <List.Section title={props.title}>
          {groups.map((v, i) => (
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
              }}>
              {v.channels.map((chV, chI) => (
                <List.Item
                  title={`#${chV.name}`}
                  key={chI.toString()}
                  style={{
                    backgroundColor: chI % 2 ? 'white' : '#f8f8f8',
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
