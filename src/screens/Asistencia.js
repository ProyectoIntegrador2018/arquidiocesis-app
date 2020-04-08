import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import { CheckBox } from 'react-native-elements'

class App extends React.Component {
 
	constructor(props) {
	  super(props);
   
	  this.state = {
		data: {
		  'A': [{ name: 'A1',checked: false }, { name: 'A2',checked: false }, { name: 'A3',checked: false }],
		  'B': [{ name: 'B1',checked: false }, { name: 'B2',checked: false }, { name: 'B3',checked: false }],
		  'E': [{ name: 'E1',checked: false }, { name: 'E2',checked: false }, { name: 'E3',checked: false }, { name: 'E4',checked: false }],
		  'F': [{ name: 'F1',checked: false }, { name: 'F2',checked: false }, { name: 'F3',checked: false }],
		  'H': [{ name: 'H1',checked: false }, { name: 'H2',checked: false }, { name: 'H3',checked: false }, { name: 'H5',checked: false }],
		  'J': [{ name: 'J1',checked: false }, { name: 'J2',checked: false }, { name: 'J3',checked: false }, { name: 'J5',checked: false }],
		  'Y': [{ name: 'Y1' }, { name: 'Y2',checked: false }, { name: 'Y3',checked: false }, { name: 'Y5',checked: false }, { name: 'Y6',checked: false }],
		},
     
  }
    
   
	}
   
	renderItem = ({ item }) => {
	  return (
		<View style={{
		  marginLeft: 10,
		  paddingVertical: 10,
		  borderBottomColor: 'lightgray',
		  borderBottomWidth: 0.5
		}}>
      <CheckBox
      title={item.name}
      checked={this.state.checked}
      onPress={() => this.setState({checked: !this.state.checked})}
      />
		  {/* <Text>{item.name}</Text> */}
		</View>
	  )
	}
   
	// renderSectionHeader = ({ section: { title } }) => {
	//   return (
	// 	<View style={{
	// 	  paddingLeft: 10,
	// 	  backgroundColor: '#f1f2f3',
	// 	  paddingVertical: 5,
	// 	}}>
	// 	  <Text style={{ color: 'blue' }}>{title}</Text>
	// 	</View>
	//   )
	// }
   
	render() {
	  return (
		<View style={{ flex: 1 }}>
		  <AlphabetSectionList
			data={this.state.data}
			renderItem={this.renderItem}
			renderHeader={this.renderHeader}
			// custom section header
			renderSectionHeader={this.renderSectionHeader}
			// default section header styles
			// sectionHeaderStyle={{ paddingVertical: 5 }}
			// sectionHeaderTextStyle={{ fontSize: 16, color: 'blue' }}
		  />
		</View>
	  )
	}
  }
   
export default App;

const styles = StyleSheet.create({
	testText: {
		fontSize: 20
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})
