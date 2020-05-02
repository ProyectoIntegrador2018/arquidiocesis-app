import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TextComponent } from 'react-native';
import{Button} from 'react-native-elements';
import { API } from '../lib';

export default (props)=>{
	var goDetalle = (item)=>{
		props.navigation.navigate('DetallePersona');
	}
	return (
		<View>
			<View style={{paddingLeft:'5%' ,paddingTop:'15%', paddingBottom:'30%', flexDirection: 'row', flex: 1}}>
				<View>
					<Text style={styles.fields}>Nombre: </Text>
					<Text style={styles.fields}>Grupo:</Text>
                    <Text style={styles.fields}>Parroquia:</Text>
				</View>

				<View>
					<Text style={styles.fields}>Gerardo</Text>
					<Text style={styles.fields}>Grupo 1</Text>
                    <Text style={styles.fields}>Don Bosco</Text>
				</View>
				
			</View>

			<View style={{flexDirection:'row', paddingTop:'30%', paddingLeft:'5%',  justifyContent:'center'}}>
				<Button  buttonStyle={{backgroundColor: "red" }} title='Baja Total' onPress={() => props.navigation.navigate('FichaMedica')}/>	
			</View>
			<View style={{flexDirection:'row', paddingTop:'5%', paddingLeft:'5%', justifyContent:'center'}}>
				<Button buttonStyle={{backgroundColor: "#ebb734" }}  title='Baja Parcial' onPress={() => props.navigation.navigate('FichaMedica')}/>	
			</View>
            <View style={{flexDirection:'row', paddingTop:'5%', paddingLeft:'5%', justifyContent:'center'}}>
				<Button buttonStyle={{backgroundColor:"#3464EB"}} title='Editar' onPress={() => props.navigation.navigate('EditMiembro')}/>	
			</View>
		</View>
		
    )
  }


const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item: {
    width: '50%' // is 50% of container width
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
    justifyContent:'center',
  },
  boton:{
	paddingTop:'50%',
	backgroundColor: '#42A5F5',
	color:'black',
  }
})