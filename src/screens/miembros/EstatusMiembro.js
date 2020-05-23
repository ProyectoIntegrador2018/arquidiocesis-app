import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button, Picker } from '../../components';
import { API, Util } from '../../lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default (props)=>{
	var [loading, setLoading] = useState(false);
	var [status, setStatus] = useState(false);

	var { grupo, onEdit, persona } = props.route.params;

	props.navigation.setOptions({
		headerTitle: 'Cambiar estatus',
	});

	var actuallySave = ()=>{
		setLoading(true);
		API.editMiembroStatus(persona.id, status.value).then(done=>{
			setLoading(false);
			if(!done) return Alert.alert('Error', 'Hubo un error editando el estatus del miembro.');
			onEdit(status.value);
			return Alert.alert('Exito', 'Se ha editado el estatus del miembro.');
		}).catch(err=>{
			setLoading(false);
			if(err.code && err.code==999){
				Alert.alert('Error', "No tienes acceso a este grupo.");
			}else{
				return Alert.alert('Error', 'Hubo un error editando el estatus del miembro.');
			}
		})
	}

	var save = ()=>{
		if(loading) return;
		if(!status || status.value<0 || status.value>2) return;
		if(status.value==2){
			Alert.alert('Baja definitiva', '¿Deseas dar de baja definitiva a este miembro?', [
				{ text: 'Cancelar', style: 'cancel' },
				{ text: 'Aceptar', style: 'destructive', onPress: actuallySave }
			])
		}else{
			actuallySave();
		}
	}

	return <KeyboardAwareScrollView contentContainerStyle={{ padding: 15 }}>
		<Picker name="Estatus" items={[
			{ label: 'Activo', value: 0 },
			{ label: 'Baja temporal', value: 1 },
			{ label: 'Baja definitiva', value: 2 }
		]} onValueChange={setStatus} select={persona.estatus} />
		{ status && status.value==2 ? (
			<View style={{ backgroundColor: 'red', borderRadius: 4, padding: 15 }}>
				<Text style={{ color: 'white' }}>Al seleccionar <Text style={{ fontWeight: 'bold' }}>BAJA DEFINITIVA</Text> se borrará el miembro del sistema. Ya no se podrá ver en el sistema y solo aparecerá en las asistencias previas.</Text>
			</View>
		) : null}
		<Button text="Guardar" onPress={save} loading={loading} />
	</KeyboardAwareScrollView>;
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: 'grey',
		fontWeight: '500'
	}
})