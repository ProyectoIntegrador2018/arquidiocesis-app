import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Cache from './Cache';
import moment from 'moment';

const ROOT_URL = 'http://192.168.0.131:8000/api/'

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
		if(u.error) return false;

		var user = u.data;
		await AsyncStorage.setItem('login', JSON.stringify(user));
	}catch(err){
		throw err;
	}
	return user;
}

async function changePassword(old_password, new_password){
	var u = await post('password/change', { old_password, new_password });
	if(!u) return false;
	if(!u.error) await AsyncStorage.removeItem('login')
	return u;
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

	// Clear cache
	Cache.clearCache();

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
			return decanatoCache;
		}
	}

	var p = await get('decanatos/'+id);
	if(p.error) throw p;
	else {
		Cache.setDecanato(p.data);
		return p.data;
	}
}

async function getParroquias(force=false){
	if(!force && Cache.getParroquias()){
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

async function addParroquia(data){
	var payload = {
		nombre: data.nombre,
		direccion: data.direccion,
		colonia: data.colonia,
		municipio: data.municipio,
		telefono1: data.telefono1,
		telefono2: data.telefono2,
		decanato: data.decanato
	}
	var res = await post('parroquias', payload);
	if(res.error) throw res;
	else return res.data;
}

async function editParroquia(id, data){	
	var res = await post('parroquias/edit', {
		parroquia: id,
		...data
	});
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

async function registerCoordinador(data){
	var res = await post('coordinadores', data);
	if(res.error) throw res;
	else return res.data;
}

async function registerMember(grupo, data){
	var payload = {
		grupo,
		...data,
	}

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

async function getMiembro(miembro_id, force=false){
	if(!force){
		var m = Cache.getMiembro(miembro_id);
		if(m){
			return m;
		}
	}

	
	var res = await get('grupos/miembro/'+miembro_id);
	if(res.error) throw res;
	else{
		if(res.data){
			res.data.id = miembro_id;
			Cache.addMiembro(res.data);
		}
		return res.data;
	}
}

async function adminGetUsers(){
	var res = await get('admin/users');
	if(res.error) throw res;
	else return res.data;
}

async function getAdmin(email){
	var res = await post('admin/users/get', { email });
	if(res.error) throw res;
	else return res.data;
}

async function registerAdmin(data){
	var res = await post('admin/users/add', data);
	if(res.error) throw res;
	else return res.data;
}

async function changeAdminPassword(email, password){
	var res = await post('admin/users/password', { email, password });
	if(res.error) throw res;
	else return res.data;
}

async function deleteAdmin(email){
	var res = await post('admin/users/delete', { email });
	if(res.error) throw res;
	else return res.data;
}

async function editAdmin(old_email, data){
	var res = await post('admin/users/edit', {
		id: old_email,
		...data
	});
	if(res.error) throw res;
	else return res.data;
}

async function editGrupo(id, data){
	var res = await post('grupos/edit', {
		id,
		...data
	});
	if(res.error) throw res;
	else{
		Cache.setGrupoDirty(id);
		return res.data;
	};
}

async function editMiembro(id, data){
	var res = await post('grupos/miembro/'+id+'/edit', data);
	
	if(res.error) throw res;
	else{
		Cache.setMiembroDirty(id);
		return res.data;
	}
}

async function deleteGrupo(id){
	var res = await sendDelete('grupos/'+id);
	if(res.error) throw res;
	else return res.data;
}

async function changeCoordinador(grupo_id, coordinador_id){
	var res = await post('grupos/'+grupo_id+'/coordinador', {
		coordinador: coordinador_id
	});
	if(res.error) throw res;
	else return res.data;
}

async function editMiembroStatus(id, status){
	var res = await post('grupos/miembro/'+id+'/edit/status', { status });
	if(res.error) throw res;
	else{
		Cache.setMiembroStatus(id, status);
		return res.data
	}
}

async function getGrupoBajasTemporales(id){
	var res = await get('grupos/'+id+'/bajas');
	if(res.error) throw res;
	else return res.data;
}

async function getFichaMedica(id, force=false){
	if(!force){
		var f = Cache.getMiembroFicha(id);
		if(f!==false) return f;
	}

	var res = await get('grupos/miembro/'+id+'/ficha');
	if(res.error) throw res;
	else{
		Cache.setMiembroFicha(id, res.data);
		return res.data;
	}
}

async function setFichaMedica(id, data){
	var res = await post('grupos/miembro/'+id+'/edit/ficha', {
		id,
		...data
	});
	if(res.error) throw res;
	else{
		Cache.setMiembroFicha(id, data);
		return res.data;
	}
}

async function registerAcompananteZona(zona, data){
	var res = await post('acompanante/zona', {
		zona,
		...data
	});
	if(res.error) throw res;
	else{
		if(res.data){
			Cache.setZonaAcompanante(zona, res.data);
		}
		return res.data;
	}
}

async function registerAcompananteDecanato(decanato, data){
	var res = await post('acompanante/decanato', {
		decanato,
		...data
	});
	if(res.error) throw res;
	else{
		if(res.data){
			Cache.setDecanatoAcompanante(decanato, res.data);
		}
		return res.data;
	}
}



async function getAcompanante(id){
	var res = await get('acompanante/'+id);
	if(res.error) throw res;
	else return res.data;
}

async function deleteAcompananteZona(zona){
	var res = await sendDelete('zonas/'+zona+'/acompanante');
	if(res.error) throw res;
	else{
		Cache.setZonaAcompanante(zona, null);
		return res.data;
	}
}

async function deleteAcompananteDecanato(decanato){
	var res = await sendDelete('decanatos/'+decanato+'/acompanante');
	if(res.error) throw res;
	else{
		Cache.setDecanatoAcompanante(decanato, null);
		return res.data;
	}
}

async function editAcompanante(id, data){
	var res = await post('acompanante/edit', {
		id,
		...data
	});
	if(res.error) throw res;
	else return res.data;
}

async function deleteCoordinador(id){
	var res = await sendDelete('coordinadores/'+id);
	if(res.error) throw res;
	else return res.data;
}

async function editCoordinador(id, data){
	var res = await post('coordinadores/'+id+'/edit', data);
	if(res.error) throw res;
	else return res.data;
}

async function addCapacitacion(data){
	var res = await post('capacitacion', data);
	if(res.error) throw res;
	else return res.data;
}

async function getCapacitaciones(force=false){
	if(!force && Cache.getCapacitaciones()){
		return Cache.getCapacitaciones();
	}
	var res = await get('capacitacion');
	if(res.error) throw res;
	else {
		Cache.setCapacitaciones(res.data);
		return res.data;
	}
}

async function getCapacitacion(id, force=false){
	if(!force){
		var cacheCap = Cache.getCapacitacion(id);
		if(cacheCap) return cacheCap;
	}
	var res = await get('capacitacion/'+id);
	if(res.error) throw res;
	else {
		Cache.setCapacitacion(res.data);
		return res.data;
	}
}

async function editCapacitacion(id, data){
	var res = await post('capacitacion/edit', {
		id,
		...data
	});
	if(res.error) throw res;
	else{
		data.inicio = {
			_seconds: moment(data.inicio, 'YYYY-MM-DD').unix()
		}
		data.fin = {
			_seconds: moment(data.fin, 'YYYY-MM-DD').unix()
		}
		Cache.editCapacitacion({ id, ...data });
		return res.data;
	}
}

async function removeCapacitacion(id){
	var res = await sendDelete('capacitacion/'+id);
	if(res.error) throw res;
	else{
		Cache.removeCapacitacion(id);
		return res.data;
	}
}

async function changeCoordinadorCapacitacion(id, coordinador){

}

async function registerCapacitacionAsistencia(grupo_id, fecha, miembros, force=false){

}

async function saveCapacitacionAsistencia(id, fecha, miembros){

}

async function getCapacitacionAsistencia(id, fecha){

}

async function editParticipante(capacitacion, id, data){
	var res = await post('participante/edit', {
		id, 
		...data
	});
	if(res.error) throw res;
	else{
		data.fecha_nacimiento = {
			_seconds: moment(data.fecha_nacimiento, 'YYYY-MM-DD').unix()
		}
		Cache.editParticipante(capacitacion, {
			id,
			...data
		});
		return res.data;
	}
}

async function getParticipante(id){
	var res = await get('participante/'+id);
	if(res.error) throw res;
	else return res.data;
}

async function addCapacitacionParticipante(capacitacion, data){
	var res = await post('participante', {
		capacitacion,
		...data
	});

	if(res.error) throw res;
	else{
		data.fecha_nacimiento = {
			_seconds: moment(data.fecha_nacimiento, 'YYYY-MM-DD').unix()
		}
		Cache.addParticipante(capacitacion, data);
		return res.data;
	}
}

async function removeCapacitacionParticipante(capacitacion, id){
	var res = await sendDelete('participante/'+id);
	if(res.error) throw res;
	else {
		Cache.removeParticipante(capacitacion, id)
		return res.data;
	}
}


async function changeCapacitacionEncargado(capacitacion, encargado){
	var res = await post('capacitacion/edit/encargado', {
		id: capacitacion,
		coordinador: encargado
	});
	if(res.error) throw res;
	else{
		Cache.changeCapacitacionEncargado(capacitacion, encargado);
		return res.data;
	}
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
	getMiembro,
	changePassword,
	adminGetUsers,
	registerAdmin,
	getAdmin,
	deleteAdmin,
	changeAdminPassword,
	editAdmin,
	editGrupo,
	deleteGrupo,
	editMiembro,
	editMiembroStatus,
	changeCoordinador,
	getGrupoBajasTemporales,
	getFichaMedica,
	setFichaMedica,
	editParroquia,
	getAcompanante,
	registerAcompananteZona,
	registerAcompananteDecanato,
	deleteAcompananteZona,
	deleteAcompananteDecanato,
	editAcompanante,
	editCoordinador,
	deleteCoordinador,
	addCapacitacion,
	getCapacitaciones,
	getCapacitacion,
	editCapacitacion,
	removeCapacitacion,
	changeCoordinadorCapacitacion,
	registerCapacitacionAsistencia,
	saveCapacitacionAsistencia,
	getCapacitacionAsistencia,
	addCapacitacionParticipante,
	removeCapacitacionParticipante,
	getParticipante,
	editParticipante,
	changeCapacitacionEncargado
}