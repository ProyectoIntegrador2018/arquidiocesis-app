import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AlphabetList } from '../components';
import { API } from '../lib';

export default (props)=>{
	var [data, setData] = useState(false);

	useEffect(()=>{
		API.getZonas().then(zonas=>{
			setData(zonas)
		})
	}, [])
	
	if(data === false){
		return <View style={{ marginTop: 50 }}>
			<ActivityIndicator size="large" />
			<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
		</View>
	}

	var onPress = (item)=>{
		props.navigation.navigate('Zona', item);
	}

	return <View style={{ flex: 1 }}>
		<AlphabetList data={data} onSelect={onPress} />
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