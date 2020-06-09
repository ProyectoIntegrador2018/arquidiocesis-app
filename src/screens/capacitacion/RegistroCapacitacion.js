/* 
Nombre: RegistroCapacitación.js
Usuario con acceso: Admin, Acompañante
Descripción: Pantalla para registrar un grupo de capacitación 
*/
import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Picker, Alert, DatePicker } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API, Util } from '../../lib';
import moment from 'moment/min/moment-with-locales'
moment.locale('es')


export default (props)=>{
	var today = moment();

	var [loading, setLoading] = useState(false);
	var [name, setName] = useState('');
	var [dateStart, setDateStart] = useState(today.format('YYYY-MM-DD'));
	var [dateEnd, setDateEnd] = useState(today.add('d', 1).format('YYYY-MM-DD'));
	var [coordinador, setCoordinador] = useState(null);

	var [coordinaList, setCoordinaList] = useState(false);
	var onAdd = props.route.params.onAdd;

	props.navigation.setOptions({
		headerTitle: 'Agregar capacitación'
	});

	useEffect(()=>{
		API.getCoordinadores().then(c=>{
			if(c.length==0){
				API.getCoordinadores(true).then(setCoordinaList);
			}else{
				setCoordinaList(c);
			}
		})
	}, [])

	var formatCoordinadores = ()=>{
		if(!coordinaList) return []
		return coordinaList.map(a=>({ label: `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno}`.trim(), value: a.id }))
	}

	var doRegister = ()=>{
		var data = {
			nombre: name,
			inicio: dateStart,
			fin: dateEnd,
			encargado: coordinador ? coordinador.value : null
		}
		var { valid, prompt } = Util.validateForm(data, {
			nombre: { type: 'empty', prompt: 'Favor de introducir el nombre de la capacitación.' },
			inicio: { type: 'empty', prompt: 'Favor de introducir la fecha de inicio de la capacitación.' },
			fin: { type: 'empty', prompt: 'Favor de introducir la fecha fin de la capacitación.' },
			encargado: { type: 'empty', prompt: 'Favor de seleccionar el encargado de la capacitación.' },
		});

		if(!valid){
			return Alert.alert('Error', prompt);
		}

		var inMom = moment(data.inicio, 'YYYY-MM-DD');
		if(!inMom.isValid()){
			return Alert.alert('Error', 'Favor de introducir la fecha de inicio de la capacitación.')
		}
		var finMom = moment(data.fin, 'YYYY-MM-DD');
		if(!finMom.isValid()){
			return Alert.alert('Error', 'Favor de introducir la fecha fin de la capacitación.')
		}
		if(inMom.isAfter(finMom)){
			return Alert.alert('Error', 'La fecha de inicio debe de ser antes de la fecha final.')
		}

		setLoading(true);
		API.addCapacitacion(data).then(done=>{
			setLoading(false);
			Alert.alert('Exito', 'Se ha agregado la capacitación.');
			props.navigation.goBack();

			data.inicio = {
				_seconds: moment(data.inicio, 'YYYY-MM-DD').unix()
			}
			data.fin = {
				_seconds: moment(data.fin, 'YYYY-MM-DD').unix()
			}

			onAdd(data);
		}).catch(err=>{
			setLoading(false);
			console.log(err);
			if(err.code==999){
				Alert.alert('Error', 'No tienes acceso a esta acción.');
			}else{
				Alert.alert('Error', 'Hubo un error agregando la capacitación.');
			}
		})
	}

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
			<Text style={styles.header}>Nueva Capacitación</Text> 
			<Input name="Nombre" required value={name} onChangeText={setName} />
			<DatePicker onDateChange={d=>setDateStart(d)} date={dateStart} name="Fecha inicio" />
			<DatePicker onDateChange={d=>setDateEnd(d)} date={dateEnd} name="Fecha fin" />
			{coordinaList!==false ? (
				<Picker name="Encargado" items={formatCoordinadores()} placeholder={{ label: 'Selecciona coordinador' }} required onValueChange={setCoordinador} />
			) : (
				<ActivityIndicator style={{ height: 80 }} />
			)}

			<Button text="Registrar" onPress={doRegister} loading={loading} />
		</KeyboardAwareScrollView>
	)
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
	loginContainer: {
		height: '70%', 
		width: '100%', 
		padding: 10
	},
	header: {
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 20,
	}
})