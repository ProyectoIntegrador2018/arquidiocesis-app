import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { API } from '../lib';
import { FontAwesome5 } from '@expo/vector-icons'
import { Input, Button, Picker, ErrorView } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default (props)=>{
	var [capilla, setCapilla] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [error, setError] = useState(false);
	var [edit, setEdit] = useState(false);
	var [parroquias, setParroquias] = useState(false);

	var [nombre, setNombre] = useState('');
	var [direccion, setDireccion] = useState('');
	var [parroquia, setParroquia] = useState('');

	var onDelete = props.route.params.onDelete;
	var onEdit = props.route.params.onEdit;

	props.navigation.setOptions({
		headerTitle: '',
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
	});

	useEffect(()=>{
		getCapilla()
	}, [])

	var getCapilla = ()=>{
		setRefreshing(true)
		var id = capilla ? capilla.id : props.route.params.id;
		API.getCapilla(id).then(d=>{
			d.parroquia = (capilla.parroquia || props.route.params.parroquia);
			d.id = id;
			setCapilla(d);
			
			setNombre(d.nombre);
			setDireccion(d.direccion);
			setParroquia(d.parroquia.id);

			setError(false);
		}).catch(err=>{
			setRefreshing(false);
			setError(true);
		})
	}

	var setEditing = ()=>{
		setEdit(e=>!e);
		API.getParroquias(false).then(parroquias=>{
			setParroquias(parroquias);
		})
	}

	var selectedParroquia = (v)=>{
		if(v.id==parroquia) setParroquia(false);
		else setParroquia(v.id);
	}

	var saveCapilla = ()=>{
		
	}

	var deleteCapilla = ()=>{
		Alert.alert('¿Eliminar capilla?', 'Esto eliminará los grupos de la capilla y todos los datos de la capilla.', [
			{ text: 'Cancelar', style: 'cancel' },
			{ text: 'Eliminar', style: 'destructive', onPress: ()=>{
				API.deleteCapilla(capilla.parroquia.id, capilla.id).then(done=>{
					alert('Se ha eliminado la capilla.');
					props.navigation.goBack();
					if(onDelete) onDelete(capilla.id);
				}).catch(err=>{
					console.error(err);
					alert('Hubo un error eliminando la capilla.')
				})
			} }
		])
	}

	return <View style={{ flex: 1 }}>
		<View style={styles.headerContainer}>
			<Text style={styles.headerText}>{props.route.params.nombre || capilla.nombre}</Text>
			<TouchableOpacity onPress={setEditing}>
				<FontAwesome5 name="edit" style={styles.editIcon} />
			</TouchableOpacity>
		</View>
		<KeyboardAwareScrollView>
			{error ? (
				<ErrorView message={'Hubo un error cargando la parroquia...'} refreshing={refreshing} retry={getCapilla} />
			) : capilla ? (
				<View style={{ padding: 10 }}>
					{edit && <Text style={{ textAlign: 'center', fontSize: 20 }}>Editando capilla</Text>}
					<Input name={'Nombre'} value={nombre} placeholder={'Nombre'} readonly={!edit} />
					<Input name={'Dirección'} value={direccion} placeholder={'Dirección'} readonly={!edit} />
					<Picker name={'Parroquia'} items={parroquias ? parroquias.map(a=>({ label: a.nombre, value: a.id, ...a })) : []} onValueChange={selectedParroquia} disabled={!edit} placeholder={{ label: capilla.parroquia.nombre }} />
					{edit && <Button text={'Guardar'} onPress={saveCapilla} />}
					{edit && <Button text={'Eliminar'} color={'#FF2233'} onPress={deleteCapilla} />}
				</View>
			) : (
				<View style={{ marginTop: 50 }}>
					<ActivityIndicator size="large" />
					<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
				</View>
			)}
		</KeyboardAwareScrollView>
	</View>
}


const styles = StyleSheet.create({
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
		marginVertical: 10,
		marginTop: 30,
		paddingLeft: 15,
	}
})