import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Input, Button, Picker } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../../lib';

export default (props)=>{

	var [loading, setLoading] = useState(false);
	var [nombre, setNombre] = useState('');
	var [direccion, setDireccion]= useState('');
	var [colonia, setColonia]= useState('');
	var [municipio, setMunicipio]= useState('');
	var [telefono1, setTelefono1]= useState('');
	var [telefono2, setTelefono2]= useState('');
	var { parroquia, onAdded } = props.route.params;

	var doRegister = ()=>{
		if(loading) return;
		setLoading(true);
		if(name.length<1) return alert ('Por favor introduzca un nombre');
		if(address.length<1) return alert ('Por favor introduzca una direccion');

		API.addCapilla(name, address, parroquia.id).then(new_capilla=>{
			if(!onAdded) return;
			onAdded(new_capilla);
			alert('Se ha agregado la capilla')
			setLoading(false);
			props.navigation.goBack();
		}).catch(err=>{
			console.error(err);
			setLoading(false);
			alert('Hubo un error agregando la capilla.')
		})
	}

	props.navigation.setOptions({
		headerTitle: 'Registrar Capilla'
	});

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 50 }}>
			<Text style={styles.header}>Registrar Capilla</Text> 
			<Text style={styles.subHeader}>{parroquia.nombre}</Text> 
			<View style={{ padding: 15 }}>
				<Input name={'Nombre'} value={nombre} onChangeText={setNombre} />
				<Input name={'Dirección'} value={direccion} onChangeText={setDireccion} />
				<Input name={'Colonia'} value={colonia} onChangeText={setColonia} />
				<Input name={'Municipio'} value={municipio} onChangeText={setMunicipio} />
				<Input name={'Telefono 1'} value={telefono1} onChangeText={setTelefono1} />
				<Input name={'Telefono 2'} value={telefono2} onChangeText={setTelefono2} />
				<Button text="Registrar" onPress={doRegister} />
			</View>
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
	header: {
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
		marginTop: 15,
	},
	subHeader: {
		fontSize: 18,
		textAlign: 'center',
		color: 'gray'
	}
})