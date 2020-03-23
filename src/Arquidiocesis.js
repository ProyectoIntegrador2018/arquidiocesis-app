import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Login, Dummy } from './screens';

var Tab = createBottomTabNavigator();
var Home = (props)=>{
	return (
		<Tab.Navigator>
			<Tab.Screen name="Dummy" component={Dummy} />
		</Tab.Navigator>
	)
}


var Stack = createStackNavigator();
var App = (props)=>{
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}


export default (props)=>{

	var [login, setLogin] = useState(false);

	// This function runs when the screen is shown.
	useEffect(()=>{
		// Check to see if the user is logged in.
		AsyncStorage.getItem('login').then(login=>{
			/* 
				If user has never logged in, login === null
				If user has done login return the user object
					inside of storage.
			*/
			
			// setLogin(login);

			// Debug setting this to dummy use for now.			
			setLogin({
				access: 1
			})
		})
	}, [])

	return (
		<View style={StyleSheet.absoluteFillObject}>
			{login===false ? ( 			// Storage hasn't responded. Show splash still
				<View>
					<Text>LOADING</Text>					
				</View>
			) : login===null ? ( 		// User is not logged in.
				<Login />
			) : ( 							// User is logged in
				<App />
			)}
		</View>
	)
}