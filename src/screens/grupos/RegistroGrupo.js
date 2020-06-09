/* 
Nombre: RegistroGrupo.js
Usuario con acceso: Admin
Descripción: Pantalla para registrar un grupo HEMA
*/
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet,  Switch, ActivityIndicator} from 'react-native';
import { Input, Button, Picker } from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../../lib';

export default (props)=>{
	var [loading, setLoading] = useState(false);
	var [name, setName] = useState('');
	var [coordinador, setCoordinador] = useState(false);
	var [parroquia, setParroquia] = useState(false);
	var [capilla, setCapilla] = useState(false);
	var [isEnabled, setIsEnabled] = useState(false);
	
	var [coordinadorList, setCoordinadorList] = useState(false);
	var [parroquiasList, setParroquiasList] = useState(false);
	var [capillasList, setCapillasList] = useState(false);

	props.navigation.setOptions({
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
		headerTitle: 'Registro Grupo'
	});

	var onAdd = props.route.params.onAdd;

	useEffect(()=>{
		API.getParroquias().then(d=>{
			setParroquiasList(d);
		});

		API.getCoordinadores().then(c=>{
			setCoordinadorList(c);
		})
	}, [])

	var doRegister = ()=>{
		if(loading) return;
		if(name.length<1) return alert ('Por favor introduzca un nombre.');
		if(!coordinador) return alert ('Favor de seleccionar un coordinador.');
		if(!parroquia) return alert("Favor de seleccionar una parroquia");

		setLoading(true);
		API.addGrupo(name, coordinador.value, (capilla && isEnabled ? null : parroquia.value), (capilla ? capilla.value : null)).then(new_grupo=>{
			setLoading(false);
			if(!new_grupo) return alert("Hubo un error registrando el coordinador");
			new_grupo.new = true;
			if(onAdd) onAdd(new_grupo)
			alert("Se ha agregado el grupo");
			props.navigation.goBack();
		}).catch(err=>{
			console.error(err);
			alert("Hubo un error registrando el grupo");
			setLoading(false);
		})
	}

	var parroquiaSelected = (p, state=false)=>{
		setParroquia(p);
		setCapilla(null);
		setCapillasList(false)
		if(!isEnabled && !state) return;
		API.getParroquia(p.value).then(c=>{
			setCapillasList(c.capillas || []);
		});
	}

	var toggleSwitch = () => {
		var ps = isEnabled;
		setIsEnabled(!ps);
		if(!ps && parroquia){
			parroquiaSelected(parroquia, !ps)
		}
	}

	return (
		<KeyboardAwareScrollView style={styles.container} bounces={false}>
			<Text style={styles.header}>Registrar Grupo</Text> 
			<Input name="Nombre" value={name} onChangeText={setName} />
			{coordinadorList ? (
				<Picker name={'Seleccionar coordinador'} items={coordinadorList.map(a=>({ label: a.nombre, value: a.id, ...a }))} onValueChange={setCoordinador} />
			) : (
				<ActivityIndicator style={{ height: 80 }} />
			)}
			{coordinador ? (
				<View style={{ marginBottom: 10 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text style={{ marginRight: 5, fontSize: 16 }}>Nombre:</Text>
						<Text style={{ fontSize: 16 }}>{coordinador.nombre}</Text>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text style={{ marginRight: 5, fontSize: 16 }}>Correo:</Text>
						<Text style={{ fontSize: 16 }}>{coordinador.email}</Text>
					</View>
				</View>
			) : null}
			{parroquiasList ? (
				<Picker name={'Seleccionar Parroquia'} items={parroquiasList.map(a=>({ label: a.nombre, value: a.id }))} onValueChange={parroquiaSelected} />
			) : (
				<ActivityIndicator style={{ height: 80 }} />
			)}
			{parroquia ? (
				<View>
					<Text style={styles.label}>¿Pertenece a Capilla?</Text>
					<View style={styles.checkboxContainer}>
						<Switch
							trackColor={{ false: "#767577", true: "#32CD32" }}
							thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
				</View>
			) : null}
			{isEnabled ? (
				capillasList ? (
					capillasList.length>0 ? (
						<Picker name={'Seleccionar Capilla'} items={capillasList.map(a=>({ label: a.nombre, value: a.id }))} onValueChange={setCapilla} />
					) : (
						<Text style={{ fontSize: 16, textAlign: 'center', color: 'gray', padding: 10, backgroundColor: 'white' }}>Esta parroquia no tiene capillas.</Text>
					)
				) : (
					<ActivityIndicator style={{ height: 80 }} />
				)
			) : null}
			<Button text="Registrar" loading={loading} onPress={doRegister} />
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: 'grey',
		fontWeight: '500'
	},
	container: {
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
	checkboxContainer: {
		flexDirection: "row",
		marginBottom: 20,
	},
})