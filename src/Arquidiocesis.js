import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Login, Parroquias, Admin, Acompanantes, Coordinadores, Grupos, Capacitacion, Dummy, Asistencia } from './screens';
import { API } from './lib'

var Tab = createBottomTabNavigator();
var Home = (props)=>{
	var [user, setUser] = useState(false);

	useEffect(()=>{
		API.getUser().then(setUser);
	}, []);
	var params = {
		logout: props.route.params.logout
	}

	return (
		<Tab.Navigator initialRouteName='Parroquias'>
			<Tab.Screen name="Pquias" component={Parroquias} initialParams={params} />
			<Tab.Screen name="Acompañantes" component={Acompanantes} />
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
			<Stack.Navigator user={props.user} initialRouteName='Home'>
				<Stack.Screen name="Home" component={Home} initialParams={{ logout: props.logout }}/>
				<Stack.Screen name="Dummy" component={Dummy} />
				<Stack.Screen name="Asistencia" component={Asistencia}/>
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
			<StatusBar barStyle={'dark-content'} />
			{!login ? (
				<Login user={login} onLogin={onLogin} />
			) : ( 							// User is logged in
				<App user={login} logout={logout} />
			)}
		</View>
	)
}