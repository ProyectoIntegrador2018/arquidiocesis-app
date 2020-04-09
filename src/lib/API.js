import axios from 'axios';
import { AsyncStorage } from 'react-native';

const ROOT_URL = 'http://localhost:8000/'

async function post(endpoint, data){
	var u = await getUser();
	if(u){
		data.token = u.token;
	}
	return axios.post(ROOT_URL+endpoint, data);
}

async function get(endpoint, data){
	var u = await getUser();
	if(u){
		data.token = u.token;
	}

	return axios.get(ROOT_URL+endpoint, data)
}

// Debug, delete later.
var timeout = (ms) => new Promise(r=>setTimeout(r, ms));

/**
 * Get the user that is logged in.
 * Should only be used when you are certain
 * the user is already logged in.
 */
async function getUser(){
	var user = await AsyncStorage.getItem('login');
	if(!user) return false;
	
	user = JSON.parse(user);
	if(!user) return false;

	return user;
}

/**
 * Returns the user object if the user
 * is logged in. If not returns false.
 * 
 * - Checks if login is stored in storage.
 * - Checks with API if login is valid.
 * - Returns user object if valid.
 */
async function getLogin(){
	var user = await AsyncStorage.getItem('login');
	if(!user) return null;
	
	user = JSON.parse(user);
	if(!user) return null;

	//TODO: Check with API if the saved user is valid.

	return user;
}

/**
 * Login the user with the given credentials.
 * Returns the user if valid
 * Returns false if not valid.
 * @param {String} email The user's email
 * @param {String} password The user's password
 */
async function login(email, password){
	await timeout(500);

	var user = {
		nombre: 'Prueba',
		correo: email,
		token: 'om12md1iomdiomo1i2mdo39581895n1591n359153n9135831n3',
		access: 3
	}

	await AsyncStorage.setItem('login', JSON.stringify(user));

	return user;
}

/**
 * Logout a user
 * - Removes the user info from storage.
 * - If no user is logged in, does nothing, returns true.
 * @returns {Boolean}
 */
async function logout(){
	var user = await getUser();

	// If user is not logged in, return true.
	if(!user) return true;

	// Delete user info from storage.
	await AsyncStorage.removeItem('login')
	return true;
}

/**
 * Get the list of zonas.
 */
async function getZonas(){
	// DUMMY DATA
	var d = [
		{ id: 1, name: 'Zona1' },
		{ id: 2, name: 'Zona2' },
		{ id: 3, name: 'Zona3' },
		{ id: 4, name: 'Zona4' }
	]
	return d;
}

async function getZona(id){
	// DUMMY DATA
	var d = {
		id: id,
		name: 'Zona Prueba',
		decanatos: [
			{ id: 1, name: 'Decanato del Rosario' },
			{ id: 2, name: 'Decanato de Fátima' }
		]
	}
	return d;
}

async function getDecanato(id){
	// DUMMY DATA
	var d = {
		id: id,
		name: 'Decanato Test',
		acompanantes: [
			{ name: 'Raul' },
			{ name: 'Jose' }
		]
	}
	return d;
}

export default {
	getLogin,
	getUser,
	login,
	logout,
	getZona,
	getZonas,
	getDecanato
}