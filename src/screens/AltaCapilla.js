import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../lib';

export default (props)=>{

	var [loading, setLoading] = useState(false);
	var [name, setName] = useState('Capilla La Salle');
	var [address, setAddress]= useState('calle 1, col. tecnologico');
	var parroquia = props.route.params.parroquia;
	var onAdded = props.route.params.onAdded;

	var doRegister = ()=>{
		if(loading) return;
		setLoading(true);
		if(name.length<1) return alert ('Por favor introduzca un nombre');
		if(address.length<1) return alert ('Por favor introduzca una direccion');

		API.addCapilla(name, address, parroquia.id).then(new_capilla=>{
			if(!onAdded) return;
			onAdded(new_capilla);
			alert('Se ha agregado la capilla')
			props.navigation.goBack();
		}).catch(err=>{
			alert('Hubo un error agregando la capilla.')
		})
	}

	props.navigation.setOptions({
		headerTitle: 'Alta Capilla'
	});

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
				<Text style={styles.header}>Registrar Capilla</Text> 
				<Text style={styles.subHeader}>{parroquia.name}</Text> 
				<Input name="Nombre" value={name} onChangeText={setName} />
				<Input name="Dirección" value={address} onChangeText={setAddress} />
				<Button text="Registrar" loading={loading} onPress={doRegister} />
			</KeyboardAwareScrollView>
		</SafeAreaView>
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
		marginTop: 20,
	},
	subHeader: {
		marginBottom: 20,
		fontSize: 18,
		textAlign: 'center',
		color: 'gray'
	}
})