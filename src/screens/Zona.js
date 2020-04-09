import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AlphabetList } from '../components';
import { API } from '../lib';

export default (props)=>{
	var [zona, setZona] = useState(props.route.params);

	useEffect(()=>{
		API.getZona(zona.id).then(d=>{
			setZona(d);
		});

		props.navigation.setOptions({
			headerStyle: {
				backgroundColor: '#002E60',
				shadowOpacity: 0
			},
			headerTitle: ''
		});
	}, [])
	
	var onPress = (item)=>{
		props.navigation.navigate('Decanato', item);
	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{zona.name}</Text>
		</View>

		{zona.decanatos ? (
			<View>
				<Text style={styles.sectionText}>DECANATOS</Text>
				<AlphabetList data={[{ name: 'test' }]} onSelect={onPress} />
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
	testText: {
		fontSize: 20
	},
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