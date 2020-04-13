import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { AlphabetList, ErrorView } from '../components';
import { API } from '../lib';

export default (props)=>{
	var [decanato, setDecanato] = useState(props.route.params);
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
		setRefreshing(true);
		setError(false);
		API.getDecanato(decanato.id).then(d=>{
			setDecanato(d);
			setRefreshing(false);
			setError(false);
		}).catch(err=>{
			setError(true);
			setRefreshing(false);
		})
	}, [])

	var getDecanato = ()=>{
		setRefreshing(true);
		API.getDecanato(decanato.id, true).then(d=>{
			setDecanato(d);
			setRefreshing(false);
			setError(false);
		}).catch(err=>{
			setError(true);
			setRefreshing(false);
		})
	}

	var onPress = (item)=>{
		props.navigation.navigate('DetallePersona', item);
	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{decanato.nombre}</Text>
		</View>

		<ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={getDecanato} />
		}>
			{error ? (
				<ErrorView message={'Hubo un error cargando el decanato...'} refreshing={refreshing} retry={getDecanato} />
			) : decanato.acompanantes ? (
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
		</ScrollView>
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