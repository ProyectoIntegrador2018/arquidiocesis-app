import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../lib';

export default (props)=>{
	var [loading, setLoading] = useState(false);
	var [name, setName] = useState('Don Bosco');
	var [address, setAddress]= useState('calle 1, col. tecnologico');
	var [decanato, setDecanato] = useState(false);
	var [listDecanatos, setListDecanatos] = useState(false);

	var onAdd = props.route.params.onAdd;

	var doRegister = ()=>{
		if(loading) return;
		if(name.length<1) return alert ('Por favor introduzca un nombre.');
		if(address.length<1) return alert ('Por favor introduzca una direccion.');
		if(!decanato) return alert('Favor de seleccionar un decanato.');

		setLoading(true);
		API.addParroquia(name, address, decanato.value).then(new_parroquia=>{
			setLoading(false);
			if(!new_parroquia) return alert("Hubo un error agregando la parroquia.");
			if(onAdd) onAdd(new_parroquia);
			props.navigation.goBack();
			alert("Se ha agregado la parroquia.")
		}).catch(err=>{
			console.log(err);
			setLoading(false);
			alert("Hubo un error agregando la parroquia.");
		});
	}

	useEffect(()=>{
		API.getDecanatos(false).then(decanatos=>{
			var d = decanatos.map(a=>{
				return { label: a.nombre, value: a.id }
			})
			setListDecanatos(d);
		});
	}, [])

	props.navigation.setOptions({
		headerTitle: 'Alta Parroquia'
	});

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
			<Text style={styles.header}>Registrar Parroquia</Text> 
			<Input name="Nombre" value={name} onChangeText={setName} />
			<Input name="Dirección" value={address} onChangeText={setAddress} />
			{listDecanatos ? (
				<Picker onValueChange={setDecanato} name="Seleccionar decanato" items={listDecanatos} />
			) : (
				<ActivityIndicator style={{ height: 80 }} />
			)}
					
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