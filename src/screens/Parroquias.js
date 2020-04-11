import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';
import { API } from '../lib';

export default (props)=>{

	var { navigation, route } = props;

	var test = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('Dummy');
	}
	var test2 = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('Asistencia');
	}
	var test3 = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('DetallePersona');
	}
	return (
		<View style={styles.container}>
			<Text style={styles.testText}>Parroquias</Text>
			<Button onPress={test} text="Test navigate" />
			<Button onPress={test2} text="Test Asist"/>
			{/* <Button onPress={test3} text="Test detalle"/> */}
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