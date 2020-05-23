import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Input, Button, Picker } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { API } from '../lib';
import DatePicker from 'react-native-datepicker'

export default (props)=>{
	var [loading, setLoading] = useState(false);
	var [name, setName] = useState('Grupo 1');
	
	var onAdd = props.route.params.onAdd;

	
    var onPress =  ()=>{
        props.navigation.navigate('AltaMiembroCap', {
			onAdd: (p)=>{
				if(!data) return;
				setData([...data, p]);
			}
		});
    }
    var goDetalle =  ()=>{
        props.navigation.navigate('DetalleCap');
    }
    var doRegister  = ()=>{}
	props.navigation.setOptions({
		headerTitle: 'Alta Capacitacion'
	});

	return (
		<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
			<Text style={styles.header}>Registrar Capacitacion</Text> 
			<Input name="Nombre" value={name} onChangeText={setName} />
            <Text style={{ textAlign: 'left', fontSize: 18, fontWeight: '400' }}>Seleccione la fecha</Text>
            <DatePicker
                style={{width: 350}}
                date="2020-05-05"
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2010-05-01"
                maxDate="2030-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                
                }}
                // onDateChange={(date) => {this.setState({date: date})}}
            />		
			<Button text="Registrar" loading={loading} onPress={doRegister} />
            <Button text="test agregar miembros" loading={loading} onPress={onPress} />
            <Button text="test detalle capacitacion" loading={loading} onPress={goDetalle} />
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
	}
})