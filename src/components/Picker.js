import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesome5 } from '@expo/vector-icons'

export default (props)=>{

	var [select, setSelect] = useState(0);
	var items = (props.items || [])
	var placeholder = (props.placeholder || { label: 'Seleccionar valor...', value: null })

	var valueSelected = (val, index)=>{
		if(index==0) return;
		setSelect(index);
		if(props.onValueChange){
			props.onValueChange(items[index-1]);
		}
	}
	
	return (
		<View style={[styles.container, props.style]}>
			<Text style={styles.label}>{props.name || 'Input'}</Text>
			<View style={styles.input}>
				<RNPickerSelect
					placeholder={props.placeholder}
					onValueChange={valueSelected}
					items={items}
					textInputProps={{
						style: styles.pickerStyle,
					}}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
						<Text style={{ fontSize: 18, width: '100%', color: !items[select-1] ? 'gray' : 'black' }}>{(items[select-1] || placeholder).label}</Text>
						<FontAwesome5 name={'caret-down'} size={20} style={{ marginLeft: -15 }} />
					</View>
				</RNPickerSelect>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
		width: '100%',
	},
	input: {
		backgroundColor: '#FDFDFD',
		height: 45,
		paddingHorizontal: 10,
		borderRadius: 4,
		borderColor: '#CCC',
		borderWidth: StyleSheet.hairlineWidth,
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
	},
	pickerStyle: {
		height: '100%',
		width: '100%',
		backgroundColor: 'red'
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: 'grey',
		fontWeight: '500'
	}
})