import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { API } from '../lib';


export default (props)=>{

	var [loading, setLoading] = useState(false);
	var [name, setName] = useState('pepe');
	var [lastname, setLastname] = useState('perez');
	var [age, setAge] = useState ('80');
	var [parroquia,setParroquia] = useState(null);
    

	var doRegister = ()=>{
		if(loading) return;
		setLoading(true);
		if(name.length<1) return alert ('Por favor introduzca un nombre');
		if(lastname.length<1) return alert ('Por favor introduzca un apellido');
		if(age<18) return alert ('Por favor introduzca una edad valida');
		// if(parroquia==null) return alert('seleccione una parroquia');
		// if(parroquia.length<1) return alert('Por favor introduzca una Parroquia')
		
		// FALTA HACER REGISTRO
	}

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
			<Text style={styles.header}>Registrar Miembro</Text> 
			<Input name="Nombre" value={name} onChangeText={setName} />
			<Input name="Apellidos" value={lastname} onChangeText={setLastname} />
			<Input name="Edad" value={age} onChangeText={setAge} />
			<Picker name="Seleccionar parroquia" items={[
				{ label: 'Don Bosco', value: 'P1' },
				{ label: 'La Salle', value: 'P2' },
				{ label: 'Sagrado Corazon', value: 'P3' },
			]} />
			<Button text="Registrar" loading={loading} onPress={doRegister}/>
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	testText: {
		fontSize: 18
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loginContainer: {
		height: '70%', 
		width: '100%', 
		padding: 10
	},
	header: {
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 20,
		marginTop: 20,
	}
})