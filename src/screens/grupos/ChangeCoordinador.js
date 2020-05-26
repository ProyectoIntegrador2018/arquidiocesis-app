import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Picker } from '../../components';
import { API, Util } from '../../lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default (props)=>{
	var [loading, setLoading] = useState(false);
	var [coordinador, setCoordinador]= useState(false);
	var [coordinadorList, setCoordinadorList] = useState(false);

	var { grupo, onEdit } = props.route.params;
	var coordinador_id = (grupo.coordinador ? grupo.coordinador.id : null);

	props.navigation.setOptions({
		headerTitle: 'Cambiar coordinador',
	});

	useEffect(()=>{
		API.getCoordinadores().then(c=>{
			setCoordinadorList(c);
		})
	}, []);

	var getCoordinadorIndex = ()=>{
		if(!coordinadorList) return;
		return coordinadorList.findIndex(a=>a.id==coordinador_id);
	}

	var save = ()=>{
		if(!coordinador) return alert("Favor de seleccionar un coordinador");
		if(coordinador.id==coordinador_id){
			// Fake change.
			alert("Se ha cambiado el coordinador.");
			props.navigation.goBack();
			return;
		}
		setLoading(true);
		API.changeCoordinador(grupo.id, coordinador.id).then(done=>{
			setLoading(false);
			if(!done) return alert("Hubo un error cambiando el coordinador");
			alert("Se ha cambiado el coordinador.");
			props.navigation.goBack();
			onEdit(coordinador);
		}).catch(err=>{
			setLoading(false);
			return alert("Hubo un error cambiando el coordinador");
		})
	}

	return <KeyboardAwareScrollView contentContainerStyle={{ padding: 15 }}>
		{coordinadorList ? (
			<Picker name={'Seleccionar coordinador'} items={coordinadorList.map(a=>({ label: `${a.nombre} ${a.apellido_paterno} ${a.apellido_materno}`.trim(), value: a.id, ...a }))} onValueChange={setCoordinador} select={getCoordinadorIndex()} />
		) : (
			<ActivityIndicator style={{ height: 80 }} />
		)}
		{coordinador ? (
			<View style={{ marginBottom: 10 }}>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Text style={{ marginRight: 5, fontSize: 16 }}>Nombre:</Text>
					<Text style={{ fontSize: 16 }}>{coordinador.nombre} {coordinador.apellido_paterno} {coordinador.apellido_materno}</Text>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					<Text style={{ marginRight: 5, fontSize: 16 }}>Correo:</Text>
					<Text style={{ fontSize: 16 }}>{coordinador.email}</Text>
				</View>
			</View>
		) : null}
		<Button text="Guardar" loading={loading} onPress={save} />
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