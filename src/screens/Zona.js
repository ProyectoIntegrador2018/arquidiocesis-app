import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { AlphabetList, ErrorView } from '../components';
import { API } from '../lib';

export default (props)=>{
	var [zona, setZona] = useState(props.route.params);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);

	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: ''
	});

	useEffect(()=>{
		setError(false);
		API.getZona(zona.id).then(d=>{
			setZona(d);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}, [])

	var getZona = ()=>{
		setRefreshing(true);
		setError(false);
		API.getZona(zona.id, true).then(d=>{
			setZona(d);
			setRefreshing(false);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}
	
	var onPress = (item)=>{
		props.navigation.navigate('Decanato', item);
	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{zona.nombre}</Text>
		</View>

			<ScrollView refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={getZona} />
			}>
				{error ? (
					<ErrorView message={'Hubo un error cargando la zona...'} refreshing={refreshing} retry={getZona} />
				) : zona.decanatos ? (
					<View>
						<Text style={styles.sectionText}>DECANATOS</Text>
						<AlphabetList data={[{ nombre: 'test' }]} onSelect={onPress} scroll={false} />
					</View>
				) : (
					<View style={{ marginTop: 50 }}>
						<ActivityIndicator size="large" />
						<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
					</View>
				)}
			</ScrollView>
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