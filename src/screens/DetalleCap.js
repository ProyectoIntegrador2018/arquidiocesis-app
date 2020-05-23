import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { API } from '../lib';
import { FontAwesome5 } from '@expo/vector-icons'
import { Input, Button, Picker, ErrorView } from '../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-datepicker'

export default (props)=>{
	var [capacitacion, setCapacitacion] = useState(false);
	var [edit, setEdit] = useState(false);
    var [sending, setSending] = useState(false);

	props.navigation.setOptions({
		headerTitle: '',
		headerStyle: {
			backgroundColor: '#002E60',
			shadowOpacity: 0
		},
    });
    
    var saveCapacitacion = ()=>{
		setSending(true);
		setTimeout(()=>{
			setSending(false);
		}, 1000)
    }
    var deleteCapacitacion = ()=>{
        Alert.alert('¿Eliminar capacitación?', 'Esto eliminará los registros de este grupo', [
			{ text: 'Cancelar', style: 'cancel' },
			{ text: 'Eliminar', style: 'destructive', onPress: ()=>{
			} }
		])
	}
    
    var editField = (key)=>{
		return (val)=>{
			setCapacitacion(a=>{
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
		headerTitle: 'Detalle Capacitacion',
		headerRight: ()=>(
			<TouchableOpacity onPress={() => setEdit(e=>!e)}>
				<FontAwesome5 name={'edit'} size={24} style={{ paddingRight: 15 }} color={'white'} />
			</TouchableOpacity>
		)
	});
	return <View style={{ flex: 1 }}>
		
		<KeyboardAwareScrollView>
        <View style={{ padding: 10 }}>
					{edit && <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>Editando Capacitacion</Text>}
					<Input name={'nombre de grupo'} value={'1'} onChangeText={editField('coordinador')} placeholder={'Nombre'} readonly={!edit} />
                    <Picker name="Coordinador" items={[
						{ label: 'Jose', value: 'Jose' },
						{ label: 'Juan', value: 'Juan' },
						{ label: 'Pedro', value: 'Pedro' }
					]} disabled={true} />
					<Text style={{ textAlign: 'left', fontSize: 18, fontWeight: '400' }}>Fecha Inicio</Text>
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
                        readonly={true}
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        },
                        
                        }}
                        readonly={true}
                        // onDateChange={(date) => {this.setState({date: date})}}
                    />	
					<Text style={{ textAlign: 'left', fontSize: 18, fontWeight: '400' }}>Fecha Final</Text>
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
                        readonly={true}
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        },
                        
                        }}
                        readonly={true}
                        // onDateChange={(date) => {this.setState({date: date})}}
                    />	
					
                    
					
					{edit && <Button text={'Guardar'} onPress={saveCapacitacion} loading={sending} />}
					{edit && <Button text={'Eliminar'} color={'#FF2233'} onPress={deleteCapacitacion} loading={sending} />}
				</View>
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