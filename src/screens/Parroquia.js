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

	var readonly = props.route.params.readonly;

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
		var id = parroquia.id;
		API.getParroquia(id).then(d=>{
			d.id = id;
			setParroquia(d);
			setCapillas(d.capillas.filter(a=>a.nombre) || [])
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}, [])

	var getParroquia = ()=>{
		setRefreshing(true);
		setError(false);
		var id = parroquia.id;
		API.getParroquia(parroquia.id, true).then(d=>{
			d.id = id;
			setParroquia(d);
			setCapillas(d.capillas.filter(a=>a.nombre) || [])
			setRefreshing(false);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}
// esta funcion agrega capillas a la parroquia
	var addParroquia = ()=>{
		props.navigation.navigate('AltaCapilla', {
			parroquia,
			onAdded: (capilla=>{
				if(!capillas) return;
				setCapillas([...capillas, capilla]);
			})
		});
	}
	
	var onPress = (item)=>{
		item.parroquia = parroquia;
		item.onDelete = (id)=>{
			setCapillas(a=>a.filter(a=>a.id!=id));
		}
		props.navigation.navigate('DetalleCapilla', item)
	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{parroquia.nombre}</Text>
			{readonly ? null : (
				<FontAwesome5 name="edit" style={styles.editIcon} />
			)}
		</View>
		<ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={getParroquia} />
		}>
			{error ? (
				<ErrorView message={'Hubo un error cargando la parroquia...'} refreshing={refreshing} retry={getParroquia} />
			) : capillas!==false ? (
				<View>
					<Text style={styles.sectionText}>CAPILLAS</Text>
					{capillas.length>0 ? (
						<AlphabetList data={capillas} onSelect={onPress} scroll={false} sort={'nombre'} />
					) : (
						<View>
							<Text style={{ textAlign: 'center', fontSize: 16, color: 'gray', backgroundColor: 'white', padding: 15 }}>Esta parroquia no tiene capillas agregadas.</Text>
						</View>
					)}
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
		backgroundColor: '#002E60',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	editIcon: {
		paddingRight: 15,
		color: 'white',
		fontSize: 25
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