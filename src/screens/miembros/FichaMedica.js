/* 
Nombre: FichaMedica.js
Usuario con acceso: Admin, acompañante, coordinador
Descripción: Pantalla para ver la ficha medica de un miembro de un grupo HEMA
*/
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { API } from '../../lib';
import { Input, Button, Picker, Alert } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default (props)=>{
	var { persona, canEdit } = props.route.params;
	if(!persona.ficha_medica){
		persona.ficha_medica = {
			tipo_sangre: '',
			alergico: false,
			servicio_medico: false,
			ambulancia: false,
			padecimientos: ''
		}
	}

	var [bloodType, setBloodType] = useState(false);
	var [alergic, setAlergic] = useState(persona.ficha_medica.alergico);
	var [medicalSerivce, setMedicalService] = useState(false);
	var [ambulance, setAmbulance] = useState(persona.ficha_medica.ambulancia);
	var [padecimientos, setPadecimientos] = useState(persona.ficha_medica.padecimientos);
	var [loading, setLoading] = useState(false);

	props.navigation.setOptions({
		headerTitle: 'Ficha Medica',
	});
	
	var saveFicha=()=>{
		var data = {
			tipo_sangre: (bloodType || ''),
			alergico: alergic,
			servicio_medico: (medicalSerivce || ''),
			ambulancia: ambulance,
			padecimientos
		}
		setLoading(true);
		API.setFichaMedica(persona.id, data).then(done=>{
			setLoading(false);
			Alert.alert('Exito', 'Se ha guardado la ficha medica.')
		}).catch(err=>{
			console.log(err);
			setLoading(false);
			Alert.alert('Error', 'Hubo un error guardando la ficha medica')
		})
	}

	var getServicioMedico = ()=>{
		if(!persona.ficha_medica.servicio_medico) return -1;
		return [ 'Ninguno', 'IMSS', 'ISSTE', 'SSA', 'NOVA', 'Otro' ].indexOf(persona.ficha_medica.servicio_medico);
	}

	var getBloodType = ()=>{
		if(!persona.ficha_medica.tipo_sangre) return -1;
		return [ 'O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+' ].indexOf(persona.ficha_medica.tipo_sangre);
	}
	
	return (
		<KeyboardAwareScrollView contentContainerStyle={{ padding: 15, marginTop: 10 }}>
			{canEdit ? (
				<Picker 
					readonly={!canEdit}
					name={'Tipo de Sangre'} 
					items={[
						'O-', 	'O+',
						'A-', 	'A+',
						'B-', 	'B+',
						'AB-', 	'AB+',
					]}
					select={getBloodType()}
					onValueChange={setBloodType}
				/>
			) : (
				<Input value={persona.ficha_medica.tipo_sangre} name="Tipo de Sangre" readonly={true} />
			)}
			
			<Text style={styles.label}>¿Alergico a Medicamentos?</Text>
			<View style={styles.checkboxContainer}>
				<Switch
					disabled={!canEdit}
					trackColor={{ false: "#767577", true: "#32CD32" }}
					thumbColor={alergic ? "#FFFFFF" : "#f4f3f4"}
					onValueChange={setAlergic}
					value={alergic}
				/>
			</View>
			{canEdit ? (
				<Picker
					name={'Servicio Médico'} 
					items={[ 'Ninguno', 'IMSS', 'ISSTE', 'SSA', 'NOVA', 'Otro' ]}
					select={getServicioMedico()}
					onValueChange={setMedicalService}
				/>
			) : (
				<Input value={persona.ficha_medica.servicio_medico} name="Servicio Médico" readonly={true} />
			)}
			<Text style={styles.label}>Servicio de Ambulancia</Text>
			<View style={styles.checkboxContainer}>
				<Switch
					disabled={!canEdit}
					trackColor={{ false: "#767577", true: "#32CD32" }}
					thumbColor={ambulance ? "#FFFFFF" : "#f4f3f4"}
					onValueChange={setAmbulance}
					value={ambulance}
				/>
			</View>
			{/* fin switch ambulancia */}
			<Input multiline={true} name={'Padecimientos'} value={padecimientos} height={200} onChangeText={setPadecimientos} placeholder={'Padecimientos'} readonly={!canEdit} />
			{ canEdit && <Button text={'Guardar'} onPress={saveFicha} loading={loading} />}
		</KeyboardAwareScrollView>		
	)
}
		
		
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start' // if you want to fill rows left to right
	},
	item: {
		width: '10%' // is 50% of container width
	},
	fields:{
		width: '100%',
		height: 55,
		margin: 0,
		padding: 8,
		color: 'black',
		borderRadius: 14,
		fontSize: 18,
		fontWeight: '500',
	},
	boton:{
		paddingTop:'50%',
		backgroundColor: '#42A5F5',
		color:'black',
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: 'grey',
		fontWeight: '500'
	},
	checkboxContainer: {
		alignItems: 'flex-start',
		marginBottom: 10
	}
})