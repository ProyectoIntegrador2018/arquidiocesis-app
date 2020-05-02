import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default (props)=>{



	return (
		<View>
		
			<View style={{paddingLeft:'2%' ,paddingTop:'5%', flexDirection: 'row', flex: 1}}>
				<View>
					<Text style={styles.fields}>Parroquia:  </Text>
					<Text style={styles.fields}>Capilla: </Text>
					<Text style={styles.fields}>Grupo:</Text>
					<Text style={styles.fields}>Integrante:</Text>
					<Text style={styles.fields}>Tipo de sangre: </Text>
                    <Text style={styles.fields}>Alergias: </Text>
                    <Text style={styles.fields}>Servicio Médico: </Text>
                    <Text style={styles.fields}>Ambulancia: </Text>
                    <Text style={styles.fields}>Padecimientos: </Text>
				</View>

				<View>
					<Text style={styles.fields}>Don Bosco</Text>
					<Text style={styles.fields}>ND</Text>
					<Text style={styles.fields}>1</Text>
					<Text style={styles.fields}>Gerardo</Text>
					<Text style={styles.fields}>O+</Text>
                    <Text style={styles.fields}>NO</Text>
                    <Text style={styles.fields}>IMSS</Text>
                    <Text style={styles.fields}>SI</Text>
                    <Text style={styles.fields}>migraña</Text>
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
    width: '10%' // is 50% of container width
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