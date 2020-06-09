import React from 'react';
import Input from './Input';

export default (props)=>{

	var selectValue = ()=>{
		props.navigation.navigate('Select', {
			name: props.name,
			data: props.data,
			organize: props.organize,
			renderItem: props.renderItem,
			onSelect: props.onSelect
		})
	}

	return <Input name={props.name} value={props.value} readonly onPress={selectValue} icon="chevron-right" />
}