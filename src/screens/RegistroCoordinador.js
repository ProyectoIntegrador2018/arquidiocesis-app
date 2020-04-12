import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../lib';
import {Image} from 'react-native' ; 

export default (props)=>{

	var [loading, setLoading] = useState(false);
	var [email, setEmail] = useState('prueba@prubea.com');
	var [password, setPassword] = useState('contrasnaprueba');
	var [name, setName] = useState('pepe');
	var [lastname, setLastname] = useState('perez');
	var [age, setAge] = useState ('80');
	//puede haber coordinadores sin grupo
	var [grupo, setGrupo] = useState(null);

	var doRegister = ()=>{
		if(loading) return;
		setLoading(true);
		if(name.length<1) return alert ('Por favor introduzca un nombre');
		if(lastname.length<1) return alert ('Por favor introduzca un apellido');
		if(age<18) return alert ('Por favor introduzca una edad valida');
		if(email.length<5) return alert('Favor de ingresar un correo electrónico válido.');
		if(password.length<3) return alert('Favor de ingresar una contraseña válida');

		// FALTA HACER REGISTRO
	}

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
			<Text style={styles.header}>Registrar Coordinador</Text> 
			<Input name="Nombre" value={name} onChangeText={setName}/>
					<Input name="Apellidos" value={lastname} onChangeText={setLastname} />
					<Input name="Edad" value={age} onChangeText={setAge}/>
					<Picker name="Seleccionar grupo" items={[
						{ label: 'Grupo 1', value: 'G1' },
						{ label: 'Grupo 2', value: 'G2' },
						{ label: 'Grupo 3', value: 'G3' },
					]} />
					<Input name="Correo electrónico" value={email} onChangeText={setEmail} textContentType={'emailAddress'} />
			<Input name="Contraseña" style={{ marginTop: 10 }} value={password} onChangeText={setPassword} textContentType={'password'} password />
			<Button text="Registrar" loading={loading} onPress={doRegister} />
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	testText: {
		fontSize: 20
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