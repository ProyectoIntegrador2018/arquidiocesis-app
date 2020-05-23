import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Input, Button, Picker, AlphabetList } from '../components'
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
		
	}
    var onPress = ()=>{
		
	}
	/* useEffect(()=>{
		API.getDecanatos(false).then(decanatos=>{
			var d = decanatos.map(a=>{
				return { label: a.nombre, value: a.id }
			})
			setListDecanatos(d);
		});
	}, []) */

	props.navigation.setOptions({
		headerTitle: 'Agregar Miembros'
	});

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
			<Text style={styles.header}>Seleccione Miembros</Text> 
			<AlphabetList data={['a','b','c']}scroll sort={'nombre'}/>
					
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