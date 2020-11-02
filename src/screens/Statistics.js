import React, { useState } from 'react';
import { ScrollView, FlatList, View, Text, StyleSheet, Switch } from 'react-native';
import CanvasJSReact from '../lib/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default (props)=>{

  var [verAlergias, setVerAlergias] = useState(false);
  var [verDiscapacidad, setVerDiscapacidad] = useState(false);

  props.navigation.setOptions({
		headerTitle: 'Estadísticas de miembros'
  });

  CanvasJS.addColorSet("customColorSet1",
    ["#4661EE","#EC5657","#1BCDD1","#8FAABB","#B08BEB",
    "#3EA0DD","#F5A52A","#23BFAA","#FAA586","#EB8CC6"]);

  CanvasJS.addColorSet("customColorSet2", ["#EC5657","#E6E6E6"]);
  
  const servicioMedico = {
    interactivityEnabled: false,
    animationEnabled: true,
    title: {
      text: "Índice de Servicio Médico",
      horizontalAlign: "left",
      fontWeight: "normal",
      fontColor: "gray",
      padding: 15
    },
    subtitles: [{
      text: "90% Total",
      verticalAlign: "center",
      fontSize: 18,
      dockInsidePlotArea: true
    }],
    backgroundColor: "#F2F2F2",
    colorSet: "customColorSet1",
    width: 500,
    height: 275,
    data: [{
      type: "doughnut",
      showInLegend: false,
      indexLabel: " {name}: {y} ",
      indexLabelFontSize: 12,
      indexLabelPlacement: "outside",
      innerRadius: "70%",
      yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Privado", y: 38 },
        { name: "Público", y: 52 },
        { name: "Ninguno", y: 10 },
      ]
    }]
  }

  const alergias = {
    interactivityEnabled: false,
    animationEnabled: true,
    title: {
      text: "Índice de Alergias",
      horizontalAlign: "left",
      fontWeight: "normal",
      fontColor: "gray",
      padding: 15
    },
    subtitles: [{
      text: "76% Con alergia",
      verticalAlign: "center",
      fontSize: 18,
      dockInsidePlotArea: true
    }],
    backgroundColor: "#F2F2F2",
    colorSet: "customColorSet2",
    width: 500,
    height: 275,
    data: [{
      type: "doughnut",
      showInLegend: false,
      yValueFormatString: "#,###'%'",
      startAngle: 90,
      innerRadius: "85%",
      dataPoints: [
        { name: "Con alergia", y: 76 },
        { name: "Sin alergia", y: 24 },
      ]
    }]
  }

  const descAlergias = ['alergia1', 'alergia2', 'alergia3', 'alergia4', 'alergia5', 'alergia6',
                       'alergia7', 'alergia8', 'alergia9', 'alergia10', 'alergia11', 'alergia12']

  const problemasSalud = {
    interactivityEnabled: false,
    animationEnabled: true,
    title: {
      text: "Problemas de salud",
      horizontalAlign: "left",
      fontWeight: "normal",
      fontColor: "gray",
      padding: 15
    },
    backgroundColor: "#F2F2F2",
    colorSet: "customColorSet1",
    width: 500,
    height: 275,
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      fontSize: 14,
      fontWeight: "normal"
    },
    data: [{
      type: "pie",
      showInLegend: true,
      yValueFormatString: "#,###'%'",
      startAngle: 90,
      legendText: "{name}: {y}   ",
      dataPoints: [
        { name: "Hipertensión", y: 32 },
        { name: "Sobrepeso", y: 25 },
        { name: "Problema Cardiovascular", y: 20 },
        { name: "Azúcar", y: 10 },
        { name: "Otro", y: 13 }
      ]
    }]
  }

  const seguridadSocial = {
    interactivityEnabled: false,
    animationEnabled: true,
    title: {
      text: "Índice de Seguridad Social",
      horizontalAlign: "left",
      fontWeight: "normal",
      fontColor: "gray",
      padding: 15
    },
    subtitles: [{
      text: "87% Total",
      verticalAlign: "center",
      fontSize: 18,
      dockInsidePlotArea: true
    }],
    backgroundColor: "#F2F2F2",
    colorSet: "customColorSet1",
    width: 500,
    height: 275,
    data: [{
      type: "doughnut",
      showInLegend: false,
      indexLabel: " {name}: {y} ",
      indexLabelFontSize: 12,
      indexLabelPlacement: "outside",
      innerRadius: "70%",
      yValueFormatString: "#,###'%'",
      dataPoints: [
        { name: "Pensionado", y: 28 },
        { name: "Jubilado", y: 36 },
        { name: "Apoyo Federal", y: 23 },
        { name: "Ninguno", y: 13 },
      ]
    }]
  }

  const educacion = {
    interactivityEnabled: false,
    animationEnabled: true,
    title: {
      text: "Índice de Educación",
      horizontalAlign: "left",
      fontWeight: "normal",
      fontColor: "gray",
      padding: 15
    },
    backgroundColor: "#F2F2F2",
    colorSet: "customColorSet1",
    width: 500,
    height: 275,
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      fontSize: 14,
      fontWeight: "normal"
    },
    data: [{
      type: "pie",
      showInLegend: true,
      yValueFormatString: "#,###'%'",
      startAngle: 90,
      legendText: "{name}: {y}   ",
      dataPoints: [
        { name: "Primaria", y: 8 },
        { name: "Secundaria", y: 20 },
        { name: "Preparatoria", y: 28 },
        { name: "Profesional", y: 34 },
        { name: "Sin educación", y: 10 }
      ]
    }]
  }

  const discapacidad = {
    interactivityEnabled: false,
    animationEnabled: true,
    title: {
      text: "Índice de Discapacidad",
      horizontalAlign: "left",
      fontWeight: "normal",
      fontColor: "gray",
      padding: 15
    },
    subtitles: [{
      text: "23% Con discapacidad",
      verticalAlign: "center",
      fontSize: 16,
      dockInsidePlotArea: true
    }],
    backgroundColor: "#F2F2F2",
    colorSet: "customColorSet2",
    width: 500,
    height: 275,
    data: [{
      type: "doughnut",
      showInLegend: false,
      yValueFormatString: "#,###'%'",
      startAngle: 90,
      innerRadius: "85%",
      dataPoints: [
        { name: "Con discapacidad", y: 23 },
        { name: "Sin discapacidad", y: 77 },
      ]
    }]
  }

  const descDiscapacidad = ['discapacidad1', 'discapacidad2', 'discapacidad3', 'discapacidad4', 'discapacidad5', 
                            'discapacidad6', 'discapacidad7']
	
  return (
		<ScrollView>
      <CanvasJSChart options = {servicioMedico}/>
      <CanvasJSChart options = {alergias}/>
			<View style={styles.switchContainer}>
        <Text style={styles.label}>¿Ver lista de alergias?</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#32CD32" }}
					thumbColor={verAlergias ? "#FFFFFF" : "#f4f3f4"}
					onValueChange={setVerAlergias}
					value={verAlergias}
				/>
			</View>
      { verAlergias && (
        <ScrollView style={styles.list}>
          <FlatList
            data={descAlergias}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={{ backgroundColor: index % 2 == 0  ? "#FFFFFF" : "#F2F2F2"  }}>
                <Text style={styles.listItem}>{item}</Text>
              </View>
            )}
          />
        </ScrollView>
      )}
      <CanvasJSChart options = {problemasSalud}/>
      <CanvasJSChart options = {seguridadSocial}/>
      <CanvasJSChart options = {educacion}/>
      <CanvasJSChart options = {discapacidad}/>
			<View style={styles.switchContainer}>
        <Text style={styles.label}>¿Ver lista de discapacidades?</Text>
				<Switch
					trackColor={{ false: "#767577", true: "#32CD32" }}
					thumbColor={verDiscapacidad ? "#FFFFFF" : "#f4f3f4"}
					onValueChange={setVerDiscapacidad}
					value={verDiscapacidad}
				/>
			</View>
      { verDiscapacidad && (
        <ScrollView style={styles.list}>
          <FlatList
            data={descDiscapacidad}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View style={{ backgroundColor: index % 2 == 0  ? "#FFFFFF" : "#F2F2F2"  }}>
                <Text style={styles.listItem}>{item}</Text>
              </View>
            )}
          />
        </ScrollView>
      )}
    </ScrollView>
	)
}

const styles = StyleSheet.create({
  sectionText: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 10,
    marginTop: 30,
    paddingLeft: 15,
  },
  listItem: {
    padding: 10,
  },
  label: {
		fontSize: 16,
		marginRight: 15,
		color: 'grey',
		fontWeight: '500'
  },
  switchContainer: {
    flexDirection: "row",
    margin: 15
  },
  list: {
    maxHeight: "225px",
    margin: 20,
    marginTop: 5
  }
})
