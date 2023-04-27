import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { addContractingDocument } from '../../../utils/actions'

export default function Contracting( { route: { params: { projectId } } } ) {
  console.log("ID del proyecto recibido:", projectId);
  const [startDateSignature, setStartDateSignature] = useState("");
  const [endDateSignature, setEndDateSignature] = useState("");
  const [startDateLocalReceipt, setStartDateLocalReceipt] = useState("");
  const [endDateLocalReceipt, setEndDateLocalReceipt] = useState("");

  useEffect(() => {
    // Recuperar las fechas almacenadas al iniciar la aplicación
    const getStoredDates = async () => {
      try {
        const storedStartDateSignature = await AsyncStorage.getItem(
          "startDateSignature-" + projectId
        );
        if (storedStartDateSignature) {
          setStartDateSignature(storedStartDateSignature);
        }
        const storedEndDateSignature = await AsyncStorage.getItem(
          "endDateSignature-" + projectId
        );
        if (storedEndDateSignature) {
          setEndDateSignature(storedEndDateSignature);
        }
        const storedStartDateLocalReceipt = await AsyncStorage.getItem(
          "startDateLocalReceipt-" + projectId
        );
        if (storedStartDateLocalReceipt) {
          setStartDateLocalReceipt(storedStartDateLocalReceipt);
        }
        const storedEndDateLocalReceipt = await AsyncStorage.getItem(
          "endDateLocalReceipt-" + projectId
        );
        if (storedEndDateLocalReceipt) {
          setEndDateLocalReceipt(storedEndDateLocalReceipt);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStoredDates();
  }, []);

  const validateDates = (startDate, endDate) => {
    if (!moment(startDate, "DD/MM/YYYY").isValid()) {
      alert("La fecha de inicio no es válida");
      return false;
    }
    if (!moment(endDate, "DD/MM/YYYY").isValid()) {
      alert("La fecha de fin no es válida");
      return false;
    }
    if (
      moment(startDate, "DD/MM/YYYY").isAfter(moment(endDate, "DD/MM/YYYY"))
    ) {
      alert("La fecha de inicio debe ser anterior a la fecha de fin");
      return false;
    }
    return true;
  };

  const handleSaveSignature = async () => {
    if (validateDates(startDateSignature, endDateSignature)) {
      addContractingDocument(
        projectId,
        "Signing of contract",
        startDateSignature,
        endDateSignature
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateSignature,
        endDateSignature
      );
  
      // Mostrar mensaje de confirmación
      Alert.alert("Datos guardados", "Los datos se han guardado correctamente en la base de datos.");
  
      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateSignature-" + projectId,
          startDateSignature
        );
        await AsyncStorage.setItem(
          "endDateSignature-" + projectId,
          endDateSignature
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  const handleSaveLocalReceipt = async () => {
    if (validateDates(startDateLocalReceipt, endDateLocalReceipt)) {
      addContractingDocument(
        projectId,
        "Minutes of local receipt",
        startDateLocalReceipt,
        endDateLocalReceipt
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateLocalReceipt,
        endDateLocalReceipt
      );
  
      // Mostrar mensaje de confirmación
      Alert.alert("Datos guardados", "Los datos se han guardado correctamente en la base de datos.");
  
      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateLocalReceipt-" + projectId,
          startDateLocalReceipt
        );
        await AsyncStorage.setItem(
          "endDateLocalReceipt-" + projectId,
          endDateLocalReceipt
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        {/* Aquí puedes mostrar una lista de proyectos y llamar a handleProjectSelection con el ID del proyecto seleccionado cuando el usuario seleccione uno */}
        <Text style={styles.title}>Firma de Contrato</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateSignature}
          value={startDateSignature}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateSignature}
          value={endDateSignature}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveSignature} />
        <Text style={styles.title}>Acta Recibo de Local</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateLocalReceipt}
          value={startDateLocalReceipt}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateLocalReceipt}
          value={endDateLocalReceipt}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveLocalReceipt} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

