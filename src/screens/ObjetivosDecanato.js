/* 
Nombre: ObjetivosDecanato.js
Descripción: Pantalla para editar la información de los objetivos de un decanato
*/
import React, { useState, useRef,useEffect } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Button } from "../components";
import { API } from "./../lib";

export default (props) => {
  const { objectiveData,onEdit } = props.route.params;
  console.log("objectiveData :>> ", objectiveData);

  const [loading, setLoading] = useState(false);
  const [p, setP] = useState(objectiveData.parroquia);
  const [cg, setCg] = useState(objectiveData.grupo);
  const [oc1, setOc1] = useState(objectiveData.objetivo1);
  const [oc2, setOc2] = useState(objectiveData.objetivo2);
  const [oc3, setOc3] = useState(objectiveData.objetivo3);

  props.navigation.setOptions({
    headerStyle: {
      backgroundColor: "#002E60",
      shadowOpacity: 0,
    },
    headerTitle:"Editar un objetivo",
  });

  const editObjective = async () => {
    if (loading) return;
    if (p.trim().length < 1 && typeof p != 'number') return alert("Por favor introduzca un número.");
    if (cg.trim().length < 1 && typeof cg != 'number')
      return alert("Por favor introduzca un número.");
    if (oc1.trim().length < 1 && typeof oc1 != 'number')
      return alert("Por favor introduzca un número.");
    if (oc2.trim().length < 1 && typeof oc2 != 'number')
      return alert("Por favor introduzca un número.");
    if (oc3.trim().length < 1 && typeof oc3 != 'number')
      return alert("Por favor introduzca un número.");

    setLoading(true);

    try {
      const data = {
        p:parroquia,
        cg:grupo,
        oc1:objetivo1,
        oc2:objetivo2,
        oc3:objetivo3,
      };
      const editedObjective = await API.editObjective(objectiveData.id, data);

      if (onEdit) {
        onEdit(data);
      }

      alert("Se ha editado el objetivo");
      props.navigation.goBack();
    } catch (error) {
      console.log("error :>> ", error);

      if (error.message === "Ya existe un evento con ese nombre.") {
        alert(error.message);
      } else {
        alert("Hubo un error editando el objetivo");
      }
    }

    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView style={styles.container} bounces={false}>
      <Text style={styles.header}>Editar Objetivo </Text>
      <Input name="Parroquias (P)" value={p} onChangeText={setP} />
      <Input
        name="Con grupo (CG)"
        value={cg}
        onChangeText={setCg}
      />
      <Input
        name="Objetivo de Capacitación 1 (OC1)"
        value={oc1}
        onChangeText={setOc1}
      />
      <Input
        name="Objetivo de Capacitación 2 (OC2)"
        value={oc2}
        onChangeText={setOc2}
      />
      <Input
        name="Objetivo de Capacitación 3 (OC3)"
        value={oc3}
        onChangeText={setOc3}
      />
      <Button text="Guardar" loading={loading} onPress={editObjective} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "grey",
    fontWeight: "500",
  },
  container: {
    height: "70%",
    width: "100%",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
