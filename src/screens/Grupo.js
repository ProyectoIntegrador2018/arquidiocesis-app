import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { AlphabetList, ErrorView, Button, List, Input } from '../components';
import { FontAwesome5 } from '@expo/vector-icons'
import { API } from '../lib';
import moment from 'moment/min/moment-with-locales'
import Cache from '../lib/Cache';
moment.locale('es')

export default (props)=>{
	var [grupo, setGrupo] = useState(props.route.params);
	var [miembros, setMiembros] = useState(false);
	var [asistencias, setAsistencias] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);
	var [capilla, setCapilla] = useState(false);


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

	var getGrupo = ()=>{
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
		props.navigation.navigate('DetalleMiembro', {
			persona: item
		});
	}

	var goParroquia = ()=>{
		var p = grupo.parroquia;
		p.readonly = true;
		props.navigation.navigate('Parroquia', p)
	}

	var goCapilla = ()=>{
		var p = grupo.capilla;
		p.readonly = true;
		props.navigation.navigate('DetalleCapilla', p)
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
			<RefreshControl refreshing={refreshing} onRefresh={getGrupo} />
		}>
			{error ? (
				<ErrorView message={'Hubo un error cargando el grupo...'} refreshing={refreshing} retry={getGrupo} />
			) : miembros!==false ? (
				<View>
					{miembros.length>0 && <Button text={'Tomar asistencia'} style={{ width: 200, alignSelf: 'center', marginBottom: 0 }} onPress={assistance} />}
					{ grupo.parroquia ? (
						<View>
							<Text style={styles.sectionText}>VER PARROQUIA</Text>
							<TouchableOpacity onPress={goParroquia}>
								<View style={{ backgroundColor: 'white' }}>
									<View style={styles.item}>
										<Text style={{ fontSize: 16 }}>{grupo.parroquia.nombre}</Text>
										<FontAwesome5 name="chevron-right" style={{ marginRight: 30, color: 'gray', fontSize: 15 }} />
									</View>
								</View>
							</TouchableOpacity>
						</View>
					) : grupo.capilla ? (
						<View>
							<Text style={styles.sectionText}>VER CAPILLA</Text>
							<TouchableOpacity onPress={goCapilla}>
								<View style={{ backgroundColor: 'white' }}>
									<View style={styles.item}>
										<Text style={{ fontSize: 16 }}>{grupo.capilla.nombre}</Text>
										<FontAwesome5 name="chevron-right" style={{ marginRight: 30, color: 'gray', fontSize: 15 }} />
									</View>
								</View>
							</TouchableOpacity>
						</View>
					) : (
						<View>
							<Text style={styles.sectionText}>VER PARROQUIA</Text>
							<Text style={{ textAlign: 'center', fontSize: 16, color: 'gray', backgroundColor: 'white', padding: 15 }}>Este grupo no tiene parroquia.</Text>
						</View>
					)}

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
		marginBottom: 10,
		paddingLeft: 15,
	},
	item: {
		paddingLeft: 15, 
		paddingVertical: 15, 
		width: '100%', 
		borderBottomColor: '#CCC',
		borderBottomWidth: StyleSheet.hairlineWidth, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between' 
	},
	sectionText: {
		fontSize: 14,
		color: 'gray',
		marginVertical: 10,
		marginTop: 30,
		paddingLeft: 15,
	}
})