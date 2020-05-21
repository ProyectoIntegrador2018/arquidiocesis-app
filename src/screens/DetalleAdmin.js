import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { API } from '../lib';
import { Input, LoadingView, Button, Item } from '../components';

export default (props)=>{
	var [user, setUser] = useState(false);
	var [refreshing, setRefreshing] = useState(false);

	props.navigation.setOptions({
		headerTitle: 'Ver usuario'
	});

	useEffect(()=>getUser(), [])

	var getUser = ()=>{
		setRefreshing(true);
		API.getAdmin(props.route.params.email).then(u=>{
			if(!u){
				setRefreshing(false);
				alert("Hubo un error cargando el usuario.");
				props.navigation.goBack();
				return;
			}
			setRefreshing(false);
			setUser(u);
		}).catch(err=>{
			setRefreshing(false);
			alert("Hubo un error cargando el usuario.");
			props.navigation.goBack();
		})
	}

	if(user===false){
		return <LoadingView text="Cargando" />
	}

	return (
		<ScrollView>
			<View style={{ padding: 15 }}>
				<Input name="Correo electrónico" value={user.email} readonly />
				<Input name="Nombre" value={user.nombre} readonly />
				<Input name="Apellido Paterno" value={user.apellido_paterno} readonly />
				<Input name="Apellido Materno" value={user.apellido_materno} readonly />
				<Input name="Sexo" value={user.sexo} readonly />
			</View>
			
			<Item text="Cambiar contraseña" />
			<Item text="Eliminar usuario" />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	testText: {
		fontSize: 20
	},
	section: {
		fontSize: 16,
		color: 'gray',
		marginTop: 30,
		fontWeight: '500',
		paddingLeft: 15,
	},
})