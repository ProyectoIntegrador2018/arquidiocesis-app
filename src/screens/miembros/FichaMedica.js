import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Switch } from 'react-native';
import { API } from '../../lib';
import { Input, Button, Picker, LoadingView } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default (props)=>{

	var { persona } = props.route.params;

	var [bloodType, setBloodType] = useState('');
	var [alergic, setAlergic] = useState(false);
	var [medicalSerivce, setMedicalService] = useState(false);
	var [ambulance, setAmbulance] = useState(false);
	var [padecimientos, setPadecimientos] = useState('');
	var [loading, setLoading] = useState(false);
	var [getting, setGetting] = useState(true);

	useState(()=>{
		setGetting(true);
		API.getFichaMedica(persona.id).then(ficha=>{
			setGetting(false);
			if(!ficha) return;
			setBloodType(ficha.tipo_sangre);
			setAlergic(ficha.alergico);
			setMedicalService(ficha.servicio_medico);
			setAmbulance(ficha.ambulancia);
			setPadecimientos(ficha.padecimientos);
		}).catch(err=>{
			setGetting(false);
			Alert.alert('Error', 'Hubo un error consiguiendo la ficha medica')
		});
	}, [])

	props.navigation.setOptions({
		headerTitle: 'Ficha Medica',
	});
	
	var saveFicha=()=>{
		var data = {
			tipo_sangre: bloodType,
			alergico: alergic,
			servicio_medico: medicalSerivce,
			ambulancia: ambulance,
			padecimientos
		}
		setLoading(true);
		API.setFichaMedica(persona.id, data).then(done=>{
			setLoading(false);
			Alert.alert('Exito', 'Se ha guardado la ficha medica.')
		}).catch(err=>{
			setLoading(false);
			Alert.alert('Error', 'Hubo un error guardando la ficha medica')
		})
	}

	if(getting){
		return <LoadingView />
	}

	return (
		<KeyboardAwareScrollView contentContainerStyle={{ padding: 15, marginTop: 10 }}>
			<Picker 
				name={'Tipo de Sangre'} 
				items={[
					'O-', 	'O+',
					'A-', 	'A+',
					'B-', 	'B+',
					'AB-', 	'AB+',
				]}
			/>
			{/* switch alergia */}
			<Text style={styles.label}>¿Alergico a Medicamentos?</Text>
			<View style={styles.checkboxContainer}>
				<Switch
					trackColor={{ false: "#767577", true: "#32CD32" }}
					thumbColor={alergic ? "#FFFFFF" : "#f4f3f4"}
					onValueChange={setAlergic}
					value={alergic}
				/>
			</View>
			{/* fin switch alergia */}
			<Picker 
				name={'Servicio Medico'} 
				items={[ 'Ninguno', 'IMSS', 'ISSTE', 'SSA', 'NOVA', 'Otro' ]}
			/>
			{/* switch ambulancia */}
			<Text style={styles.label}>Servicio de Ambulancia</Text>
			<View style={styles.checkboxContainer}>
				<Switch
					trackColor={{ false: "#767577", true: "#32CD32" }}
					thumbColor={ambulance ? "#FFFFFF" : "#f4f3f4"}
					onValueChange={setAmbulance}
					value={ambulance}
				/>
			</View>
			{/* fin switch ambulancia */}
			<Input multiline={true} name={'Padecimientos'} value={padecimientos} height={200} onChangeText={setPadecimientos} placeholder={'Padecimientos'} />
			<Button text={'Guardar'} onPress={saveFicha} loading={loading} />
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