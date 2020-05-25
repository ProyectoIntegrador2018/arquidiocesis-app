import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { AlphabetList, ErrorView, Button, List, Item } from '../../components';
import { FontAwesome5 } from '@expo/vector-icons'
import { API } from '../../lib';
import moment from 'moment/min/moment-with-locales'
moment.locale('es')

export default (props)=>{
	var [grupo, setGrupo] = useState(props.route.params.grupo);
	var [miembros, setMiembros] = useState(false);
	var [asistencias, setAsistencias] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);
	var [sending, setSending] = useState(false);
	var [user, setUser] = useState(false);

	var onDelete = props.route.params.onDelete;
	var onEdit = props.route.params.onEdit;

	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: 'Grupo',
		headerRight: ()=> (miembros!==false && (user && (user.type == 'admin' || user.type == 'superadmin' || user.id==grupo.coordinador))) ? (
			<TouchableOpacity onPress={addMember}>
				<FontAwesome5 name={'plus'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		) : null
	});

	useEffect(()=>{
		API.getUser().then(setUser);

		setError(false);
		var id = grupo.id;
		API.getGrupo(id).then(d=>{
			d.id = id;
			setGrupo(d);
			setMiembros(d.miembros || []);
			setAsistencias(d.asistencias || []);
			setError(false);
		}).catch(err=>{
			if(err.code==999){
				Alert.alert('Error', 'No tienes acceso a este grupo');
			}
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
			if(err.code==999){
				Alert.alert('Error', 'No tienes acceso a este grupo');
			}
			setRefreshing(false);
			setError(true);
		})
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
	
	var viewMember = (item)=>{
		props.navigation.navigate('DetalleMiembro', {
			grupo,
			persona: item,
			onEdit: (id, miembro)=>{
				setMiembros([...miembros.filter(a=>a.id!=id), miembro])
			},
			onStatusChange: (id, status, miembro)=>{
				if(status>0)setMiembros(miembros.filter(a=>a.id!=id));
				else {
					setMiembros([...miembros.filter(a=>a.id!=id), miembro])
				}
			}
		});
	}

	var editGroup = ()=>{
		props.navigation.navigate('EditGrupo', {
			grupo,
			onEdit: (new_grupo)=>{
				setGrupo(new_grupo);
				onEdit(new_grupo.id, new_grupo);
			}
		})
	}

	var changeCoordinador = ()=>{
		props.navigation.navigate('ChangeCoordinador', {
			grupo,
			onEdit: (new_coordinador)=>{
				setGrupo(g=>{
					g.coordinador = new_coordinador;
					return g;
				})
			}
		})
	}

	var bajasTemporales = ()=>{
		props.navigation.navigate('GrupoBajasTemporales', {
			id: grupo.id,
			onEdit: (id, miembro)=>{
				setMiembros([...miembros.filter(a=>a.id!=id), miembro])
			},
			onStatusChange: (id, status, miembro)=>{
				if(status>0)setMiembros(miembros.filter(a=>a.id!=id));
				else {
					setMiembros([...miembros.filter(a=>a.id!=id), miembro])
				}
			}
		})
	}

	var deleteGroup = ()=>{
		if(sending) return false;
		Alert.alert('¿Eliminar grupo?', 'Esto eliminará todos las asistencias, miembros y datos del grupo.', [
			{ text: 'Cancelar', style: 'cancel' },
			{ text: 'Eliminar', style: 'destructive', onPress: ()=>{
				setSending(true);
				API.deleteGrupo(grupo.id).then(done=>{
					setSending(false);
					if(!done) return alert('Hubo un error eliminando el grupo.')
					alert('Se ha eliminado el grupo.');
					if(onDelete) onDelete(grupo.id);
					props.navigation.goBack();
				}).catch(err=>{
					setSending(false);
					console.log(err);
					alert('Hubo un error eliminando el grupo.')
				})
			} }
		]);
	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText} numberOfLines={1}>{grupo.nombre}</Text>
			{ user && (user.type=='admin' || user.type=='superadmin') ? (
				<TouchableOpacity onPress={editGroup}>
					<FontAwesome5 name="edit" style={styles.editIcon} />
				</TouchableOpacity>
			) : null}
		</View>
		<ScrollView refreshControl={
			<RefreshControl refreshing={refreshing} onRefresh={getGrupo} />
		} contentContainerStyle={{ paddingBottom: 50 }}>
			{error ? (
				<ErrorView message={'Hubo un error cargando el grupo...'} refreshing={refreshing} retry={getGrupo} />
			) : miembros!==false ? (
				<View>
					{miembros.length>0 && (user && (user.type == 'admin' || user.type == 'superadmin' || user.id==grupo.coordinador)) && <Button text={'Tomar asistencia'} style={{ width: 200, alignSelf: 'center', marginBottom: 0 }} onPress={assistance} />}
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
						<AlphabetList data={miembros.map(a=>({ ...a, nombre_completo: `${a.nombre} ${a.apellido_paterno}` }))} onSelect={viewMember} scroll={false} sort={'nombre_completo'} />
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
					<View style={{ marginTop: 40 }} />
					{ user && (user.type=='admin' || user.type=='superadmin') && <Item text="Cambiar coordinador" onPress={changeCoordinador} /> }
					<Item text="Ver bajas temporales" onPress={bajasTemporales} />
					{ user && (user.type=='admin' || user.type=='superadmin') && <Item text="Eliminar grupo" onPress={deleteGroup}  loading={sending}/> }
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