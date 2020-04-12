import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AlphabetList, ErrorView, Button } from '../components';
import { API } from '../lib';

export default (props)=>{
	var [data, setData] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);

	useEffect(()=>{
		API.getParroquias().then(zonas=>{
			setData(zonas);
			setRefreshing(false);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}, [])

	var getParroquias = ()=>{
		setRefreshing(true);
		API.getParroquias(true).then(d=>{
			setData(d);
			setError(false);
			setRefreshing(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}

	if(error){
		return <ErrorView refreshing={refreshing} retry={getParroquias} scroll />
	}
	
	if(data === false){
		return <View style={{ marginTop: 50 }}>
			<ActivityIndicator size="large" />
			<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
		</View>
	}

	var onPress = (item)=>{
		props.navigation.navigate('Parroquia', item);
	}

	var addParroquia = ()=>{
		props.navigation.navigate('AltaPquia', {
			onAdd: (p)=>{
				if(!data) return;
				setData([...data, p]);
			}
		});
	}

	return <View style={{ flex: 1 }}>
		<Button text="Agregar parroquia" style={{ width: 250, alignSelf: 'center' }} onPress={addParroquia} />
		<AlphabetList data={data} onSelect={onPress} refreshing={refreshing} onRefresh={getParroquias} />
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
	}
})