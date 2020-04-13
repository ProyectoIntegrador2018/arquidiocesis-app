import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { AlphabetList, Button, ErrorView } from '../components';
import { API } from '../lib';

export default (props)=>{
	var [data, setData] = useState(false);
	var [error, setError] = useState(false);
	var [refreshing, setRefreshing] = useState(false);

	useEffect(()=>{
		setRefreshing(true);
		API.getCoordinadores(false).then(d=>{
			setRefreshing(false);
			setData(d);
			setError(false);
		}).catch(err=>{
			setError(true);
		})
	}, [])

	var getCoordinadores = ()=>{
		setRefreshing(true);
		setError(false);
		API.getCoordinadores(false).then(d=>{
			setRefreshing(false);
			setData(d);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}
	
	if(data === false){
		return <View style={{ marginTop: 50 }}>
			<ActivityIndicator size="large" />
			<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
		</View>
	}

	var onPress = (item)=>{
		console.log(item);
	}

	var addCoordinador = ()=>{
		props.navigation.navigate('RegistroCoordinador', {
			onAdd: c=>{
				setData([...data, c]);
			}
		})
	}

	return <ScrollView style={{ flex: 1 }} refreshControl={
		<RefreshControl refreshing={refreshing} onRefresh={getCoordinadores} />
	}>
		{error ? (
			<ErrorView message={'Hubo un error cargando los coordinadores...'} refreshing={refreshing} retry={getZona} />
		) : (
			<View>
				<Button text="Registro coordinador" style={{ width: 250, alignSelf: 'center' }} onPress={addCoordinador} />
				<AlphabetList data={data} onSelect={onPress} scroll />
			</View>
		)}
	</ScrollView>

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