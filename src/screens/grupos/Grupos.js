import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { AlphabetList, ErrorView, Button } from '../../components';
import { API } from '../../lib';

export default (props)=>{
	var [data, setData] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);

	useEffect(()=>{
		API.getGrupos().then(grupos=>{
			setData(grupos);
			setRefreshing(false);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}, [])

	var getParroquias = ()=>{
		setRefreshing(true);
		API.getGrupos(true).then(d=>{
			setData(d);
			setError(false);
			setRefreshing(false);
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
		props.navigation.navigate('Grupo', {
			grupo: item,
			onDelete: id=>{
				setData(d=>d.filter(a=>a.id!=id));
			},	
			onEdit: (id, new_grupo)=>{
				setData([...data.filter(a=>a.id!=id), new_grupo]);
			}
		});
	}

	var addParroquia = ()=>{
		props.navigation.navigate('RegistroGrupo', {
			onAdd: (p)=>{
				if(!data) return;
				setData([...data, p]);
			}
		});
	}

	var renderItem = (data)=>{
		return <View>
			<Text style={{ fontSize: 18 }} numberOfLines={1}>{data.nombre}</Text>
			{data.new ? (
				<Text style={{ color: 'green', fontStyle: 'italic' }} numberOfLines={1}>¡Nuevo!</Text>
			) : (data.parroquia || data.capilla) ? (
				<Text style={{ color: 'gray', fontStyle: (!data.parroquia && !data.capilla) ? 'italic' : 'normal' }} numberOfLines={1}>
					{data.parroquia ? (
						('Parroquia: '+data.parroquia.nombre)
					) : (
						('Capilla: '+data.capilla.nombre)
					)}
				</Text>
			) : (
				<Text style={{ color: 'gray', fontStyle: 'italic' }} numberOfLines={1}>
					Sin parroquia
				</Text>
			)}
		</View>
	}

	return <ScrollView style={{ flex: 1 }} refreshControl={
		<RefreshControl refreshing={refreshing} onRefresh={getParroquias} />
	}>
		{error ? (
			<ErrorView message={'Hubo un error cargando las parroquias...'} refreshing={refreshing} retry={getParroquias} />
		) : (
			<View>
				<Button text="Agregar grupo" style={{ width: 250, alignSelf: 'center' }} onPress={addParroquia} />
				<AlphabetList data={data} onSelect={onPress} scroll renderItem={renderItem} sort={'nombre'} />
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