import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { API } from '../../lib';
import { FontAwesome5 } from '@expo/vector-icons'
import { Item, AlphabetList, Button, List, Input, LoadingView, ErrorView } from '../../components';
import moment from 'moment/min/moment-with-locales'
moment.locale('es')

export default (props)=>{
	var { onEdit, onDelete } = props.route.params;

	var [capacitacion, setCapacitacion] = useState(props.route.params.capacitacion);
	var [participantes, setParticipantes] = useState(false);
	var [asistencias, setAsistencias] = useState(false);
	var [deleting, setDeleting] = useState(false);
	var [user, setUser] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);

	var canEdit = (user && capacitacion && (user.type=='admin' || user.type=='superadmin' || user.id==capacitacion.encargado))	
	
	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: 'Capacitación',
		headerRight: ()=> canEdit && (
			<TouchableOpacity onPress={addParticipante}>
				<FontAwesome5 name={'plus'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
	});


	useEffect(()=>{
		API.getUser().then(setUser);
		API.getCapacitacion(props.route.params.capacitacion.id).then(cap=>{
			setCapacitacion(cap);
			setParticipantes(cap.participantes);
			setAsistencias(cap.asistencias);
			setError(false)
		}).catch(err=>{
			setError(true);
		})
	}, [])

	var getCapacitacion = ()=>{
		setRefreshing(true);
		API.getCapacitacion(capacitacion.id, true).then(cap=>{
			setCapacitacion(cap);
			setParticipantes(cap.participantes);
			setAsistencias(cap.asistencias);
			setRefreshing(false);
			setError(false)
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}
	var deleteCapacitacion = ()=>{
		Alert.alert('¿Eliminar capacitación?', 'Esto eliminará los registros de esta capacitación', [
			{ text: 'Cancelar', style: 'cancel' },
			{ text: 'Eliminar', style: 'destructive', onPress: ()=>{
				setDeleting(true);
				API.removeCapacitacion(capacitacion.id).then(done=>{
					setDeleting(false);
					Alert.alert('Exito', 'Se ha eliminado la capacitación.')
					props.navigation.goBack();
					onDelete(capacitacion.id);
				}).catch(err=>{
					setDeleting(false);
					Alert.alert('Error', 'Hubo un error eliminando la capacitación.');
				})
			} }
		])
	}

	var formatDate = a=>{
		var f = moment(a, 'YYYY-MM-DD').format('MMMM DD, YYYY')
		return f.charAt(0).toUpperCase() + f.substr(1);
	}
	
	var formatUnix = a=>{
		var f = !a ? moment().format('MMMM DD, YYYY') : moment.unix(a).format('MMMM DD, YYYY')
		return f.charAt(0).toUpperCase() + f.substr(1);
	}

	var editCapacitacion = ()=>{
		props.navigation.navigate('EditarCapacitacion', {
			capacitacion,
			onEdit: data=>{
				var p = {...capacitacion}
				for(var i in data){
					p[i] = data[i];
				}
				setCapacitacion(p);
				onEdit(p);
			}
		})
	}

	var addParticipante = ()=>{
		props.navigation.navigate('RegistroParticipante', {
			capacitacion,
			onAdd: part=>{
				setParticipantes([...participantes, part]);
			}
		})
	}

	var tomarAsistencia = ()=>{

	}
	
	var viewParticipante = p=>{
		props.navigation.navigate('DetalleParticipante', {
			id: p.id,
			capacitacion_id: capacitacion.id,
			onDelete: id=>{
				setParticipantes(participantes.filter(a=>a.id!=id));
			},
			onEdit: data=>{
				setParticipantes([...participantes.filter(a=>a.id!=data.id), data]);
			}
		})
	}

	var changeEncargado = ()=>{

	}

	var showAsistencia = ()=>{

	}

	var formatAsistencias = ()=>{
		if(!asistencias) return []
		return asistencias.sort((a,b)=>moment(b, 'YYYY-MM-DD').unix()-moment(a, 'YYYY-MM-DD').unix()).map(a=>({
			name: formatDate(a),
			id: a
		}))
	}
	
	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.mastheadText} numberOfLines={1}>{capacitacion.nombre}</Text>
			{ canEdit ? (
				<TouchableOpacity onPress={editCapacitacion}>
					<FontAwesome5 name="edit" style={styles.editIcon} />
				</TouchableOpacity>
			) : null}
		</View>
		<ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={getCapacitacion} />
		} contentContainerStyle={{ paddingBottom: 50 }}>
			{error ? (
				<ErrorView message={'Hubo un error cargando el grupo...'} refreshing={refreshing} retry={getCapacitacion} />
			) : participantes!==false ? (
				<>
					{ participantes.length>0 && canEdit && <Button text={'Tomar asistencia'} style={{ width: 200, alignSelf: 'center', marginBottom: 0 }} onPress={tomarAsistencia} /> }
					<Text style={styles.sectionText}>PARTICIPANTES</Text>
					{participantes.length>0 ? (
						<AlphabetList data={participantes.map(a=>({ ...a, nombre_completo: `${a.nombre} ${a.apellido_paterno}` }))} onSelect={viewParticipante} scroll={false} sort={'nombre_completo'} />
					) : (
						<View>
							<Text style={{ textAlign: 'center', fontSize: 16, color: 'gray', backgroundColor: 'white', padding: 15 }}>Esta capacitación no tiene participantes.</Text>
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

					<View style={{ padding: 15, paddingBottom: 0 }}>
						<Input name="Nombre" value={capacitacion.nombre} readonly />
						<Input name="Fecha inicio" value={formatUnix(capacitacion.inicio._seconds)} readonly />
						<Input name="Fecha fin" value={formatUnix(capacitacion.fin._seconds)} readonly />
					</View>

					{ user && (user.type=='admin' || user.type=='superadmin') ? (
						<View style={{ marginTop: 20 }}>
							<Item text="Cambiar encargado" onPress={changeEncargado} />
							<Item text="Eliminar capacitación" onPress={deleteCapacitacion}  loading={deleting}/>
						</View>
					) : null}
				</>
			) : (
				<LoadingView />
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
	},
	mastheadText: {
		fontSize: 30,
		fontWeight: '700',
		color: 'white',
		padding: 15
	},
})