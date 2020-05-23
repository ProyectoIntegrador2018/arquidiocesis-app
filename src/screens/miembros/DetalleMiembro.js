import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import { API } from '../../lib';
import { FontAwesome5 } from '@expo/vector-icons'
import { Input, Button, Picker, ErrorView, Item, LoadingView } from '../../components';
import moment from 'moment/min/moment-with-locales'
moment.locale('es')


export default (props)=>{
	var [persona, setPersona] = useState(false)
	var [refreshing, setRefreshing] = useState(false);

	var { onEdit, onStatusChange } = props.route.params;

	props.navigation.setOptions({
		headerTitle: 'Detalle Miembro',
		headerRight: ()=>(
			<TouchableOpacity onPress={editPersona}>
				<FontAwesome5 name={'edit'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
	});

	
	useEffect(()=>{
		API.getMiembro(props.route.params.persona.id).then(miembro=>{
			setRefreshing(false);
			if(!miembro){
				alert("Hubo un error cargando al miembro...");
				props.navigation.goBack();
			}
			setPersona(miembro);
		}).catch(err=>{
			setRefreshing(false);
			alert("Hubo un error cargando al miembro...");
			props.navigation.goBack();
		})
	}, []);

	var getPersona = ()=>{
		setRefreshing(true);
		API.getMiembro(persona.id, true).then(miembro=>{
			setRefreshing(false);
			if(!miembro){
				alert("Hubo un error cargando al miembro...");
				props.navigation.goBack();
			}
			setPersona(miembro);
		}).catch(err=>{
			setRefreshing(false);
			alert("Hubo un error cargando al miembro...");
			props.navigation.goBack();
		})
	}

	
	var editMedical = ()=>{
		props.navigation.navigate('FichaMedica', { persona });
	}

	var editStatus = ()=>{
		props.navigation.navigate('EstatusMiembro', {
			persona,
			onEdit: status=>{
				var p = {...persona};
				p.estatus = status;
				setPersona(p);
				onStatusChange(persona.id, status, p);
			}
		});
	}

	var editPersona = ()=>{
		props.navigation.navigate('EditMiembro', { 
			persona,
			onEdit: data=>{
				var p = {...persona}
				for(var i in data){
					p[i] = data[i];
				}
				setPersona(p);
				onEdit(persona.id, p);
			}
		});
	}

	var getStatus = ()=>{
		if(!persona) return '';
		switch(persona.estatus){
			case 0: return 'Activo';
			case 1: return 'Baja temporal';
			case 2: return 'Baja definitiva';
			default: return 'Activo';
		}
	}

	var getFechaNacimiento = ()=>{
		var f = moment.unix(persona.fecha_nacimiento._seconds).format('MMMM DD, YYYY')
		return f.charAt(0).toUpperCase() + f.substr(1);
	}

	return <View style={{ flex: 1 }}>
		{persona===false ? (
			<LoadingView />
		) : (
			<ScrollView refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={getPersona} />
			}>
				<Text style={[styles.section, { marginTop: 10 }]}>Opciones</Text>
				<Item text="Ficha medica" onPress={editMedical} />
				<Item text="Cambiar estatus" onPress={editStatus} />
				<View style={{ padding: 15 }}>
					<Input name="Nombre" value={persona.nombre} readonly />
					<Input name="Apellido Paterno" value={persona.apellido_paterno} readonly />
					<Input name="Apellido Materno" value={persona.apellido_materno} readonly />
					<Input name="Estatus" textStyle={{ color: persona.estatus==2 ? 'red' : persona.estatus==1 ? 'orange' : 'black' }} value={getStatus()} readonly />
					<Input name='Fecha de nacimiento' value={getFechaNacimiento()}readonly />
					<Input name='Estado Civil' value={persona.estado_civil} readonly />
					<Input name='Sexo' value={persona.sexo} readonly />
					<Input name='Correo Electrónico' value={persona.email} readonly />
					<Input name='Grado escolaridad' value={persona.escolaridad} readonly />
					<Input name='Oficio' value={persona.oficio} readonly />

					<Text style={styles.infoSection}>Domicilio</Text> 
					<Input name="Domicilio" value={persona.domicilio.domicilio} readonly />
					<Input name="Colonia" value={persona.domicilio.colonia} readonly />
					<Input name="Municipio" value={persona.domicilio.municipio} readonly />
					<Input name="Teléfono Casa" value={persona.domicilio.telefono_casa} readonly />
					<Input name="Teléfono Móvil" value={persona.domicilio.telefono_movil} readonly />
				</View>
			</ScrollView>
		)}
	</View>
}


const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#002E60',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	editIcon: {
		paddingRight: 15,
		color: 'white',
		fontSize: 35
	},	
	headerText: {
		fontSize: 20,
		fontWeight: '700',
		color: 'white',
		padding: 15
	},
	infoSection: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
		color: 'grey',
		marginBottom: 10,
		marginTop: 20,
	},
	section: {
		fontSize: 16,
		color: 'gray',
		marginVertical: 10,
		marginTop: 30,
		fontWeight: '500',
		paddingLeft: 15,
	}
})