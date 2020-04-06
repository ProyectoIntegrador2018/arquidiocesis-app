import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';
import { API } from '../lib';

export default (props)=>{

	var { navigation, route } = props;


	var logout = ()=>{
		route.params.logout();
	}

	var test = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('Dummy');
	}

	return (
		<View style={styles.container}>
			<Text style={styles.testText}>Parroquias</Text>
			<Button onPress={logout} text="Logout" />
			<Button onPress={test} text="Test navigate" />
		</View>
	)
}

const styles = StyleSheet.create({
	testText: {
		fontSize: 20
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	}
})