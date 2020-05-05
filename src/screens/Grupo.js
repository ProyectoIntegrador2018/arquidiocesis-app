import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { AlphabetList, ErrorView, Button, List } from '../components';
import { FontAwesome5 } from '@expo/vector-icons'
import { API } from '../lib';
import moment from 'moment/min/moment-with-locales'
moment.locale('es')

export default (props)=>{
	var [grupo, setGrupo] = useState(props.route.params);
	var [miembros, setMiembros] = useState(false);
	var [asistencias, setAsistencias] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);


	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: '',
		headerRight: ()=>(
			<TouchableOpacity onPress={addMember}>
				<FontAwesome5 name={'plus'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
	});

	useEffect(()=>{
		setError(false);
		var id = grupo.id;
		API.getGrupo(id).then(d=>{
			d.id = id;
			setGrupo(d);
			setMiembros(d.miembros || []);
			setAsistencias(d.asistencias || []);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}, [])

	var getParroquia = ()=>{
		setRefreshing(true);
		setError(false);
		var id = grupo.id;
		API.getGrupo(grupo.id, true).then(d=>{
			d.id = id;
			setGrupo(d);
			setMiembros(d.miembros || [])
			setAsistencias(d.asistencias || []);
			setRefreshing(false);
			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}
	
	var onPress = (item)=>{
		props.navigation.navigate('DetallePersona', {
			persona: item
		});
	}

	var assistance = ()=>{
		props.navigation.navigate('Asistencia', {
			grupo,
			new: true,
			onAssistance: date=>{
				setAsistencias(a=>Array.from(new Set([...a, date])));
			}
		});
	}

	var formatDate = a=>{
		var f = moment(a, 'YYYY-MM-DD').format('MMMM DD, YYYY')
		return f.charAt(0).toUpperCase() + f.substr(1);
	}

	var formatAsistencias = ()=>{
		if(!asistencias) return []
		return asistencias.sort((a,b)=>moment(b, 'YYYY-MM-DD').unix()-moment(a, 'YYYY-MM-DD').unix()).map(a=>({
			name: formatDate(a),
			id: a
		}))
	}
	
	var showAsistencia = (a)=>{
		props.navigation.navigate('Asistencia', {
			grupo,
			date: a.id,
			new: false,
			onDelete: d=>{
				setAsistencias(a=>a.filter(a=>a!=d));
			}
		})
	}

	var addMember = ()=>{
		props.navigation.navigate('RegistroMiembro', {
			grupo,
			onAdd: m=>{
				if(!m) return;
				setMiembros([...miembros, m])
			}
		});
	}

	var editGroup = ()=>{

	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText} numberOfLines={1}>{grupo.nombre}</Text>
			<TouchableOpacity onPress={editGroup}>
				<FontAwesome5 name="edit" style={styles.editIcon} />
			</TouchableOpacity>
		</View>
		<ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={getParroquia} />
		}>
			{error ? (
				<ErrorView message={'Hubo un error cargando el grupo...'} refreshing={refreshing} retry={getParroquia} />
			) : miembros!==false ? (
				<View>
					<Button text={'Tomar asistencia'} style={{ width: 200, alignSelf: 'center' }} onPress={assistance} />

					<Text style={styles.sectionText}>MIEMBROS</Text>
					{miembros.length>0 ? (
						<AlphabetList data={miembros.map(a=>({ name: a.nombre, ...a }))} onSelect={onPress} scroll={false} sort={'nombre'} />
					) : (
						<View>
							<Text style={{ textAlign: 'center', fontSize: 16, color: 'gray', backgroundColor: 'white', padding: 15 }}>Este grupo no tiene miembros agregados.</Text>
						</View>
					)}
					<Text style={[styles.sectionText, { marginTop: 30 }]}>ASISTENCIAS</Text>
					{asistencias && asistencias.length>0 ? (
						<List data={formatAsistencias()} onSelect={showAsistencia} scroll={false} />
					) : (
						<View>
							<Text style={{ textAlign: 'center', fontSize: 16, color: 'gray', backgroundColor: 'white', padding: 15 }}>No se han marcado asistencias.</Text>
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
	testText: {
		fontSize: 20
	},
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
		marginTop: 10,
		paddingLeft: 15,
	}
})