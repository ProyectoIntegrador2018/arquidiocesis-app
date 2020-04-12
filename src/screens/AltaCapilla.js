import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../lib';

export default (props)=>{

	var [loading, setLoading] = useState(false);
    var [name, setName] = useState('Capilla La Salle');
    var [adress, setAddress]= useState('calle 1, col. tecnologico');
    // var [parroquia,setParroquia] = useState(null);

	var doRegister = ()=>{
		if(loading) return;
		setLoading(true);
		if(name.length<1) return alert ('Por favor introduzca un nombre');
		if(adress.length<1) return alert ('Por favor introduzca una direccion');
	}

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
				<Text style={styles.header}>Registrar Capilla</Text> 
				<Input name="Nombre" value={name} onChangeText={setName} />
				<Input name="Dirección" value={adress} onChangeText={setAddress} />
				<Picker items={[
					{ label: 'Parroquia 1', value: 'P1' },
					{ label: 'Parroquia 2', value: 'P2' },
					{ label: 'Parroquia 3', value: 'P3' },
				]} />
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
		marginBottom: 20,
		marginTop: 20,
	}
})