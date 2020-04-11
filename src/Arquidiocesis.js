import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'

import { Login, Parroquias, Decanato, Coordinadores, Grupos, Capacitacion, Dummy, Asistencia, ZonasList, Zona, Registro, DetallePersona, RegistroCoordinador, AltaPquia } from './screens';
import { API } from './lib'

var Tab = createBottomTabNavigator();
var Home = (props)=>{
	var [user, setUser] = useState(false);
	var { navigation } = props;

	var logout = ()=>{
		Alert.alert('Cerrar sesión', '¿Deseas cerrar sesión?', [
			{ text: 'Cerrar sesión', onPress: props.route.params.logout },
			{ text: 'Cancelar', style: 'cancel' }
		])
	}

	navigation.setOptions({
		headerRight: () => (
		  <TouchableOpacity onPress={logout}>
			  <View style={{ width: 50, height: 40, alignItems: 'center', justifyContent: 'center' }}>
					<FontAwesome5 name="sign-out-alt" size={25} color={'white'} />
			  </View>
		  </TouchableOpacity>
		),
		headerTitle: 'Arquidiocesis'
	});

	useEffect(()=>{
		API.getUser().then(setUser);
	}, []);

	return (
		<Tab.Navigator initialRouteName='Parroquias'>
			<Tab.Screen name="Pquias" component={Parroquias} />
			<Tab.Screen name="Acompañantes" component={ZonasList} />
			<Tab.Screen name="Coord" component={Coordinadores} />
			<Tab.Screen name="HeMa" component={Grupos} />
			<Tab.Screen name="Capacitacion" component={Capacitacion} />
		</Tab.Navigator>
	)
}
var Stack = createStackNavigator();
var App = (props)=>{
	
	return (
		<NavigationContainer>
			<Stack.Navigator user={props.user} initialRouteName='Home' screenOptions={{
				headerStyle: { backgroundColor: '#002E60' },
				headerTintColor: 'white'
			}}>
				<Stack.Screen name="Home" component={Home} initialParams={{ logout: props.logout }} />
				<Stack.Screen name="Dummy" component={Dummy} />
				<Stack.Screen name="Registro" component={Registro}/>
				<Stack.Screen name="RegistroCoordinador" component={RegistroCoordinador}/>
				<Stack.Screen name="Asistencia" component={Asistencia} />
				<Stack.Screen name="Decanato" component={Decanato} />
				<Stack.Screen name="Zona" component={Zona} />
				<Stack.Screen name="AltaPquia" component={AltaPquia}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}


export default (props)=>{

	var [login, setLogin] = useState(false);

	// This function runs when the screen is shown.
	useEffect(()=>{
		checkLogin()
	}, [])
	
	// Check to see if the user is logged in.
	var checkLogin = ()=>{
		API.getLogin().then(user=>{
			if(!user) return setLogin(null);
			setLogin(user)
		})
	}

	var onLogin = (user)=>{
		setLogin(user);
	}

	var logout = ()=>{
		API.logout().then(done=>{
			setLogin(null);
		})
	}

	return (
		<View style={StyleSheet.absoluteFillObject}>
			<StatusBar barStyle={'light-content'} />
			{!login ? (
				<Login user={login} onLogin={onLogin} />
			) : ( 							// User is logged in
				<App user={login} logout={logout} />
			)}
		</View>
	)
}