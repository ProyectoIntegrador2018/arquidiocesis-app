import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { AlphabetList, ErrorView, Button } from '../components';
import { API } from '../lib';

export default (props)=>{
	var [data, setData] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);
	var [user, setUser] = useState(false);

	useEffect(()=>{
		API.getUser().then(setUser);
		// API.getParroquias().then(d=>{
		// 	setData(d);
		// 	setRefreshing(false);
		// 	setError(false);
		// }).catch(err=>{
		// 	setRefreshing(false);
		// 	setError(true);
		// })
		setData([])
	}, [])

	var getCapacitacion = ()=>{
		
	}

	var onPress = (item)=>{
		
	}

	var addCapacitacion = ()=>{
		props.navigation.navigate('AltaCapacitacion', {
			onAdd: (p)=>{
				if(!data) return;
				setData([...data, p]);
			}
		});
	}
	
	return <ScrollView style={{ flex: 1 }} refreshControl={
		<RefreshControl refreshing={refreshing} onRefresh={getCapacitacion} />
	}>
		{error ? (
			<ErrorView message={'Hubo un error cargando las capacitaciones...'} refreshing={refreshing} retry={getCapacitacion} />
		) : data===false ? (
			<View style={{ marginTop: 50 }}>
				<ActivityIndicator size="large" />
				<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
			</View>
		) : (
			<View>
				{ user && (user.type=='admin' || user.type=='superadmin') && <Button text="Agregar Capacitacion" style={{ width: 250, alignSelf: 'center' }} onPress={addCapacitacion} /> }
				{ (data.length>0) ? (
					<AlphabetList data={data} onSelect={onPress} scroll headers={false}/>
				) : (
					<View>
						<Text style={{ textAlign: 'center', fontSize: 16, color: 'gray', backgroundColor: 'white', padding: 15 }}>No perteneces a una capacitación.</Text>
					</View>
				)}
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