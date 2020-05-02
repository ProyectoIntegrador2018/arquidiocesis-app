import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet,Button, TextInput, TextComponent } from 'react-native';
import { API } from '../lib';

export default (props)=>{
    props.navigation.setOptions({
		headerTitle: 'Capilla',
    });
    
	return (
		<View>
			<View style={{paddingLeft:'5%' ,paddingTop:'50%', paddingBottom:'60%',flexDirection: 'row', flex: 1, justifyContent:'center'}}>
				<View>
					<Text style={styles.fields}>Nombre: </Text>
					<Text style={styles.fields}>Parroquia:</Text>
					<Text style={styles.fields}>Dirección:</Text>
				</View>

				<View>
					<Text style={styles.fields}>Capilla 1</Text>
					<Text style={styles.fields}>Don Bosco</Text>
					<Text style={styles.fields}>calle 1 col. 2</Text>
				</View>
				
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