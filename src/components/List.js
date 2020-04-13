import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Util } from '../lib';
import { FontAwesome5 } from '@expo/vector-icons'

export default  (props)=>{
	if(props.scroll!==false){
		return (
			<ScrollView style={props.style} contentContainerStyle={{ paddingBottom: 50 }} refreshControl={
				(props.refreshing !== undefined) ? <RefreshControl refreshing={(props.refreshing || false)} onRefresh={props.onRefresh} /> : null
			}>
				{props.data.map((a, ix)=><ListItem data={a} onPress={props.onSelect} key={'item-'+ix} />)}
			</ScrollView>
		)
	}else{
		return (
			<View>
				{props.data.map((a, ix)=><ListItem data={a} onPress={props.onSelect} key={'item-'+ix} />)}
			</View>
		)
	}

}

var ListItem = (props)=>{
	return <TouchableOpacity onPress={()=>{
		if(props.onPress)props.onPress(props.data)
	}}>
		<View style={{ backgroundColor: 'white' }}>
			<View style={styles.item}>
				<Text>{(props.data.nombre || props.data.name)}</Text>
				<FontAwesome5 name="chevron-right" style={{ marginRight: 30, color: 'gray', fontSize: 15 }} />
			</View>
		</View>
	</TouchableOpacity>
}

const styles = StyleSheet.create({
	item: {
		paddingLeft: 15, 
		paddingVertical: 15, 
		width: '100%', 
		borderBottomColor: '#CCC',
		borderBottomWidth: StyleSheet.hairlineWidth, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between' 
	}
})
