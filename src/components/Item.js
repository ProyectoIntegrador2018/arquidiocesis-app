import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'

export default (props)=>{
	return <TouchableOpacity onPress={props.onPress}>
		<View style={styles.item}>
			<Text style={styles.itemText}>{props.text}</Text>
			<FontAwesome5 name="chevron-right" style={{ marginRight: 30, color: 'gray', fontSize: 15 }} />
		</View>
	</TouchableOpacity>
}

const styles = StyleSheet.create({
	itemText: {
		fontSize: 16
	},
	item: {
		paddingLeft: 15, 
		paddingVertical: 15, 
		width: '100%', 
		borderBottomColor: '#CCC',
		borderBottomWidth: StyleSheet.hairlineWidth, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between',
		backgroundColor: 'white'
	},
})