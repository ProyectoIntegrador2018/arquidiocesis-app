let zonas = false;
let zonas_dirty = false;
var getZonas = ()=>zonas;
var getZona = id=>zonas.find(a=>a.id==id && a.cached);
var isZonasDirty = ()=>zonas_dirty;
var setZona = (i)=>{
	i.cached = true;
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
	var ix = parroquias.findIndex(a=>a.id==i.id)
	if(ix==-1) parroquias.push(i);
	else parroquias[ix] = i;
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
	var ix = capillas.findIndex(a=>a.id==i.id)
	if(ix==-1) capillas.push(i);
	else capillas[ix] = i;
}
var setCapillasDirty = (d=true)=>{
	capillas_dirty = d;
}
var addCapilla = i=>{
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
	var ix = grupos.findIndex(a=>a.id==i.id)
	if(ix==-1) grupos.push(i);
	else grupos[ix] = i;
}
var setGruposDirty = (d=true)=>{
	grupos_dirty = d;
}
var addGrupo = i=>{
	grupos.push(i);
}




export default {
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
	addGrupo
}