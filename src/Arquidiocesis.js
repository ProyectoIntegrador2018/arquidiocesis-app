/* 
Nombre: Arquidiócesis.js
Usuario con acceso: Admin, acompañante, coordinador
Descripción: Archivo que gestiona el tab navigation bar y el stack de pantallas de la aplicación
*/
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'

import { 
	Login, 
	Parroquias, 
	Parroquia,
	Decanato, 
	Coordinadores, 
	Grupos, 
	Capacitaciones, 
	AsistenciaGrupo, 
	ZonasList, 
	Zona, 
	RegistroAdmin, 
	RegistroCoordinador, 
	RegistroParroquia, 
	RegistroMiembro, 
	RegistroGrupo,
	Grupo,
	RegistroCapilla,
	EditMiembro,
	FichaMedica,
	DetalleCapilla,
	DetalleMiembro,
	User,
	ChangePassword,
	AdminUsers,
	DetalleAdmin,
	EditAdmin,
	ChangeCoordinador,
	EditGrupo,
	RegistroCapacitacion,
	EstatusMiembro,
	GrupoBajasTemporales,
	RegistroParticipante,
	DetalleCapacitacion,
	EditParroquia,
	RegistroAcompanante,
	DetalleAcompanante,
	EditAcompanante,
	DetalleCoordinador,
	EditCoordinador,
	EditarCapacitacion,
	DetalleParticipante,
	EditarParticipante,
	ChangeEncargado,
	AsistenciaCapacitacion,
	EditarCapilla,
	Reports,
	SelectGroup,
	SelectCapacitacion,
	Select,
	Acompanantes,
	Statistics,
	Calendar,
	RegistroEvento,
	Evento,
	EditEvento,
	Objetivos
} from './screens';
import { API } from './lib'

var Tab = createBottomTabNavigator();
var Home = (props)=>{
	var [user, setUser] = useState(false);
	var { navigation } = props;

	var gotoUser = ()=>{
		props.navigation.navigate('User', {
			logout: props.route.params.logout
		})
	}

	navigation.setOptions({
		headerLeft: () => (
		  <TouchableOpacity onPress={gotoUser}>
			  <View style={{ width: 50, height: 40, alignItems: 'center', justifyContent: 'center' }}>
					<FontAwesome5 name="user-circle" solid size={25} color={'white'} />
			  </View>
		  </TouchableOpacity>
		),
		headerTitle: 'Arquidiocesis'
	});

	useEffect(()=>{
		API.getUser().then(setUser);
  }, []);
  
  var showTabs = (user_type) => {
    switch(user_type){
      case 'admin': 
      return ( <>
          <Tab.Screen name="Parroquias" component={Parroquias} />
					<Tab.Screen name="Acompañantes" component={Acompanantes} />
					<Tab.Screen name="Coordina" component={Coordinadores} />
          <Tab.Screen name="HeMa" component={Grupos} />
          <Tab.Screen name="Calendario" component={Calendar} />
			    <Tab.Screen name="Capacitación" component={Capacitaciones} />
      </> )

      case 'integrante_chm':
        return ( <>
          <Tab.Screen name="Parroquias" component={Parroquias} />
					<Tab.Screen name="Acompañantes" component={Acompanantes} />
					<Tab.Screen name="Coordina" component={Coordinadores} />
          <Tab.Screen name="HeMa" component={Grupos} />
          <Tab.Screen name="Calendario" component={Calendar} />
			    <Tab.Screen name="Capacitación" component={Capacitaciones} />
        </> );

      case 'coordinador': 
        return ( <> 
          <Tab.Screen name="HeMa" component={Grupos} />
          <Tab.Screen name="Calendario" component={Calendar} />
        </> );

      case 'acompañante_zona':
      case 'acompañante_decanato':
        return ( <>
          <Tab.Screen name="Coordina" component={Coordinadores} />
          <Tab.Screen name="Calendario" component={Calendar} />
          <Tab.Screen name="Capacitación" component={Capacitaciones} />
        </> );

      case 'capacitacion':
        return ( <>
        <Tab.Screen name="Calendario" component={Calendar} />
        <Tab.Screen name="Capacitación" component={Capacitaciones} />
        </> );

      default:
        // Error 
        return <Tab.Screen name="Error" component={User} />;
        
    }
  }

	return (
		<Tab.Navigator initialRouteName='Parroquias' screenOptions={({route})=>({
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;
				switch(route.name){
					case 'Parroquias': iconName = 'church';
					break;
					case 'Acompañantes': iconName = 'globe-americas'
					break;
					case 'Coordina': iconName = 'user-circle'
					break;
					case 'HeMa': iconName = 'users'; 
					break;
					case 'Calendario': iconName = 'calendar'; 
					break;
					case 'Capacitación': iconName = 'chalkboard-teacher';
					break;
					default: iconName = 'exclamation-circle'
				}
            return <FontAwesome5 name={iconName} size={size} color={color} style={{ paddingTop: 5 }} solid />;
			},
		})}
		tabBarOptions={{
			activeTintColor: '#002E60',
			inactiveTintColor: 'gray',
			labelPosition: 'below-icon'
		}}
		>
      {showTabs(user.type)}
		</Tab.Navigator>
	)
}

