import axios from 'axios';
import { AsyncStorage } from 'react-native';

const ROOT_URL = 'http://localhost:8000/api/'

async function post(endpoint, data){
	var u = await getUser();
	if(u){
		if(!data) data = { token: u.token }
		else data.token = u.token;
	}
	try{
		var res = await axios.post(ROOT_URL+endpoint, data);
		return res.data;
	}catch(err){
		return {
			error: true,
			message: 'No hubo conexión con el servidor.'
		}
	}
}

async function get(endpoint, data){
	var u = await getUser();
	if(u){
		if(!data) data = { token: u.token };
		else data.token = u.token;
	}
	try{
		var res = await axios.get(ROOT_URL+endpoint, {
			params: data
		});
		return res.data;
	}catch(e){
		return {
			error: true,
			message: 'No hubo conexión con el servidor.'
		}
	}
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
	try{
		var u = await post('login', { email, password });
		if(!u) return false;
		if(u.error) return true;

		var user = u.data;
		await AsyncStorage.setItem('login', JSON.stringify(user));
	}catch(err){
		throw err;
	}
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
 *	@param {Boolean} force Should skip cached data. 
 */
async function getZonas(force=false){
	// DUMMY DATA
	var d = [
		{ id: 1, name: 'Zona1' },
		{ id: 2, name: 'Zona2' },
		{ id: 3, name: 'Zona3' },
		{ id: 4, name: 'Zona4' }
	]
	return d;
}

/**
 * Get the zone information.
 * @param {Number} id The zone id
 * @param {Boolean} force Should skip cached data
 */
async function getZona(id, force=false){
	// DUMMY DATA
	await timeout(500);
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

/**
 * Get the decanato data. 
 * @param {Number} id The decanato ID
 * @param {Boolean} force Should skip cached data
 */
async function getDecanato(id, force=false){
	// DUMMY DATA
	await timeout(500);
	var d = {
		id: id,
		name: 'Decanato Test',
		acompanantes: [
			{ id: 1, name: 'Raul' },
			{ id: 2, name: 'Jose' }
		]
	}
	return d;
}

async function getParroquias(force=false){
	var p = await get('parroquias');
	if(p.error) throw p;
	else return p.data;
}

async function getParroquia(id, force=false){
	var p = await get('parroquias/'+id);
	if(p.error) throw p;
	else return p.data;
}

async function addParroquia(name, address, decanato_id){
	var payload = {
		name,
		address,
		decanato: decanato_id
	};
	var res = await post('parroquias', payload);
	if(res.error) throw res;
	else return res.data;
}

async function addCapilla(name, address, parroquia_id){
	var payload = {
		name,
		address,
		parroquia: parroquia_id
	};
	var res = await post('capillas', payload);
	if(res.error) throw res;
	else return res.data;
}

async function getDecanatos(force=false){
	var p = await get('decanatos');
	if(p.error) throw p;
	else return p.data;
}

async function getCoordinadores(force=false){
	var p = await get('coordinadores');
	if(p.error) throw p;
	else return p.data;
}

async function getGrupos(force=false){
	var res = await get('grupos');
	if(res.error) throw res;
	else return res.data;
}

async function getGrupo(id, force=false){
	var res = await get('grupos/'+id);
	if(res.error) throw res;
	else return res.data;
}

async function addGrupo(name, coordinador, parroquia, capilla){
	var payload = {
		name,
		coordinador,
		parroquia,
		capilla
	}

	var res = await post('grupos', payload);
	if(res.error) throw res;
	else return res.data;
}

async function registerCoordinador(name, age, gender, email, password){
	var payload = {
		name,
		age,
		gender,
		email,
		password
	}

	var res = await post('coordinadores', payload);
	if(res.error) throw res;
	else return res.data;
}

async function registerMember(grupo, name, age, gender, email){
	var payload = {
		name,
		grupo,
		age, 
		gender,
		email
	}

	var res = await post('grupos/register', payload);
	if(res.error) throw res;
	else return res.data;
}

export default {
	getLogin,
	getUser,
	login,
	logout,
	addCapilla,
	addGrupo,
	getZona,
	getZonas,
	getDecanato,
	getParroquias,
	getParroquia,
	addParroquia,
	getDecanato,
	getDecanatos,
	getCoordinadores,
	getGrupos,
	getGrupo,
	registerCoordinador,
	registerMember
}