import React, { useState, useRef } from 'react';
import { Text, ScrollView, Alert, StyleSheet, Platform, Linking } from 'react-native';
import { Item } from '../components';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import { API } from '../lib';
import moment from 'moment';

export default (props)=>{

	var [downloading, setDownloading] = useState(false);

	props.navigation.setOptions({
		headerTitle: 'Reportes'
	});

	var getFile = (url, name, setLoading)=>{
		return Platform.select({
			ios: emailFile,
			android: emailFile,
			web: ()=>{
				Linking.openURL(url);
			}
		})(url, name, setLoading)
	}

	var emailFile = (url, name, setLoading)=>{
		setLoading(true);
		FileSystem.downloadAsync(url, FileSystem.documentDirectory+name).then(d=>{
			setDownloading(false);
			setLoading(false);
			if(d.stats==404) return Alert.alert('Hubo un error cargando el reporte.');
			MailComposer.composeAsync({
				attachments: [d.uri],
			})
		}).catch(err=>{
			setDownloading(false);
			setLoading(false);
			return Alert.alert('Hubo un error cargando el reporte.');
		})
	}

	var reportGroup = (setLoading)=>{
		if(downloading) return;
		props.navigation.navigate('SelectGroup', {
			onSelect: function(g){
				API.formatURL('grupos/'+g.id+'/asistencia/reporte/'+moment().unix()+'.csv').then(url=>{
					getFile(url, 'Miembros-'+g.nombre.replace(/ /g, '_')+'.csv', setLoading);
				})
			}
		})
	}

	var reportGroupAssistance = (setLoading)=>{
		if(downloading) return;
		props.navigation.navigate('SelectGroup', {
			onSelect: g=>{
				API.formatURL('grupos/'+g.id+'/asistencia/reportefechas/'+moment().unix()+'.csv').then(url=>{
					getFile(url, 'GrupoAsistencias-'+g.nombre.replace(/ /g, '_')+'.csv', setLoading);
				})
			}
		})
	}

	var reportCapacitacion = (setLoading)=>{
		if(downloading) return;
		props.navigation.navigate('SelectCapacitacion', {
			onSelect: g=>{
				API.formatURL('capacitacion/'+g.id+'/asistencia/reporte/'+moment().unix()+'.csv').then(url=>{
					getFile(url, 'Participantes-'+g.nombre.replace(/ /g, '_')+'.csv', setLoading);
				})
			}
		})
	}

	var reportCapacitacionAssistance = (setLoading)=>{
		if(downloading) return;
		props.navigation.navigate('SelectCapacitacion', {
			onSelect: g=>{
				API.formatURL('capacitacion/'+g.id+'/asistencia/reportefechas/'+moment().unix()+'.csv').then(url=>{
					getFile(url, 'CapacitacionAsistencias-'+g.nombre.replace(/ /g, '_')+'.csv', setLoading);
				})
			}
		})
	}

	return <ScrollView>
		<Text style={[styles.sectionText, { marginTop: 10 }]}>GRUPOS</Text>
		<Item text="Miembros de grupo" onPress={reportGroup} />
		<Item text="Asistencia de grupo por fecha" onPress={reportGroupAssistance} />

		<Text style={styles.sectionText}>CAPACITACIONES</Text>
		<Item text="Participantes de capacitación" onPress={reportCapacitacion} />
		<Item text="Asistencia de capacitación" onPress={reportCapacitacionAssistance} />
	</ScrollView>;
}

const styles = StyleSheet.create({
	sectionText: {
		fontSize: 14,
		color: 'gray',
		marginBottom: 10,
		paddingLeft: 15,
		marginTop: 20,
	}
});
