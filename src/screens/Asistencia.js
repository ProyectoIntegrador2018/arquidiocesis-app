import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Util } from '../lib'

var Screen = (props)=>{

	var [data, setData] = useState(false);

	// When the screen is shown get data for this group.
	useEffect(()=>{
		setTimeout(()=>{
			// Dummy data
			var d = [
				{ id: 1, name: 'Savanah Navarro', checked: false }, { id: 2, name: 'Gage Mcguire', checked: false }, { id: 3, name: 'Giana Russell', checked: false }, { id: 4, name: 'Matthew Mcclure', checked: false },
				{ id: 5, name: 'Gabriel Carr', checked: false }, { id: 6, name: 'Skyla Mclean', checked: false }, { id: 7, name: 'Gretchen Price', checked: false }, { id: 8, name: 'Aedan Reeves', checked: false },
				{ id: 9, name: 'Paxton Campos', checked: false }, { id: 10, name: 'Milo Sandoval', checked: false }, { id: 11, name: 'Ella George', checked: false }, { id: 12, name: 'Waylon Anthony', checked: false },
				{ id: 13, name: 'Marco Cantu', checked: false }, { id: 14, name: 'Madeline Mendez', checked: false }, { id: 15, name: 'Amaya Salinas', checked: false }, { id: 16, name: 'Moses Bray', checked: false },
				{ id: 17, name: 'Kira Berry', checked: false }, { id: 18, name: 'Brynn Estrada', checked: false }, { id: 19, name: 'Maribel Burns', checked: false }, { id: 20, name: 'Bria Bradley', checked: false },
				{ id: 21, name: 'Ana Mckee', checked: false }, { id: 22, name: 'Abigail Boyer', checked: false }, { id: 23, name: 'Nikhil Beard', checked: false }, { id: 24, name: 'Marcelo Hebert', checked: false },
				{ id: 25, name: 'Amelie Gibbs', checked: false }, { id: 26, name: 'Uriah Powell', checked: false }, { id: 27, name: 'Kallie Proctor', checked: false }, { id: 28, name: 'Landon Wilkinson', checked: false },
				{ id: 29, name: 'Colten Garcia', checked: false }, { id: 30, name: 'Clare Austin', checked: false }, { id: 31, name: 'Van Griffin', checked: false }, { id: 32, name: 'Edward Cannon', checked: false }
			]
			setData(d.sort((a,b)=>a.name>b.name));
		}, 500)
	}, [])

	// Cargando datos
	if(data === false){
		return <View style={{ marginTop: 50 }}>
			<ActivityIndicator size="large" />
			<Text style={{ marginTop: 10, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>Cargando datos...</Text>
		</View>
	}

	var onCheck = (id, checked) =>{
		var new_data = data;
		var dix = new_data.findIndex(a=>a.id==id);
		if(dix==-1) return;
		new_data[dix].checked = checked;
		setData(new_data);
	}

	// Ordenar datos
	var orderedData = Util.organizeListData(data, 'name');

	var components = []
	var headers = []
	for(var i in orderedData){
		headers.push(components.length);
		components.push(
			<View key={'header-'+i} style={styles.header}>
				<Text style={styles.headerText}>{i}</Text>
			</View>
		)
		components.push(...orderedData[i].map((a,ix)=><CheckboxItem {...a} onCheck={onCheck} key={'item'+i+'-'+ix} />))
	}

	return <View style={StyleSheet.absoluteFillObject}>
		<ScrollView style={StyleSheet.absoluteFillObject} contentContainerStyle={{ paddingBottom: 50 }} stickyHeaderIndices={headers}>
			{components}
		</ScrollView>
	</View>
}

Screen.navigationOptions = (props)=>({
	title: "ASSI!!",
	headerStyle: {
		backgroundColor: 'red'
	}
})

export default Screen;


var CheckboxItem = (props)=>{
	var [checked, setChecked] = useState(props.checked);
	var onPress = ()=>{
		setChecked(!checked)
		props.onCheck(props.id, checked)
	}

	return <TouchableOpacity onPress={onPress}>
		<View style={{ flexDirection: 'row', alignItems: 'center' }}>
			<CheckBox 
				checked={checked}
				onPress={onPress}
				containerStyle={{ marginRight: 0 }} />
			<Text style={{ fontSize: 16 }}>{props.name}</Text>
		</View>
	</TouchableOpacity>
}

// class App extends React.Component {
 
// 	constructor(props) {
// 	  super(props);
   
// 	  this.state = {
// 		data: {
// 		  'A': [{ name: 'A1',checked: false }, { name: 'A2',checked: false }, { name: 'A3',checked: false }],
// 		  'B': [{ name: 'B1',checked: false }, { name: 'B2',checked: false }, { name: 'B3',checked: false }],
// 		  'E': [{ name: 'E1',checked: false }, { name: 'E2',checked: false }, { name: 'E3',checked: false }, { name: 'E4',checked: false }],
// 		  'F': [{ name: 'F1',checked: false }, { name: 'F2',checked: false }, { name: 'F3',checked: false }],
// 		  'H': [{ name: 'H1',checked: false }, { name: 'H2',checked: false }, { name: 'H3',checked: false }, { name: 'H5',checked: false }],
// 		  'J': [{ name: 'J1',checked: false }, { name: 'J2',checked: false }, { name: 'J3',checked: false }, { name: 'J5',checked: false }],
// 		  'Y': [{ name: 'Y1' }, { name: 'Y2',checked: false }, { name: 'Y3',checked: false }, { name: 'Y5',checked: false }, { name: 'Y6',checked: false }],
// 		},
     
//   }
    
   
// 	}
   
// 	renderItem = ({ item }) => {
// 	  return (
// 		<View style={{
// 			marginLeft: 10,
// 			paddingVertical: 10,
// 			borderBottomColor: 'lightgray',
// 			borderBottomWidth: 0.5
// 		}}>
//       <CheckBox
//       title={item.name}
//       checked={this.state.checked}
//       onPress={() => this.setState({checked: !this.state.checked})}
//       />
// 		  {/* <Text>{item.name}</Text> */}
// 		</View>
// 	  )
// 	}
   
// 	// renderSectionHeader = ({ section: { title } }) => {
// 	//   return (
// 	// 	<View style={{
// 	// 	  paddingLeft: 10,
// 	// 	  backgroundColor: '#f1f2f3',
// 	// 	  paddingVertical: 5,
// 	// 	}}>
// 	// 	  <Text style={{ color: 'blue' }}>{title}</Text>
// 	// 	</View>
// 	//   )
// 	// }
   
// 	render() {
// 	  return (
// 		<View style={{ flex: 1 }}>
// 		  <AlphabetSectionList
// 			data={this.state.data}
// 			renderItem={this.renderItem}
// 			renderHeader={this.renderHeader}
// 			// custom section header
// 			renderSectionHeader={this.renderSectionHeader}
// 			// default section header styles
// 			// sectionHeaderStyle={{ paddingVertical: 5 }}
// 			// sectionHeaderTextStyle={{ fontSize: 16, color: 'blue' }}
// 		  />
// 		</View>
// 	  )
// 	}
//   }
   
// export default App;

const styles = StyleSheet.create({
	testText: {
		fontSize: 20
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	header: {
		backgroundColor: 'white',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#CCC',
		width: '100%',
		padding: 5,
		paddingHorizontal: 15
	},
	headerText: {
		fontWeight: '600'
	}
})
