import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ListView, ActivityIndicator, ScrollView } from 'react-native';
import { AlphabetList } from '../components';

export default (props)=>{
	var [data, setData] = useState(false);

	useEffect(()=>{
		var d = [
			{ name: 'A1' }, { name: 'A2' }, { name: 'A3' },
			{ name: 'B1' }, { name: 'B2' }, { name: 'B3' },
			{ name: 'E1' }, { name: 'E2' }, { name: 'E3' }, { name: 'E4' },
			{ name: 'F1' }, { name: 'F2' }, { name: 'F3' },
			{ name: 'H1' }, { name: 'H2' }, { name: 'H3' }, { name: 'H5' },
			{ name: 'J1' }, { name: 'J2' }, { name: 'J3' }, { name: 'J5' },
			{ name: 'K1' }, { name: 'K2' }, { name: 'K3' }, { name: 'K5' },
			{ name: 'N1' }, { name: 'N2' }, { name: 'N3' }, { name: 'N5' },
			{ name: 'Y1' }, { name: 'Y2' }, { name: 'Y3' }, { name: 'Y5' }, { name: 'Y6' }
		]
		setData(d)
	}, [])
	
	if(data === false){
		return <View style={{ marginTop: 50 }}>
			<ActivityIndicator size="large" />
			<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
		</View>
	}

	var onPress = (item)=>{
		console.log(item);
	}

	var renderItem = (data)=>{
		return <View>
			<Text>{data.name}</Text>
			<Text>HELLO</Text>
		</View>
	}

	return <View style={{ flex: 1 }}>
		<AlphabetList data={data} onSelect={onPress} renderItem={renderItem} />
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