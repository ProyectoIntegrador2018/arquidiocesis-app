import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { API } from '../lib';
import { FontAwesome5 } from '@expo/vector-icons'
import { Input, Button, Picker, ErrorView } from '../components';

export default (props)=>{
	var [persona, setPersona] = useState(false)

	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: 'Persona',
		headerRight: ()=>(
			<TouchableOpacity onPress={() => setEdit(e=>!e)}>
				<FontAwesome5 name={'edit'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
	});

	useEffect(()=>{
		API.getMiembro(props.route.params.persona.id).then(miembro=>{
			if(!miembro){
				alert("Hubo un error cargando al miembro...");
				props.navigation.goBack();
			}
			setPersona(miembro);
		}).catch(err=>{
			alert("Hubo un error cargando al miembro...");
			props.navigation.goBack();
		})

	}, []);
	
	var getGender = ()=>{
		return 'Masculino'
	}

	return <View style={{ flex: 1 }}>
		{persona===false ? (
			<View style={{ marginTop: 50 }}>
				<ActivityIndicator size="large" />
				<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
			</View>
		) : (
			<View style={{ padding: 10 }}>
				<Input name={'Nombre'} value={persona.nombre} placeholder={'Nombre'} readonly={true} />
				<Input name={'Edad'} value={persona.edad} placeholder={'Edad'} readonly={true} />
				<Input name={'Correo electrónico'} value={persona.email} placeholder={'Correo electrónico'} keyboardType={'email-address'} readonly={true} />
				<Input name={'Genero'} value={(persona.sexo || 'Sin especificar')} placeholder={'Genero'} readonly={true} />
				<Input name={'Estatus'} value={(persona.estatus || 'Activo')} placeholder={'Estatus'} readonly={true} />
			</View>
		)}
	</View>
}


const styles = StyleSheet.create({
    container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start' // if you want to fill rows left to right
	},
	item: {
		width: '50%' // is 50% of container width
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