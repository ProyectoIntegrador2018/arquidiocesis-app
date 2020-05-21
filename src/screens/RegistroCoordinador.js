import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../lib';
import {Image} from 'react-native' ; 

export default (props)=>{

	var [loading, setLoading] = useState(false);
	var [email, setEmail] = useState('prueba@prubea.com');
	var [password, setPassword] = useState('contrasnaprueba');
	var [name, setName] = useState('pepe');
	var [age, setAge] = useState ('80');
	var [gender, setGender] = useState (false);

	var onAdd = props.route.params.onAdd;

	props.navigation.setOptions({
		headerTitle: 'Registro Coordinador'
	});

	var doRegister = ()=>{

	// 	var payload = {
	// 		nombre,
	// 		apellido_paterno,
	// 		apellido_materno,
	// 		fecha_nacimiento, // YYYY-MM-DD, convertir a Date
	// 		estado_civil,
	// 		sexo,
	// 		domicilio,
	// 		colonia,
	// 		municipio,
	// 		telefono_casa,
	// 		telefono_movil,
	// 		email,
	// 		escolaridad,
	// 		oficio,
	// 		ocupacion
	//   }
 

		if(loading) return;
		if(name.length<1) return alert ('Por favor introduzca un nombre.');
		if(age<2) return alert ('Por favor introduzca una edad valida');
		if(!gender) return alert('Favor de seleccionar el sexo.');
		if(email.length<5) return alert('Favor de ingresar un correo electrónico válido.');
		if(password.length<3) return alert('Favor de ingresar una contraseña válida');

		setLoading(true);
		API.registerCoordinador(name, age, gender.value, email, password).then(new_coordinador=>{
			setLoading(false);
			if(!new_coordinador) return alert("Hubo un error registrando el coordinador");
			if(onAdd) onAdd(new_coordinador)
			alert("Se ha agregado el coordinador");
			props.navigation.goBack();
		}).catch(err=>{
			if(err.code==1){
				alert("Ya existe un miembro del sistema con ese correo electrónico.");
			}else{
				alert("Hubo un error registrando el coordinador");
			}
			setLoading(false);
		})
	}

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={true}>
			<Text style={styles.header}>Registrar Coordinador</Text> 
			<Input name="Nombre completo" value={name} onChangeText={setName}/>
			<Input name="Edad" value={age} onChangeText={setAge} keyboard={'number-pad'} />
			<Picker name="Sexo" items={[
				{ label: 'Masculino', value: 'Masculino' },
				{ label: 'Femenino', value: 'Femenino' },
				{ label: 'Sin especificar', value: 'Sin especificar' }
			]} onValueChange={setGender} />

			<Text style={styles.subHeader}>Credenciales</Text> 
			<Input name="Correo electrónico" value={email} onChangeText={setEmail} textContentType={'emailAddress'} keyboard={'email-address'} />
			<Input name="Contraseña" style={{ marginTop: 10 }} value={password} onChangeText={setPassword} textContentType={'password'} password />
			<Button text="Registrar" loading={loading} onPress={doRegister} />
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
		marginTop: 20,
	},
	subHeader: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
		color: 'grey',
		marginBottom: 20,
		marginTop: 10,
	}
})