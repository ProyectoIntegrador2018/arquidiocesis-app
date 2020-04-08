/**
 * Order data for a alphabetized list.
 * @param {Array} data The data to order
 * @param {String} key The key to order the data by
 */
function organizeListData(data, key){
	var orderedData = {}
	for(var i of data.sort((a,b)=>a[key]-b[key])){
		if(!orderedData[i[key][0]]) orderedData[i[key][0]] = []
		orderedData[i[key][0]].push(i);
	}
	return orderedData;
}

export default {
	organizeListData
}