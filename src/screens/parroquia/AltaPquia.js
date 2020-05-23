import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Input, Button, Picker } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API, Util } from '../../lib';

export default (props)=>{
	var [loading, setLoading] = useState(false);
	var [listDecanatos, setListDecanatos] = useState(false);
	
	var [name, setName] = useState('');
	var [address, setAddress]= useState('');
	var [decanato, setDecanato] = useState(false);
	var [colonia, setColonia] = useState('');
	var [municipio, setMunicipio] = useState('');
	var [telefono1, setTelefono1] = useState('');
	var [telefono2, setTelefono2] = useState('');


	var onAdd = props.route.params.onAdd;

	var doRegister = ()=>{
		var data = {
			nombre: name,
			decanato: (decanato ? decanato.value : null),
			direccion: address,
			colonia,
			municipio,
			telefono1,
			telefono2
		};

		var { valid, prompt } = Util.validateForm(data, {
			nombre: { type: 'empty', prompt: 'Favor de introducir el nombre de la parroquia.' },
			decanato: { type: 'empty', prompt: 'Favor de seleccionar el decanato.' },
			direccion: { type: 'empty', prompt: 'Favor de introducir la dirección.' },
			colonia: { type: 'empty', prompt: 'Favor de introducir la colonia.' },
			municipio: { type: 'empty', prompt: 'Favor de introducir el municipio.' }
		})

		if(!valid) return Alert.alert('Error', prompt);

		setLoading(true);
		API.addParroquia(data).then(new_parroquia=>{
			setLoading(false);
			if(!new_parroquia) return Alert.alert('Error', "Hubo un error agregando la parroquia.");
			if(onAdd) onAdd(new_parroquia);
			props.navigation.goBack();
			Alert.alert('Exito', "Se ha agregado la parroquia.")
		}).catch(err=>{
			console.log(err);
			setLoading(false);
			Alert.alert('Error', "Hubo un error agregando la parroquia.");
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
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false} contentContainerStyle={{ paddingBottom: 50 }}>
			<Text style={styles.header}>Registrar Parroquia</Text> 
			<Input name="Nombre" value={name} onChangeText={setName} required />
			<Input name="Dirección" value={address} onChangeText={setAddress} required />
			<Input name="Colonia" value={colonia} onChangeText={setColonia} required />
			<Input name="Municipio" value={municipio} onChangeText={setMunicipio} required />
			<Input name="Telefono 1" value={telefono1} onChangeText={setTelefono1} />
			<Input name="Telefono 2" value={telefono2} onChangeText={setTelefono2} />
			{listDecanatos ? (
				<Picker onValueChange={setDecanato} name="Seleccionar decanato" items={listDecanatos} required />
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