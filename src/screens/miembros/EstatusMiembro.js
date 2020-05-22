import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button, Picker } from '../../components';
import { API, Util } from '../../lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default (props)=>{
	var [loading, setLoading] = useState(false);

	var { grupo, onEdit } = props.route.params;

	props.navigation.setOptions({
		headerTitle: 'Cambiar estatus',
	});

	var getCoordinadorIndex = ()=>{
		if(!coordinadorList) return;
		return coordinadorList.findIndex(a=>a.id==grupo.coordinador.id);
	}

	var save = ()=>{
		
	}

	return <KeyboardAwareScrollView contentContainerStyle={{ padding: 15 }}>
		
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