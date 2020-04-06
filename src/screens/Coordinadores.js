import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default (props)=>{

	return (
		<View style={styles.container}>
			<Text style={styles.testText}>Coordinadores</Text>
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
		justifyContent: 'center'
	}
})