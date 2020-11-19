/* 
Nombre: ObjetivosDecanato.js
Descripción: Pantalla para editar la información de los objetivos de un decanato
*/
import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { API } from "./../lib";

export default (props) => {
  const { objectiveData } = props.route.params;
  console.log("objectiveData :>> ", objectiveData);

  props.navigation.setOptions({
    headerTitle: `Objetivos del decanato`,
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Text style={styles.section}>
          Objetivos del decanato "{objectiveData[0]}"
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  testText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    fontSize: 16,
    color: "gray",
    marginTop: 15,
    marginBottom: 15,
    fontWeight: "500",
    paddingLeft: 15,
  },
});
