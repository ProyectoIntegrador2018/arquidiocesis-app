import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button, Picker } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API, Util } from '../../lib';
import DatePicker from 'react-native-datepicker';
import moment from 'moment/min/moment-with-locales'
moment.locale('es')
;


export default (props) => {
	var { persona } = props.route.params;

	var [loading, setLoading] = useState(false);
	var [name, setName] = useState(persona.nombre);
	var [apPaterno, setApPaterno] = useState(persona.apellido_paterno);
	var [apMaterno, setApMaterno] = useState(persona.apellido_materno);
	var [email, setEmail] = useState(persona.email);
	var [birthday, setBirthday] = useState(moment.unix(persona.fecha_nacimiento._seconds).format('YYYY-MM-DD'));
	var [gender, setGender] = useState(false);
	var [estadoCivil, setEstadoCivil] = useState(false);
	var [domicilio, setDomicilio] = useState(persona.domicilio.domicilio);
	var [colonia, setColonia] = useState(persona.domicilio.colonia);
	var [municipio, setMunicipio] = useState(persona.domicilio.municipio);
	var [phoneHome, setPhoneHome] = useState(persona.domicilio.telefono_casa);
	var [phoneMobile, setPhoneMobile] = useState(persona.domicilio.telefono_movil);
	var [escolaridad, setEscolaridad] = useState(false);
	var [oficio, setOficio] = useState(false);
	var pickerRef = useRef(null);

	var { onEdit } = props.route.params;

	
	props.navigation.setOptions({
		headerTitle: 'Editar Miembro'
	});

	var save = () => {
		if(loading) return;
		var data =  {
			nombre: name,
			apellido_paterno: apPaterno,
			apellido_materno: apMaterno,
			fecha_nacimiento: birthday,
			estado_civil: estadoCivil,
			sexo: gender,
			email: email,
			escolaridad: escolaridad,
			oficio: oficio,
			domicilio: {
				domicilio: domicilio,
				colonia: colonia,
				municipio: municipio,
				telefono_casa: phoneHome,
				telefono_movil: phoneMobile,
			}
		}

		var { valid, prompt } = Util.validateForm(data, {
			nombre: { type: 'minLength', value: 3, prompt: 'Favor de introducir el nombre.' },
			apellido_paterno: { type: 'empty', prompt: 'Favor de introducir el apelldio paterno.' },
			fecha_nacimiento: { type: 'empty', prompt: 'Favor de introducir la fecha de nacimiento.' },
			sexo: { type: 'empty', prompt: 'Favor de introducir el sexo.' },
			estado_civil: { type: 'empty', prompt: 'Favor de introducir el estado civil.' },
			escolaridad: { type: 'empty', prompt: 'Favor de introducir la escolaridad.' },
			oficio: { type: 'empty', prompt: 'Favor de introducir el oficio.' },
		});

		if(!valid){
			return Alert.alert('Error', prompt);
		}
		
		setLoading(true);
		API.editMiembro(persona.id, data).then(done=>{
			setLoading(false)
			if(!done) return Alert.alert('Error', "Hubo un error editando el miembro.");
			onEdit(data);
			Alert.alert('Exito', "Se ha editado el miembro.");
		}).catch(err=>{
			if(err.code && err.code==999){
				Alert.alert('Error', "No tienes acceso a este grupo.");
			}else{
				Alert.alert('Error', "Hubo un error editando el miembro.");
			}
			setLoading(false);
		})
	}

	var formatDate = a=>{
		var f = moment(a, 'YYYY-MM-DD').format('MMMM DD, YYYY')
		return f.charAt(0).toUpperCase() + f.substr(1);
	}

	var getEstadoCivil = ()=>{
		return ['Soltero', 'Casado', 'Viudo', 'Unión Libre', 'Divorciado'].indexOf(persona.estado_civil);
	}

	var getGenero = ()=>{
		return ['Masculino', 'Femenino', 'Sin especificar'].indexOf(persona.sexo);
	}

	var getEscolaridad = ()=>{
		return ['Ninguno', 'Primaria', 'Secundaria', 'Técnica carrera', 'Maestría', 'Doctorado'].indexOf(persona.escolaridad);
	}

	var getOficio = ()=>{
		return ['Ninguno', 'Plomero', 'Electricista', 'Carpintero', 'Albañil', 'Pintor', 'Mecánico', 'Músico', 'Chofer'].indexOf(persona.oficio);
	}

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={true}>
			<Text style={styles.header}>Editar Miembro</Text> 
			<Input name="Nombre" value={name} onChangeText={setName}/>
			<Input name="Apellido Paterno" value={apPaterno} onChangeText={setApPaterno}/>
			<Input name="Apellido Materno" value={apMaterno} onChangeText={setApMaterno}/>
			<Input value={formatDate(birthday)} name={'Fecha de nacimiento'} readonly onPress={()=>{
				pickerRef.current.onPressDate()
			}} />
			<Picker name="Estado Civil" items={['Soltero', 'Casado', 'Viudo', 'Unión Libre', 'Divorciado']} onValueChange={setEstadoCivil} select={getEstadoCivil()} />
			<Picker name="Sexo" items={['Masculino', 'Femenino', 'Sin especificar']} onValueChange={setGender} select={getGenero()} />
			<Input name="Correo electrónico" value={email} onChangeText={setEmail} placeholder={'Opcional...'} keyboard={'email-address'}/>
			<Picker name="Grado escolaridad" items={[
				'Ninguno', 'Primaria',
				'Secundaria', 'Técnica carrera', 
				'Maestría', 'Doctorado'
			]} onValueChange={setEscolaridad} select={getEscolaridad()} />
			<Picker name="Oficio" items={[
				'Ninguno', 'Plomero', 
				'Electricista', 'Carpintero', 
				'Albañil', 'Pintor', 'Mecánico', 
				'Músico', 'Chofer'
			]} onValueChange={setOficio} select={getOficio()} />

			<Text style={styles.section}>Domicilio</Text> 
			<Input name="Domicilio" value={domicilio} onChangeText={setDomicilio} />
			<Input name="Colonia" value={colonia} onChangeText={setColonia} />
			<Input name="Municipio" value={municipio} onChangeText={setMunicipio} />
			<Input name="Teléfono Casa" value={phoneHome} onChangeText={setPhoneHome} />
			<Input name="Teléfono Móvil" value={phoneMobile} onChangeText={setPhoneMobile} />

			<Button text="Guardar" loading={loading} onPress={save} />

			<DatePicker
				ref={pickerRef}
				date={birthday}
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
					setBirthday(d);
				}}
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
		marginBottom: 5,
		marginTop: 20,
	},
	subHeader: {
		fontSize: 20,
		textAlign: 'center',
		color: 'grey',
		marginBottom: 20,
	},
	section: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
		color: 'grey',
		marginBottom: 10,
		marginTop: 20,
	}
})