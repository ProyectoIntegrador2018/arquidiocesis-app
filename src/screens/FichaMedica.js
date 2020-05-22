import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Switch, ScrollView, TextInput } from 'react-native';
import { API } from '../lib';
import { FontAwesome5 } from '@expo/vector-icons'
import { Input, Button, Picker, ErrorView } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default (props)=>{
  var [persona, setPersona] = useState(false)
  var [edit, setEdit] = useState(false);
  var [isEnabled, setIsEnabled] = useState(false);
  var [isEnabledAm, setIsEnabledAm] = useState(false);

 
  var editField = (key)=>{
		return (val)=>{
			setPersona(a=>{
				a[key] = val;
				return a;
			})
		}
  }
  var toggleSwitch = () => {
		var alergia = isEnabled;
		setIsEnabled(!alergia);
  }
  var toggleSwitchAmbulancia = () => {
		var ambulancia = isEnabledAm;
		setIsEnabledAm(!ambulancia);
	}
  props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: 'Ficha Medica',
		headerRight: ()=>(
			<TouchableOpacity onPress={() => setEdit(e=>!e)}>
				<FontAwesome5 name={'edit'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
  });
  
 var saveFicha=()=>{}
	return (

    <KeyboardAwareScrollView contentContainerStyle={{ padding: 20 }}>
      {edit && <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>Editando persona</Text>}

        <Input name={'Parroquia'} value={'Don Bosco'} onChangeText={editField('parroquia')} placeholder={'Parroquia'} readonly={!edit} />
        <Input name={'Capilla'}value={'capilla 1'} onChangeText={editField('capilla')} placeholder={'Capilla'} readonly={!edit} />
        <Input name={'Grupo'}value={'grupo 1'} onChangeText={editField('grupo')} placeholder={'Grupo'} readonly={!edit} />
				<Input name={'Integrante'}value={'pepe'} onChangeText={editField('nombre')} placeholder={'Nombre'} readonly={!edit} />
        <Picker 
							name={'Tipo de Sangre'} 
							style={{ marginTop: 15 }}
							items={[
                { label: 'O+', value: 'O+' },
                { label: 'O-', value: 'O-' },
                { label: 'A', value: 'A' },
                { label: 'AB', value: 'AB' }
              ]}
				/>
        {/* switch alergia */}
        <Text style={{ textAlign: 'left', fontSize: 18, fontWeight: '400' }}>¿Alergico a Medicamentos?</Text>
					<View style={styles.checkboxContainer}>
						<Switch
							trackColor={{ false: "#767577", true: "#32CD32" }}
							thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
        {/* fin switch alergia */}
        <Picker 
							name={'Servicio Medico'} 
							style={{ marginTop: 15 }}
							items={[
                { label: 'IMSS', value: 'IMSS' },
                { label: 'ISSTE', value: 'ISSTE' },
                { label: 'SSA', value: 'SSA' },
                { label: 'NOVA', value: 'NOVA' }
              ]}
				/>
        {/* switch ambulancia */}
        <Text style={{ textAlign: 'left', fontSize: 18, fontWeight: '400' }}>Servicio de Ambulancia</Text>
					<View style={styles.checkboxContainer}>
						<Switch
							trackColor={{ false: "#767577", true: "#32CD32" }}
							thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitchAmbulancia}
							value={isEnabledAm}
						/>
					</View>
        {/* fin switch ambulancia */}
        <View style={styles.container}>  
        <Input multiline={true} name={'Padecimientos'}value={'Asma'} onChangeText={editField('Padecimientos')} placeholder={'Padecimientos'} readonly={!edit} />
        {edit && <Button text={'Guardar'} onPress={saveFicha} />}
        
      </View> 
		</KeyboardAwareScrollView>		
   )
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '10%' // is 50% of container width
  },
  fields:{
	width: '100%',
    height: 55,
    margin: 0,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  boton:{
	paddingTop:'50%',
	backgroundColor: '#42A5F5',
	color:'black',
  }
})