// The app's main stack.
var Stack = createStackNavigator();
var App = (props)=>{
	return (
		<NavigationContainer>
			<Stack.Navigator user={props.user} initialRouteName='Home' screenOptions={{
				headerStyle: { backgroundColor: '#002E60' },
				headerTintColor: 'white',
				gestureEnabled: Platform.select({ web: false, android: true, ios: true })
			}}>
				<Stack.Screen name="Home" component={Home} initialParams={{ logout: props.logout }} />
				<Stack.Screen name="RegistroAdmin" component={RegistroAdmin}/>
				<Stack.Screen name="RegistroCoordinador" component={RegistroCoordinador}/>
				<Stack.Screen name="AsistenciaGrupo" component={AsistenciaGrupo} />
				<Stack.Screen name="Decanato" component={Decanato} />
				<Stack.Screen name="Zona" component={Zona} />
				<Stack.Screen name="RegistroParroquia" component={RegistroParroquia} />
				<Stack.Screen name="RegistroMiembro" component={RegistroMiembro}/>
				<Stack.Screen name="RegistroCapilla" component={RegistroCapilla}/>
				<Stack.Screen name="RegistroGrupo" component={RegistroGrupo}/>
				<Stack.Screen name="Parroquia" component={Parroquia} />
				<Stack.Screen name="EditMiembro" component={EditMiembro} />
				<Stack.Screen name="Grupo" component={Grupo}/>
				<Stack.Screen name="FichaMedica" component={FichaMedica}/>
				<Stack.Screen name="DetalleCapilla" component={DetalleCapilla}/>
				<Stack.Screen name="DetalleMiembro" component={DetalleMiembro}/>
				<Stack.Screen name="User" component={User}/>
				<Stack.Screen name="ChangePassword" component={ChangePassword}/>
				<Stack.Screen name="AdminUsers" component={AdminUsers}/>
				<Stack.Screen name="DetalleAdmin" component={DetalleAdmin}/>
				<Stack.Screen name="EditAdmin" component={EditAdmin}/>
				<Stack.Screen name="EditGrupo" component={EditGrupo}/>
				<Stack.Screen name="ChangeCoordinador" component={ChangeCoordinador}/>
				<Stack.Screen name="DetalleCoordinador" component={DetalleCoordinador}/>
				<Stack.Screen name="RegistroCapacitacion"  component={RegistroCapacitacion}/>
				<Stack.Screen name="EstatusMiembro" component={EstatusMiembro}/>
				<Stack.Screen name="GrupoBajasTemporales" component={GrupoBajasTemporales}/>
				<Stack.Screen name="RegistroParticipante" component={RegistroParticipante}/>
				<Stack.Screen name="DetalleCapacitacion" component={DetalleCapacitacion}/>
				<Stack.Screen name="EditParroquia" component={EditParroquia}/>
				<Stack.Screen name="RegistroAcompanante" component={RegistroAcompanante}/>
				<Stack.Screen name="DetalleAcompanante" component={DetalleAcompanante}/>
				<Stack.Screen name="EditAcompanante" component={EditAcompanante}/>
				<Stack.Screen name="EditCoordinador" component={EditCoordinador}/>
				<Stack.Screen name="EditarCapacitacion" component={EditarCapacitacion}/>
				<Stack.Screen name="DetalleParticipante" component={DetalleParticipante}/>
				<Stack.Screen name="EditarParticipante" component={EditarParticipante}/>
				<Stack.Screen name="ChangeEncargado" component={ChangeEncargado}/>
				<Stack.Screen name="AsistenciaCapacitacion" component={AsistenciaCapacitacion}/>
				<Stack.Screen name="EditarCapilla" component={EditarCapilla}/>
				<Stack.Screen name="Reports" component={Reports}/>
				<Stack.Screen name="SelectGroup" component={SelectGroup}/>
				<Stack.Screen name="SelectCapacitacion" component={SelectCapacitacion}/>
				<Stack.Screen name="Select" component={Select}/>
				<Stack.Screen name="Statistics" component={Statistics}/>
				<Stack.Screen name="RegistroEvento" component={RegistroEvento}/>
				<Stack.Screen name="Evento" component={Evento}/>
				<Stack.Screen name="EditEvento" component={EditEvento}/>
				<Stack.Screen name="Objetivos" component={Objetivos}/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}


export default (props)=>{

	var [login, setLogin] = useState(false);

	// This function runs when the screen is shown.
	useEffect(()=>{
		// Set the logout function that will be run when
		// the user logs out.
		API.setOnLogout(()=>{
			setLogin(null);
		})
		checkLogin()
	}, [])
	
	// Check to see if the user is logged in.
	var checkLogin = ()=>{
		API.getLogin().then(user=>{
			if(!user) return setLogin(null);
			setLogin(user)
		})
	}

	var onLogin = (user)=>{
		setLogin(user);
	}

	var logout = ()=>{
		API.logout().then(done=>{
			setLogin(null);
		})
	}

	return (
		<View style={StyleSheet.absoluteFillObject}>
			<StatusBar barStyle={'light-content'} />
			{!login ? (
				<Login user={login} onLogin={onLogin} />
			) : ( // User is logged in
				<App user={login} logout={logout} />
			)}
		</View>
	)
}