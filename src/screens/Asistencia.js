import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator,TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Input } from '../components'
import { Util, API } from '../lib'
import DatePicker from 'react-native-datepicker';
import moment from 'moment/min/moment-with-locales'
moment.locale('es')

var Screen = (props)=>{
	var isNew = props.route.params.new;
	var [data, setData] = useState(false);
	var [date, setDate] = useState(isNew ? moment().format('YYYY-MM-DD') : props.route.params.date);
	var [sending, setSending] = useState(false);
	var [assistance, setAssistance] = useState([]);
	var pickerRef = useRef(null)

	props.navigation.setOptions({
		headerTitle: 'Editar asistencia'
	})

	// When the screen is shown get data for this group.
	useEffect(()=>{
		if(isNew){
			API.getGrupo(props.route.params.grupo.id, true).then(g=>{
				setData(g.miembros);
			}).catch(err=>{
				Alert.alert('Error cargando asistencia', 'La asistencia solicitada no existe.', [
					{ style: 'cancel', onPress: ()=>{
						props.navigation.goBack();
					} }
				])
			})
		}else{
			API.getAsistencia(props.route.params.grupo.id, props.route.params.date).then(d=>{
				setData(d.miembros);
				setAssistance(d.miembros.filter(a=>a.assist).map(a=>a.id));
			}).catch(err=>{
				if(err.code==34){
					props.route.params.onDelete(date);
				}
				Alert.alert('Error cargando asistencia', 'La asistencia solicitada no existe.', [
					{ style: 'cancel', onPress: ()=>{
						props.navigation.goBack();
					} }
				])
			})
		}
	}, [])

	// Cargando datos
	if(data === false){
		return <View style={{ marginTop: 50 }}>
			<ActivityIndicator size="large" />
			<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
		</View>
	}

	var onCheck = (id, checked) =>{
		setAssistance(p=>checked ? Array.from(new Set([...p, id])) : p.filter(a=>a!=id));
	}

	// Ordenar datos
	var orderedData = Util.organizeListData(data, 'nombre');
	var components = []
	var headers = []
	for(var i in orderedData){
		headers.push(components.length);
		components.push(
			<View key={'header-'+i} style={styles.header}>
				<Text style={styles.headerText}>{i}</Text>
			</View>
		)
		components.push(...orderedData[i].map((a,ix)=><CheckboxItem {...a} onCheck={onCheck} key={'item'+i+'-'+ix} checked={assistance.findIndex(b=>b==a.id)!=-1} />))
	}

	var formatDate = a=>{
		var f = moment(a, 'YYYY-MM-DD').format('MMMM DD, YYYY')
		return f.charAt(0).toUpperCase() + f.substr(1);
	}
	
	var showOverwrite = ()=>{
		Alert.alert('Asistencia ya existe', 'Ya se ha tomado asistencia en esta fecha de este grupo, ¿Deseas reemplazarla por esta?', [
			{ style: 'cancel', text: 'Cancelar' },
			{ text: 'Reemplazar', onPress: ()=>{
				saveAsistencia(true);
			} }
		])
	}

	var saveAsistencia = (force=false)=>{
		setSending(true);
		if(isNew){
			API.registerAsistencia(props.route.params.grupo.id, date, assistance, force).then(done=>{
				setSending(false);
				props.route.params.onAssistance(done);
				alert("Se ha guardado la asistencia.");
				props.navigation.goBack();
			}).catch(err=>{
				if(err.code==52 && !force){
					showOverwrite();
				}else{
					setSending(false);
					alert("Hubo un error marcando la asistencia.");
				}
			})
		}else{
			API.saveAsistencia(props.route.params.grupo.id, date, assistance).then(done=>{
				if(done.deleted){
					props.route.params.onDelete(done.date);
				}
				setSending(false);	
				alert("Se ha guardado la asistencia.");
				props.navigation.goBack();
			}).catch(err=>{
				setSending(false);
				alert("Hubo un error marcando la asistencia.");
			})
		}
	}


	return <View style={StyleSheet.absoluteFillObject}>
		<View style={{ paddingHorizontal: 20, marginTop: 10 }}>
			<Input value={formatDate(date)} name={'Fecha'} readonly onPress={()=>{
				if(isNew) pickerRef.current.onPressDate()
			}} />
		</View>
		<ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 50 }} stickyHeaderIndices={headers}>
			{components}
		</ScrollView>
		<View style={{ backgroundColor: '#012E60', position: 'absolute', bottom: 50, width: 200, borderRadius: 100, alignSelf: 'center' }}>
			<TouchableOpacity onPress={()=>saveAsistencia(false)}>
				{ sending ? (
					<ActivityIndicator size={'small'} style={{ padding: 12 }} />
				) : (
					<Text style={{ color: 'white', fontSize: 20, textAlign: 'center', padding: 10 }}>Guardar</Text>
				)}
			</TouchableOpacity>
		</View>
		<DatePicker
			ref={pickerRef}
        	date={date}
        	mode="date"
        	format="YYYY-MM-DD"
        	confirmBtnText="Confirmar"
        	cancelBtnText="Cancelar"
			customStyles={{
				dateIcon: { display: 'none' },
				dateInput: { display: 'none' }
			}}
			locale={'es'}
			onDateChange={d=>{
				setDate(d);
		  	}}
      />
	</View>
}

export default Screen;


var CheckboxItem = (props)=>{
	var [checked, setChecked] = useState(props.checked);
	var onPress = ()=>{
		props.onCheck(props.id, !checked)
		setChecked(!checked)
	}

	useEffect(()=>{
		setChecked(props.checked);
	}, [props.checked])

	return <TouchableOpacity onPress={onPress}>
		<View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
			<CheckBox 
				checked={checked}
				onPress={onPress}
				containerStyle={{ marginRight: 0 }} />
			<Text style={{ fontSize: 16 }}>{props.nombre}</Text>
		</View>
	</TouchableOpacity>
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
	header: {
		backgroundColor: '#F7F7F7',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#CCC',
		width: '100%',
		padding: 5,
		paddingHorizontal: 15
	},
	headerText: {
		fontWeight: '600'
	}
})
