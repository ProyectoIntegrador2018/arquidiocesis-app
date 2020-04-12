import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { AlphabetList, ErrorView } from '../components';
import { FontAwesome5 } from '@expo/vector-icons'
import { API } from '../lib';

export default (props)=>{
	var [parroquia, setParroquia] = useState(props.route.params);
	var [capillas, setCapillas] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);

	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: '',
		headerRight: ()=>(
			<TouchableOpacity onPress={addParroquia}>
				<FontAwesome5 name={'plus'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
	});

	useEffect(()=>{
		setError(false);
		API.getParroquia(parroquia.id).then(d=>{
			setParroquia(d);
			setCapillas(d.capillas)
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}, [])

	var getParroquia = ()=>{
		setRefreshing(true);
		setError(false);
		API.getParroquia(parroquia.id, true).then(d=>{
			setParroquia(d);
			setCapillas(d.capillas)
			setRefreshing(false);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}

	var addParroquia = ()=>{
		props.navigation.navigate('AltaCapilla', {
			parroquia,
			onAdded: (capilla=>{
				if(!capillas) return;
				setCapillas([...capillas, capilla]);
			})
		});
	}

	var formatItems = ()=>{
		return parroquia.capillas.map(i=>{
			return {
				label: i.nombre,
				value: i.id
			}
		})
	}
	
	var onPress = (item)=>{
		
	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{parroquia.name}</Text>
		</View>
		<ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={getParroquia} />
		}>
			{error ? (
				<ErrorView message={'Hubo un error cargando la parroquia...'} refreshing={refreshing} retry={getParroquia} />
			) : capillas ? (
				<View>
					<Text style={styles.sectionText}>CAPILLAS</Text>
					<AlphabetList data={capillas} onSelect={onPress} scroll={false} />
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