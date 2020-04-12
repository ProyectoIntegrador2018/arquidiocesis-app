import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator , CheckBox, Switch} from 'react-native';
import { Input, Button } from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';

import { API } from '../lib';
import {Image} from 'react-native' ; 

export default (props)=>{

	var [loading, setLoading] = useState(false);
    var [name, setName] = useState('Grupo 1');
    var [acompañante, setAcompañante]= useState('Pepe Perez');
    const [isSelected, setSelection] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	var doRegister = ()=>{
		if(loading) return;
		setLoading(true);
        if(name.length<1) return alert ('Por favor introduzca un nombre');
        if(acompañante.length<1) return alert ('Por favor introduzca el nombre del acompañante');
        
        
        // FALTA HACER REGISTRO
		
	}

	useEffect(()=>{
		
	}, [props.user])

	return (
		<SafeAreaView style={styles.container}>
			{props.user===false ? (
				<View style={[styles.loginContainer, { alignItems: 'center', justifyContent: 'center' }]}>
					<ActivityIndicator size='large' color='black' />
				</View>
			) : (
				<KeyboardAwareScrollView style={styles.loginContainer} bounces={false}>
					<Text style={styles.header}>Registrar Grupo</Text> 
					<Input name="Nombre" value={name} onChangeText={setName} textContentType={'Nombre'} />
                    <Input name="Acompañante" value={acompañante} onChangeText={setAcompañante}  textContentType={'Acompañante'} />
                    <Text style={styles.testText}>Pertenece a Capilla?</Text>
                    <View style={styles.checkboxContainer}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#32CD32" }}
                        thumbColor={isEnabled ? "#FFFFFF" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    
                
                    </View>
                    
                    <Text style={styles.testText}>Seleccionar Parroquia/Capilla</Text>
                    <RNPickerSelect
                    placeholder={{
                        label: 'Parroquia/Capilla',
                        value: null,
                    }}
                    
                    onValueChange={(value) => console.log(value) }
                     items={[
                            { label: 'Parroquia 1', value: 'p1' },
                            { label: 'Parroquia 2', value: 'p2' },
                            { label: 'Parroquia 3', value: 'p3' },
                        ]}
        />
                    
					<Button text="Registrar" loading={loading} onPress={doRegister} />
					
				</KeyboardAwareScrollView>
			)}
		</SafeAreaView>
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
      },
      checkboxContainer: {
        flexDirection: "column",
        marginBottom: 20,
      },
})