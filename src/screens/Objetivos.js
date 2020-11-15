/* 
Nombre: Objetivos.js
Usuario con acceso: Admin
Descripción: Pantalla para ver la información de los objetivos
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
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            color: "gray",
            backgroundColor: "white",
            padding: 15,
          }}
        >
          Objetivos.
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
});
