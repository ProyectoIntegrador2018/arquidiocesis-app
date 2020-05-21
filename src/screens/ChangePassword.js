import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Button } from '../components'
import { API } from '../lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default (props)=>{
	var [oldPassword, setOldPassword] = useState('');
	var [newPassword, setNewPassword] = useState('');
	var [newPassword2, setNewPassword2] = useState('');
	var [loading, setLoading] = useState(false);

	var admin_email = props.route.params.admin_email

	props.navigation.setOptions({
		headerTitle: 'Cambiar contraseña'
	});

	var changePassword = ()=>{
		if(oldPassword.length==0 && !admin_email){
			return alert('Favor de introducir la contraseña actual.');
		}
		if(newPassword.length<5){
			return alert('La contraseña debe de ser de minimo 5 caracteres.');
		}
		if(newPassword2!=newPassword){
			return alert('Las nuevas contraseñas no concuerdan.');
		}
		setLoading(true);

		if(admin_email){
			API.changeAdminPassword(admin_email, newPassword).then(done=>{
				setLoading(false);
				if(!done) return alert('Hubo un error cambiando la contraseña.');
				alert('Se ha cambiado la contraseña.');
				return props.navigation.goBack();
			}).catch(err=>{
				setLoading(false);
			})
		}else{
			API.changePassword(oldPassword, newPassword).then(done=>{
				setLoading(false);
				if(!done) return alert('Hubo un error cambiando la contraseña.');
				if(done.error){
					if(done.code==923) return alert('La contraseña actual no es correcta.')
					else return alert('Hubo un error cambiando la contraseña.');
				}
				alert('Se ha cambiado la contraseña.');
				if(props.route.params.logout) props.route.params.logout()
			}).catch(err=>{
				setLoading(false);
				console.log(err);
				return alert('Hubo un error cambiando la contraseña.');
			});
		}
	}
	
	return (
		<KeyboardAwareScrollView style={styles.container}>
			{!admin_email ? (
				<Input name="Contraseña actual" value={oldPassword} onChangeText={setOldPassword} style={{ marginBottom: 30 }} password />
			) : null}
			<Input name="Nueva contraseña" value={newPassword} onChangeText={setNewPassword} password />
			<Input name="Repetir nueva contraseña" value={newPassword2} onChangeText={setNewPassword2} password />
			<Button text="Cambiar contraseña" onPress={changePassword} loading={loading} />
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 15,
		paddingHorizontal: 15
	}
})