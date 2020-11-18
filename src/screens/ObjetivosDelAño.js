/* 
Nombre: ObjetivosDelAño.js
Descripción: Pantalla para ver la información de los objetivos de un año
*/
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { API } from "./../lib";

export default (props) => {
  const { year } = props.route.params;

  props.navigation.setOptions({
    headerTitle: `Objetivos del año ${year}`,
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Text style={styles.section}>Objetivos del año {year}</Text>
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
