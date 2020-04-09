import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ListView, ActivityIndicator, ScrollView } from 'react-native';
import { AlphabetList } from '../components';
import { API } from '../lib';

export default (props)=>{
	var [decanato, setDecanato] = useState(props.route.params);

	useEffect(()=>{
		API.getDecanato(decanato.id).then(d=>{
			setDecanato(d);
		})
		props.navigation.setOptions({
			headerStyle: {
				backgroundColor: '#002E60',
				shadowOpacity: 0
			},
			headerTitle: ''
		});
	}, [])

	var onPress = (item)=>{
		console.log(item);
	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{decanato.name}</Text>
		</View>

		{decanato.acompanantes ? (
			<View>
				<Text style={styles.sectionText}>ACOMPAÑANTES</Text>
				<AlphabetList data={decanato.acompanantes} onSelect={onPress} />
			</View>
		) : (
			<View style={{ marginTop: 50 }}>
				<ActivityIndicator size="large" />
				<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
			</View>
		)}
	</View>

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerContainer: {
		backgroundColor: '#002E60'
	},
	headerText: {
		fontSize: 30,
		fontWeight: '700',
		color: 'white',
		padding: 15
	},
	sectionText: {
		fontSize: 14,
		color: 'gray',
		marginVertical: 10,
		marginTop: 30,
		paddingLeft: 15,
	}
})