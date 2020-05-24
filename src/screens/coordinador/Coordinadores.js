import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { AlphabetList, Button, ErrorView } from '../../components';
import { API } from '../../lib';

export default (props)=>{
	var [data, setData] = useState(false);
	var [error, setError] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [user, setUser] = useState(false);

	useEffect(()=>{
		API.getUser().then(setUser);

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
		API.getCoordinadores(true).then(d=>{
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

	var detalleCoord = (item)=>{
		props.navigation.navigate('DetalleCoordinador', {
			persona: item,
			onEdit: (id, coord)=>{
				setData([...data.filter(a=>a.id!=id), coord]);
			},
			onDelete: id=>{
				setData(data.filter(a=>a.id!=id));
			}
		});
	}

	var addCoordinador = ()=>{
		props.navigation.navigate('RegistroCoordinador', {
			onAdd: c=>{
				setData([...data, c]);
			}
		})
	}

	var formatData = ()=>{
		return data.map(a=>({...a, nombre_completo: `${a.nombre} ${a.apellido_paterno}`}))
	}

	return <ScrollView style={{ flex: 1 }} refreshControl={
		<RefreshControl refreshing={refreshing} onRefresh={getCoordinadores} />
	}>
		{error ? (
			<ErrorView message={'Hubo un error cargando los coordinadores...'} refreshing={refreshing} retry={getZona} />
		) : (
			<View>
				{user && (user.type=='admin' || user.type=='superadmin') && <Button text="Registro coordinador" style={{ width: 250, alignSelf: 'center' }} onPress={addCoordinador} />}
				{data.length==0 ? (
					<View>
						<Text style={{ textAlign: 'center', fontSize: 16, color: 'gray', backgroundColor: 'white', padding: 15 }}>No hay coordinadores en el sistema.</Text>
					</View>
				) : (
					<AlphabetList data={formatData()} onSelect={detalleCoord} scroll sort={'nombre_completo'} />
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