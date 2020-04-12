import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';
import { API } from '../lib';

export default (props)=>{

	var { navigation, route } = props;

	var test = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('AltaPquia');
	}
	var test2 = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('Asistencia');
	}
	var test3 = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('RegistroCoordinador');
	}
	var test4 = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('RegistroMiembro');
	}
	var test5 = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('AltaCapilla');
	}
	var test6 = ()=>{
		// Navegar dentro del stack.
		navigation.navigate('RegistroGrupo');
	}
	return (
		<View style={styles.container}>
			<Text style={styles.testText}>Parroquias</Text>
			<Button onPress={test} text="Alta Parroquia" />
			<Button onPress={test2} text="Test Asist"/>
			<Button onPress={test3} text="Test RC"/>
			<Button onPress={test4} text="Test RM"/>
			<Button onPress={test5} text="Test Capilla"/>
			<Button onPress={test6} text="Test RG"/>
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