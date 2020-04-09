import React from 'react';
import { StyleSheet, View } from 'react-native';
import Arquidiocesis from './src/Arquidiocesis';

console.disableYellowBox = true;

export default function App() {
	return (
		<View style={StyleSheet.absoluteFillObject}>
			<Arquidiocesis />
		</View>
	)	
}