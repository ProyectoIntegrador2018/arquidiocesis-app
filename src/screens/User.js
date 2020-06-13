/* 
Nombre: User.js
Usuario con acceso: Admin, acompañante, coordinador
Descripción: Pantalla para que un usuario registrado pueda gestionar su perfil
*/
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Item, Alert } from '../components'
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
		]);
	}

	var changePassword = ()=>{
		props.navigation.navigate('ChangePassword', {
			admin_email: false,
			logout: props.route.params.logout
		});
	}
	
	var adminUsers = ()=>{
		props.navigation.navigate('AdminUsers');
	}

	var reports = async ()=>{
		props.navigation.navigate('Reports');
	}

	return (
		<ScrollView style={styles.container}>
			{user.type=='admin' ? (
				<View style={{ marginBottom: 20 }}>
					<Text style={styles.section}>Administrador</Text>
					<Item text="Usuarios" onPress={adminUsers} />
					<Item text="Reportes" onPress={reports} />
				</View>
			) : null}

			<Text style={styles.section}>Opciones</Text>
			<Item text="Cambiar contraseña" onPress={changePassword} />
			<Item text="Cerrar sesión" onPress={logout} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	testText: {
		fontSize: 20
	},
	container: {
		flex: 1,
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