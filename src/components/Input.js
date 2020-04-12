import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

export default (props)=>{

	return (
		<View style={[styles.container, props.style]}>
			<Text style={styles.label}>{props.name || 'Input'}</Text>
			<TextInput style={[styles.input]} placeholder={props.placeholder} value={props.value} onChangeText={props.onChangeText} textContentType={props.textContentType} secureTextEntry={typeof props.password !== 'undefined'} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginBottom: 10
	},
	input: {
		backgroundColor: '#FDFDFD',
		height: 45,
		fontSize: 20,
		paddingHorizontal: 10,
		borderRadius: 4,
		borderColor: '#CCC',
		borderWidth: StyleSheet.hairlineWidth,
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: 'grey',
		fontWeight: '500'
	}
})