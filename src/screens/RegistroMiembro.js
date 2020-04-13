import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../lib';
import {Image} from 'react-native' ; 

export default (props)=>{

	var [loading, setLoading] = useState(false);
	var [name, setName] = useState('pepe');
	var [email, setEmail] = useState('prueba@prubea.com');
	var [age, setAge] = useState ('80');
	var [gender, setGender] = useState (false);

	var onAdd = props.route.params.onAdd;
	var group = props.route.params.grupo;

	props.navigation.setOptions({
		headerTitle: 'Registro Coordinador'
	});

	var doRegister = ()=>{
		if(loading) return;
		if(name.length<1) return alert ('Por favor introduzca un nombre.');
		if(age<2) return alert ('Por favor introduzca una edad valida');
		if(!gender) return alert('Favor de seleccionar el sexo.');
		
		setLoading(true);
		API.registerMember(group.id, name, age, gender.value, email).then(new_member=>{
			setLoading(false);
			if(!new_member) return alert("Hubo un error registrando el miembro");
			if(onAdd) onAdd(new_member)
			alert("Se ha agregado el miembro al grupo.");
			props.navigation.goBack();
		}).catch(err=>{
			alert("Hubo un error registrando el miembro");
			setLoading(false);
		})
	}

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={true}>
			<Text style={styles.header}>Registrar Miembro</Text> 
			<Text style={styles.subHeader}>{group.nombre}</Text>
			<Input name="Nombre completo" value={name} onChangeText={setName}/>
			<Input name="Edad" value={age} onChangeText={setAge} placeholder={'Opcional'} keyboard={'number-pad'}/>
			<Picker name="Sexo" items={[
				{ label: 'Masculino', value: 'Masculino' },
				{ label: 'Femenino', value: 'Femenino' },
				{ label: 'Sin especificar', value: 'Sin especificar' }
			]} onValueChange={setGender} />
			<Input name="Correo electrónico" value={email} onChangeText={setEmail} placeholder={'Opcional...'} keyboard={'email-address'}/>
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
		marginBottom: 5,
		marginTop: 20,
	},
	subHeader: {
		fontSize: 20,
		textAlign: 'center',
		color: 'grey',
		marginBottom: 20,
	}
})