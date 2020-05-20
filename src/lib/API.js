import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Cache from './Cache';

const ROOT_URL = 'http://localhost:8000/api/'

async function post(endpoint, data){
	var u = await getUser();
	if(u){
		if(!data) data = { token: u.token }
		else data.token = u.token;
	}
	try{
		console.log("POST /"+endpoint);
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
		console.log("GET /"+endpoint);
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

async function sendDelete(endpoint, data){
	var u = await getUser();
	if(u){
		if(!data) data = { token: u.token };
		else data.token = u.token;
	}
	try{
		console.log("DELETE /"+endpoint);
		var res = await axios.delete(ROOT_URL+endpoint, {
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
	if(!force && Cache.getZonas()){
		console.log("RETURNED ZONAS CACHE");
		return Cache.getZonas()
	}

	var p = await get('zonas');
	if(p.error) throw p;
	else{
		Cache.setZonas(p.data);
		return p.data;
	}
}

/**
 * Get the zone information.
 * @param {Number} id The zone id
 * @param {Boolean} force Should skip cached data
 */
async function getZona(id, force=false){
	if(!force){
		var zonaCache = Cache.getZona(id);
		if(zonaCache) {
			console.log("RETURNED ZONA (1) CACHE");
			return zonaCache;
		}
	}

	var p = await get('zonas/'+id);
	if(p.error) throw p;
	else {
		Cache.setZona(p.data);
		return p.data;
	}
}

/**
 * Get the decanato data. 
 * @param {Number} id The decanato ID
 * @param {Boolean} force Should skip cached data
 */
async function getDecanato(id, force=false){
	if(!force){
		var decanatoCache = Cache.getDecanato(id);
		if(decanatoCache){
			console.log("RETURNED DECANATO (1) CACHE");
			return decanatoCache;
		}
	}

	var p = await get('decanatos/'+id);
	if(p.error) throw p;
	else {
		Cache.setDecanato(p.data);
		return p.data;
	}

	return d;
}

async function getParroquias(force=false){
	if(!force && Cache.getParroquias()){
		console.log("RETURNED PARROQUIAS CACHE");
		return Cache.getParroquias();
	}

	var p = await get('parroquias');
	if(p.error) throw p;
	else{
		Cache.setParroquias(p.data);
		return p.data;
	}
}

async function getParroquia(id, force=false){
	if(!force){
		var parroquiaCache = Cache.getParroquia(id);
		if(parroquiaCache){
			console.log("RETURNED PARROQUIA (1) CACHE");
			return parroquiaCache;
		}
	}

	var p = await get('parroquias/'+id);
	if(p.error) throw p;
	else {
		Cache.setParroquia(p.data);
		return p.data;
	}
}

async function addParroquia(name, address, decanato_id){
	var payload = {
		name,
		address,
		decanato: decanato_id
	}
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
	else {
		Cache.parroquiaAddCapilla(parroquia_id, res.data);
		Cache.addCapilla(res.data);
		return res.data;
	}
}

async function getDecanatos(force=false){
	if(!force && Cache.getDecanatos()){
		console.log("RETURNED DECANATOS CACHE");
		return Cache.getDecanatos();
	}
	var p = await get('decanatos');
	if(p.error) throw p;
	else {
		Cache.setDecanatos(p.data);
		return p.data;
	}
}

async function getCoordinadores(force=false){
	if(!force && Cache.getCoordinadores()){
		console.log("RETURNED COORDINADORES CACHE");
		return Cache.getCoordinadores();
	}
	var p = await get('coordinadores');
	if(p.error) throw p;
	else {
		Cache.setCoordinadores(p.data);
		return p.data;
	}
}

async function getGrupos(force=false){
	if(!force && Cache.getGrupos()){
		console.log("RETURNED GRUPOS CACHE");
		return Cache.getGrupos();
	}
	var res = await get('grupos');
	if(res.error) throw res;
	else {
		Cache.setGrupos(res.data);
		return res.data;
	}
}

async function getGrupo(id, force=false){
	if(!force){
		var cacheGrupo = Cache.getGrupo(id);
		if(cacheGrupo){
			console.log("RETURNED GRUPO (1) CACHE");
			return cacheGrupo;
		}
	}
	var res = await get('grupos/'+id);
	if(res.error) throw res;
	else {
		Cache.setGrupo(res.data);
		return res.data;
	}
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

async function registerMember(grupo, data){
	var payload = {
		grupo,
		...data,
	}
	throw new Error('HELOO')

	var res = await post('grupos/register', payload);
	if(res.error) throw res;
	else return res.data;
}

async function getAsistencia(grupo_id, fecha){
	var res = await get('grupos/'+grupo_id+'/asistencia/'+fecha);
	if(res.error) throw res;
	else return res.data;
}

async function registerAsistencia(grupo_id, fecha, miembros, force=false){
	var payload = {
		fecha, miembros, force
	}
	var res = await post('grupos/'+grupo_id+'/asistencia', payload);
	if(res.error) throw res;
	else {
		Cache.registerAsistencia(grupo_id, res.data);
		return res.data
	}
}

async function saveAsistencia(grupo_id, fecha, miembros){
	var res = await post('grupos/'+grupo_id+'/asistencia/'+fecha, { miembros });
	if(res.error) throw res;
	else return res.data
}

async function getCapilla(capilla_id){
	var res = await get('capillas/'+capilla_id);
	if(res.error) throw res;
	else return res.data;
}

async function editCapilla(capilla_id, data, parroquia_id){
	var payload = {
		...data,
		parroquia_id
	}
	// Edit cache
}

async function deleteCapilla(parroquia_id, capilla_id){
	var res = await sendDelete('capillas/'+capilla_id);
	if(res.error) throw res;
	else{
		Cache.deleteParroquiaCapilla(parroquia_id, capilla_id)
		return res.data
	}
}

async function deleteParroquia(parroquia_id){
	var res = await sendDelete('parroquias/'+parroquia_id);
	if(res.error) throw res;
	else{
		Cache.deleteParroquia(parroquia_id);
		return res.data
	}
}

async function getMiembro(miembro_id){
	var res = await get('grupos/miembro/'+miembro_id);
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
	registerMember,
	registerAsistencia,
	getAsistencia,
	saveAsistencia,
	getCapilla,
	deleteCapilla,
	deleteParroquia,
	getMiembro
}