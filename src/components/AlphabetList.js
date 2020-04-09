import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Util } from '../lib';
import { FontAwesome5 } from '@expo/vector-icons'

export default  (props)=>{
	var components = []
	var headers = []
	var organizedData = Util.organizeListData(props.data, (props.key || 'name'))

	for(var i in organizedData){
		headers.push(components.length);
		components.push(
			<View key={'header-'+i} style={styles.header}>
				<Text style={styles.headerText}>{i}</Text>
			</View>
		)
		components.push(...organizedData[i].map((a,ix)=>props.renderItem ? (
			<TouchableOpacity onPress={()=>props.onSelect(a)} key={'item'+i+'-'+ix}>
				<View style={[styles.item]}>
					{props.renderItem(a)}
					<FontAwesome5 name="chevron-right" style={{ marginRight: 30, color: 'gray', fontSize: 15 }} />
				</View>
			</TouchableOpacity>
		) : <ListItem data={a} onPress={props.onSelect} key={'item'+i+'-'+ix} />))
	}

	return <ScrollView style={props.style} contentContainerStyle={{ paddingBottom: 50 }} stickyHeaderIndices={headers} refreshControl={
		(typeof props.refreshing !== undefined) ? <RefreshControl refreshing={(props.refreshing || false)} onRefresh={props.onRefresh} /> : null
	}>
		{components}
	</ScrollView>

}

var ListItem = (props)=>{
	return <TouchableOpacity onPress={()=>{
		props.onPress(props.data)
	}}>
		<View style={styles.item}>
			<Text>{props.data.name}</Text>
			<FontAwesome5 name="chevron-right" style={{ marginRight: 30, color: 'gray', fontSize: 15 }} />
		</View>
	</TouchableOpacity>
}

const styles = StyleSheet.create({
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
	},
	item: {
		marginLeft: 15, 
		paddingVertical: 15, 
		width: '100%', 
		borderBottomColor: '#CCC',
		borderBottomWidth: StyleSheet.hairlineWidth, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'space-between' 
	}
})
