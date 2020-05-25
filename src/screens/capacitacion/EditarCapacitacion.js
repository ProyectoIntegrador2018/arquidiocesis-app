import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Input, Button, Picker } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API, Util } from '../../lib';
import DatePicker from 'react-native-datepicker'
import moment from 'moment/min/moment-with-locales'
moment.locale('es')

var formatDate = (a)=>{
	var f = moment(a, 'YYYY-MM-DD').format('MMMM DD, YYYY')
	return f.charAt(0).toUpperCase() + f.substr(1);
}

export default (props)=>{ 
	var { capacitacion, onEdit } = props.route.params;

	var fi = moment.unix(capacitacion.inicio._seconds).format('YYYY-MM-DD');
	var ff = moment.unix(capacitacion.fin._seconds).format('YYYY-MM-DD');

	var [loading, setLoading] = useState(false);
	var [name, setName] = useState(capacitacion.nombre);
	var [dateStart, setDateStart] = useState(fi);
	var [dateEnd, setDateEnd] = useState(ff);
	// var [coordinador, setCoordinador] = useState(false);

	var pickerStartRef = useRef(null);
	var pickerEndRef = useRef(null);

	// var [coordinaList, setCoordinaList] = useState(false);

	props.navigation.setOptions({
		headerTitle: 'Editar capacitación'
	});

	// useEffect(()=>{
	// 	API.getCoordinadores().then(c=>{
	// 		if(c.length==0){
	// 			API.getCoordinadores(true).then(setCoordinaList);
	// 		}else{
	// 			setCoordinaList(c);
	// 		}
	// 	})
	// }, [])

	// var formatCoordinadores = ()=>{
	// 	if(!coordinaList) return []
	// 	return coordinaList.map(a=>({ label: `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno}`.trim(), value: a.id }))
	// }

	var save = ()=>{
		var data = {
			nombre: name,
			inicio: dateStart,
			fin: dateEnd,
		}
		var { valid, prompt } = Util.validateForm(data, {
			nombre: { type: 'empty', prompt: 'Favor de introducir el nombre de la capacitación.' },
			inicio: { type: 'empty', prompt: 'Favor de introducir la fecha de inicio de la capacitación.' },
			fin: { type: 'empty', prompt: 'Favor de introducir la fecha fin de la capacitación.' },
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

		API.editCapacitacion(capacitacion.id, data).then(done=>{
			data.inicio = {
				_seconds: inMom.unix()
			}
			data.fin = {
				_seconds: finMom.unix()
			}
			onEdit(data);
			setLoading(false);
			Alert.alert('Exito', 'Se ha editado la capacitación.');
		}).catch(err=>{
			console.log(err);
			Alert.alert('Error', 'Hubo un error editado la capacitación.');
			setLoading(false);
		})

		// setLoading(true);
		// API.addCapacitacion(data).then(done=>{
		// 	setLoading(false);
		// 	Alert.alert('Exito', 'Se ha agregado la capacitación.');
		// 	props.navigation.goBack();
		// 	onAdd(data);
		// }).catch(err=>{
		// 	setLoading(false);
		// 	console.log(err);
		// 	if(err.code==999){
		// 		Alert.alert('Error', 'No tienes acceso a esta acción.');
		// 	}else{
		// 		Alert.alert('Error', 'Hubo un error agregando la capacitación.');
		// 	}
		// })
	}

	// var getCoordinadorIndex = ()=>{
	// 	if(!coordinaList) return -1;
	// 	return coordinaList.findIndex(a=>a.id==capacitacion.encargado);
	// }

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
			<Input name="Nombre" required value={name} onChangeText={setName} />
			<Input name="Fecha inicio" value={formatDate(dateStart)} readonly required onPress={()=>{
				pickerStartRef.current.onPressDate()
			}} />
			<Input name="Fecha fin" value={formatDate(dateEnd)} readonly required onPress={()=>{
				pickerEndRef.current.onPressDate()
			}} />
			{/* {coordinaList!==false ? (
				<Picker name="Encargado" items={formatCoordinadores()} placeholder={{ label: 'Selecciona coordinador' }} required onValueChange={setCoordinador} select={getCoordinadorIndex()} />
			) : (
				<ActivityIndicator style={{ height: 80 }} />
			)} */}

			<Button text="Guardar" onPress={save} loading={loading} />



			<DatePicker
				ref={pickerStartRef}
				date={dateStart}
				mode="date"
				format="YYYY-MM-DD"
				confirmBtnText="Confirmar"
				cancelBtnText="Cancelar"
				customStyles={{
					dateIcon: { display: 'none' },
					dateInput: { display: 'none' }
				}}
				locale={'es'}
				onDateChange={d=>setDateStart(d)}
			/>


			<DatePicker
				ref={pickerEndRef}
				date={dateEnd}
				mode="date"
				format="YYYY-MM-DD"
				confirmBtnText="Confirmar"
				cancelBtnText="Cancelar"
				customStyles={{
					dateIcon: { display: 'none' },
					dateInput: { display: 'none' }
				}}
				locale={'es'}
				onDateChange={d=>setDateEnd(d)}
			/>
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