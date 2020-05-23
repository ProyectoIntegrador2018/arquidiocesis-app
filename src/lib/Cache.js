let zonas = false;
let zonas_dirty = false;
var getZonas = ()=>zonas;
var getZona = id=>zonas.find(a=>a.id==id && a.cached);
var isZonasDirty = ()=>zonas_dirty;
var setZona = (i)=>{
	i.cached = true;
	if(!zonas) zonas = [];
	var ix = zonas.findIndex(a=>a.id==i.id)
	if(ix==-1) zonas.push(i);
	else zonas[ix] = i;
}
var setZonas = z=>{
	zonas =  z;
}
var setZonasDirty = (d=true)=>{
	zonas_dirty = d;
}
var addZona = i=>{
	zonas.push(i);
}



let decanatos = false;
let decanatos_dirty = false;
var getDecanatos = ()=>decanatos;
var getDecanato = id=>decanatos.find(a=>a.id==id && a.cached);
var isDecanatosDirty = ()=>decanatos_dirty;
var setDecanato = (i)=>{
	i.cached = true;
	if(!decanatos) decanatos = [];
	var ix = decanatos.findIndex(a=>a.id==i.id)
	if(ix==-1) decanatos.push(i);
	else decanatos[ix] = i;
}
var setDecanatos = d=>{
	decanatos =  d;
}
var setDecanatosDirty = (d=true)=>{
	decanatos_dirty = d;
}
var addDecanato = i=>{
	decanatos.push(i);
}



let parroquias = false;
let parroquias_dirty = false;
var getParroquias = ()=>parroquias;
var getParroquia = id=>parroquias.find(a=>a.id==id && a.cached);
var isParroquiasDirty = ()=>parroquias_dirty;
var setParroquias = z=>{
	parroquias =  z;
}
var setParroquia = (i)=>{
	i.cached = true;
	if(!parroquias) parroquias = [];
	var ix = parroquias.findIndex(a=>a.id==i.id)
	if(ix==-1) parroquias.push(i);
	else parroquias[ix] = i;
}
var deleteParroquia = (parroquia_id)=>{
	parroquias = parroquias.filter(a=>a.id!=parroquia_id);
}
var deleteParroquiaCapilla = (parroquia_id, capilla_id) =>{
	var p = getParroquia(parroquia_id);
	if(!p) return false;
	p.capillas = p.capillas.filter(a=>a.id!=capilla_id);
	setParroquia(p);
	return true;
}
var parroquiaAddCapilla = (parroquia_id, capilla)=>{
	var p = getParroquia(parroquia_id);
	if(!p) return false;
	if(!p.capillas) p.capillas = []
	p.capillas.push(capilla);
	setParroquia(p);
	return true;
}
var setParroquiasDirty = (d=true)=>{
	parroquias_dirty = d;
}
var addParroquia = i=>{
	parroquias.push(i);
}



let capillas = false;
let capillas_dirty = false;
var getCapillas = ()=>capillas;
var getCapilla = id=>parroquias.find(a=>a.id==id && a.cached);
var isCapillasDirty = ()=>capillas_dirty;
var setCapillas = z=>{
	capillas =  z;
}
var setCapilla = (i)=>{
	i.cached = true;
	if(!capillas) capillas = [];
	var ix = capillas.findIndex(a=>a.id==i.id)
	if(ix==-1) capillas.push(i);
	else capillas[ix] = i;
}
var setCapillasDirty = (d=true)=>{
	capillas_dirty = d;
}
var addCapilla = i=>{
	if(!capillas) capillas = []
	capillas.push(i);
}



let coordinadores = false;
let coordinadores_dirty = false;
var getCoordinadores = ()=>coordinadores;
var getCoordinador = id=>coordinadores.find(a=>a.id==id && a.cached);
var isCoordinadoresDirty = ()=>coordinadores_dirty;
var setCoordinadores = z=>{
	coordinadores =  z;
}
var setCoordinador = (i)=>{
	i.cached = true;
	if(!coordinadores) coordinadores = [];
	var ix = coordinadores.findIndex(a=>a.id==i.id)
	if(ix==-1) coordinadores.push(i);
	else coordinadores[ix] = i;
}
var setCoordinadoresDirty = (d=true)=>{
	coordinadores_dirty = d;
}
var addCoordinador = i=>{
	coordinadores.push(i);
}



let grupos = false;
let grupos_dirty = false;
var getGrupos = ()=>grupos;
var getGrupo = id=>grupos.find(a=>a.id==id && a.cached);
var isGruposDirty = ()=>grupos_dirty;
var setGrupos = z=>{
	grupos =  z;
}
var setGrupo = (i)=>{
	i.cached = true;
	if(!grupos) grupos = [];
	var ix = grupos.findIndex(a=>a.id==i.id)
	if(ix==-1) grupos.push(i);
	else grupos[ix] = i;
}
var registerAsistencia = (id, date)=>{
	var g = getGrupo(id);
	if(!g.asistencias) g.asistencias = []
	g.asistencias.push(date);
	setGrupo(g);
}
var setGruposDirty = (d=true)=>{
	grupos_dirty = d;
}
var addGrupo = i=>{
	grupos.push(i);
}


let miembros = [];
var getMiembro = id=>miembros.find(a=>a.id==id && a.cached);
var addMiembro = m=>{
	var ix = miembros.findIndex(a=>a.id==m.id);
	m.cached = true;
	if(ix!=-1){
		miembros[ix] = m;
	}else{
		miembros.push(m);
	}
}
var clearMiembros = ()=>{
	miembros = [];
}
var setMiembroDirty = id=>{
	var ix = miembros.findIndex(a=>a.id==id);
	if(ix!=-1){
		miembros[ix].cached = false;
	}
}
var setMiembroStatus = (id, status)=>{
	var ix = miembros.findIndex(a=>a.id==id);
	if(ix!=-1){
		miembros[ix].estatus = status;
	}
}




var clearCache = ()=>{
	miembros = [];
	grupos = [];
	coordinadores = [];
	capillas = [];
	parroquias = [];
	decanatos = [];
	zonas = [];
}




export default {
	clearCache,

	getZonas,
	getZona,
	setZonas,
	setZonasDirty,
	isZonasDirty,
	setZona,
	addZona,

	getDecanatos,
	getDecanato,
	setDecanatos,
	setDecanatosDirty,
	isDecanatosDirty,
	setDecanato,
	addDecanato,

	getParroquias,
	getParroquia,
	setParroquias,
	setParroquiasDirty,
	isParroquiasDirty,
	setParroquia,
	addParroquia,
	deleteParroquia,
	deleteParroquiaCapilla,
	parroquiaAddCapilla,

	getCapillas,
	getCapilla,
	setCapillas,
	setCapillasDirty,
	isCapillasDirty,
	setCapilla,
	addCapilla,

	getCoordinadores,
	getCoordinador,
	setCoordinadores,
	setCoordinadoresDirty,
	isCoordinadoresDirty,
	setCoordinador,
	addCoordinador,

	getGrupos,
	getGrupo,
	setGrupos,
	setGruposDirty,
	isGruposDirty,
	setGrupo,
	addGrupo,
	registerAsistencia,

	getMiembro,
	addMiembro,
	clearMiembros,
	setMiembroDirty,
	setMiembroStatus
}