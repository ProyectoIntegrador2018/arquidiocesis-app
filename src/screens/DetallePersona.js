import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet,Button, TextInput, TextComponent } from 'react-native';
import { API } from '../lib';

export default (props)=>{
	var goDetalle = (item)=>{
		props.navigation.navigate('DetallePersona');
	}
	return (
		<View>
		
			<View style={{paddingLeft:'5%' ,paddingTop:'5%', flexDirection: 'row', flex: 1}}>
				<View>
					<Text style={styles.fields}>Nombre: </Text>
					<Text style={styles.fields}>Edad:</Text>
					<Text style={styles.fields}>Sexo:</Text>
					<Text style={styles.fields}>email:</Text>
					<Text style={styles.fields}>grupo:</Text>
				</View>

				<View>
					<Text style={styles.fields}>Gerardo</Text>
					<Text style={styles.fields}>80</Text>
					<Text style={styles.fields}>Masculino</Text>
					<Text style={styles.fields}>Pepe@gmail.com</Text>
					<Text style={styles.fields}>Grupo 1</Text>
				</View>
				
			</View>

			<View style={{flexDirection:'row', paddingTop:'75%', paddingLeft:'5%'}}>
				<Button style={{paddingTop:'50%'}} title='Ficha Medica' onPress={() => props.navigation.navigate('FichaMedica')}/>
					
				
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
  },
  boton:{
	paddingTop:'50%',
	backgroundColor: '#42A5F5',
	color:'black',
  }
})