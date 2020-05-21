/**
 * Order data for a alphabetized list.
 * @param {Array} data The data to order
 * @param {String} key The key to order the data by
 */
function organizeListData(data, key){
	if(!key) key = 'name';
	data = data.sort((a,b)=>a[key]>b[key]);
	var orderedData = {}
	for(var i of data.sort((a,b)=>a[key]-b[key])){
		if(!i[key])continue;
		if(!orderedData[i[key][0]]) orderedData[i[key][0]] = []
		orderedData[i[key][0]].push(i);
	}
	return orderedData;
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function validateField(rule, val){
	if(rule.type=='empty'){
		if(typeof val === 'undefined' || val.length==0) return false;
	}else if(rule.type=='minLength'){
		if(typeof val === 'undefined' || val.length<(rule.value || 1)) return false;
	}else if(rule.type=='maxLength'){
		if(rule.value && val && val.length>rule.value) return false;
	}else if(rule.type=='email'){
		console.log(val);
		if(typeof val === 'undefined' || !validateEmail(val)) return false;
	}
	return true;
}

function validateForm(obj, rules){
	for(var i in rules){
		var val = obj[i];
		if(Array.isArray(rules[i])){
			for(var rule of rules[i]){
				var valid = validateField(rule, val);
				if(!valid) return { valid: false, prompt: rule.prompt };
			}
		}else{
			var valid = validateField(rules[i], val);
			if(!valid) return { valid: false, prompt: rules[i].prompt };
		}
	}
	return { valid: true };
}

export default {
	organizeListData,
	validateForm
}