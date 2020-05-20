import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { API } from '../lib';

export default (props)=>{
	var [user, setUser] = useState(false);

	props.navigation.setOptions({
		headerTitle: 'Usuario'
	});

	useEffect(()=>{
		API.getUser().then(setUser);
	}, [])

	var logout = ()=>{
		Alert.alert('Cerrar sesión', '¿Deseas cerrar sesión?', [
			{ text: 'Cerrar sesión', onPress: props.route.params.logout },
			{ text: 'Cancelar', style: 'cancel' }
		])
	}

	var changePassword = ()=>{
		props.navigation.navigate('ChangePassword', {
			logout: props.route.params.logout
		});
	}
	
	var adminUsers = ()=>{

	}

	return (
		<ScrollView style={styles.container}>
			{user.type=='admin' ? (
				<View style={{ marginBottom: 20 }}>
					<Text style={styles.section}>Administrador</Text>
					<Item text="Usuarios" onPress={adminUsers} />
				</View>
			) : null}

			<Text style={styles.section}>Opciones</Text>
			<Item text="Cambiar contraseña" onPress={changePassword} />
			<Item text="Cerrar sesión" onPress={logout} />
		</ScrollView>
	)
}

var Item = (props)=>{
	return <TouchableOpacity onPress={props.onPress}>
		<View style={styles.item}>
			<Text style={styles.itemText}>{props.text}</Text>
			<FontAwesome5 name="chevron-right" style={{ marginRight: 30, color: 'gray', fontSize: 15 }} />
		</View>
	</TouchableOpacity>
}

const styles = StyleSheet.create({
	testText: {
		fontSize: 20
	},
	container: {
		flex: 1,
	},
	itemText: {
		fontSize: 16
	},
	item: {
		paddingLeft: 15, 
		paddingVertical: 15, 
		width: '100%', 
		borderBottomColor: '#CCC',
		borderBottomWidth: StyleSheet.hairlineWidth, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between',
		backgroundColor: 'white'
	},
	section: {
		fontSize: 16,
		color: 'gray',
		marginVertical: 10,
		marginTop: 30,
		fontWeight: '500',
		paddingLeft: 15,
	}
})