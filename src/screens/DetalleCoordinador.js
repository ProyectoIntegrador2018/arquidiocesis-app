import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { API } from '../lib';
import { FontAwesome5 } from '@expo/vector-icons'
import { Input, Button, Picker, ErrorView } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default (props)=>{
	var [persona, setPersona] = useState(props.route.params.persona)
	var [error, setError] = useState(false);
	var [sending, setSending] = useState(false);
	var [refreshing, setRefreshing] = useState(false);
	var [edit, setEdit] = useState(false);

	var editField = (key)=>{
		return (val)=>{
			setPersona(a=>{
				a[key] = val;
				return a;
			})
		}
	}


	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: 'Coordinador',
		headerRight: ()=>(
			<TouchableOpacity onPress={() => setEdit(e=>!e)}>
				<FontAwesome5 name={'edit'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
	});

	var getPersona = ()=>{

	}

	var savePersona = ()=>{
		setSending(true);
		setTimeout(()=>{
			setSending(false);
		}, 1000)
	}

	var deletePersona = ()=>{

	}

	var getGender = ()=>{
		var ix = ['Masculino', 'Femenino', 'Sin especificar'].indexOf(persona.sexo);
		return ix==-1 ? 2 : ix;
	}

	var getStatus = ()=>{
		console.log(persona)
		var ix = ['Activo', 'Baja Parcial'].indexOf(persona.estatus);
		return ix==-1 ? 0 : ix;
    }
    
    var getGrupo =()=>{
        console.log(grupo)
        var ix = ['grupo 1','grupo 2','grupo 3'].indexOf(persona.grupo);
        return ix==-1  ? 0 : ix;
    }

	return <View style={{ flex: 1 }}>
		<KeyboardAwareScrollView>
			{error ? (
				<ErrorView message={'Hubo un error cargando el coordinador...'} refreshing={refreshing} retry={getPersona} />
			) : persona ? (
				<View style={{ padding: 10 }}>
					{edit && <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>Editando persona</Text>}
					<Input name={'Nombre'} value={persona.nombre} onChangeText={editField('nombre')} placeholder={'Nombre'} readonly={!edit} />
					<Input name={'Edad'} value={persona.edad} onChangeText={editField('edad')} placeholder={'Edad'} keyboardType={'number-pad'} readonly={!edit} />
					<Input name={'Correo electrónico'} value={persona.email} onChangeText={editField('email')} placeholder={'Correo electrónico'} keyboardType={'email-address'} readonly={!edit} />
					<Picker name="Sexo" items={[
						{ label: 'Masculino', value: 'Masculino' },
						{ label: 'Femenino', value: 'Femenino' },
						{ label: 'Sin especificar', value: 'Sin especificar' }
					]} onValueChange={v=>v ? editField('sexo')(v.value) : null} select={getGender()} disabled={!edit} />
                    {/* picker de grupo */}
                    <Picker name="Grupo" items={[
						{ label: 'Grupo 1', value: 'Grupo 1' },
						{ label: 'Grupo 2', value: 'Grupo 2' },
						{ label: 'Grupo 3', value: 'Grupo 3' }
					]} onValueChange={v=>v ? editField('sexo')(v.value) : null} select={getGender()} disabled={!edit} />
                    {/* fin picker grupo */}
					{ persona.estatus=='Baja Definitiva' ? null : (
						<Picker name="Estatus" items={[
							{ label: 'Activo', value: 'Activo' },
							{ label: 'Baja Parcial', value: 'Baja Parcial' }
						]} onValueChange={v=>v ? editField('estatus')(v.value) : null} select={getStatus()} disabled={!edit} />
					) }
					{edit && <Button text={'Guardar'} onPress={savePersona} loading={sending} />}
					{edit && <Button text={'Baja definitiva'} color={'#FF2233'} onPress={deletePersona} loading={sending} />}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  item: {
    width: '50%'
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
  }
})