import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { addAdministrativeServicesDocument } from '../../../utils/actions'

export default function AdministrativeServices( { route: { params: { projectId } } } ) {
  console.log("ID del proyecto recibido:", projectId);
  const [startDateInventoryValidation, setStartDateInventoryValidation] = useState("");
  const [endDateInventoryValidation, setEndDateInventoryValidation] = useState("");
  const [startDateFumigation, setStartDateFumigation] = useState("");
  const [endDateFumigation, setEndDateFumigation] = useState("");
  const [startDateHousekeeping, setStartDateHousekeeping] = useState("");
  const [endDateHousekeeping, setEndDateHousekeeping] = useState("");

  useEffect(() => {
    // Recuperar las fechas almacenadas al iniciar la aplicación
    const getStoredDates = async () => {
      try {
        const storedStartDateInventoryValidation = await AsyncStorage.getItem(
          "startDateInventoryValidation-" + projectId
        );
        if (storedStartDateInventoryValidation) {
          setStartDateInventoryValidation(storedStartDateInventoryValidation);
        }
        const storedEndDateInventoryValidation = await AsyncStorage.getItem(
          "endDateInventoryValidation-" + projectId
        );
        if (storedEndDateInventoryValidation) {
          setEndDateInventoryValidation(storedEndDateInventoryValidation);
        }
        const storedStartDateFumigation = await AsyncStorage.getItem(
          "startDateFumigation-" + projectId
        );
        if (storedStartDateFumigation) {
          setStartDateFumigation(storedStartDateFumigation);
        }
        const storedEndDateFumigation = await AsyncStorage.getItem(
          "endDateFumigation-" + projectId
        );
        if (storedEndDateFumigation) {
          setEndDateFumigation(storedEndDateFumigation);
        }
        const storedStartDateHousekeeping = await AsyncStorage.getItem(
          "startDateHousekeeping-" + projectId
        );
        if (storedStartDateHousekeeping) {
          setStartDateHousekeeping(storedStartDateHousekeeping);
        }
        const storedEndDateHousekeeping = await AsyncStorage.getItem(
          "endDateHousekeeping-" + projectId
        );
        if (storedEndDateHousekeeping) {
          setEndDateHousekeeping(storedEndDateHousekeeping);
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

  const handleSaveInventoryValidation = async () => {
    if (validateDates(startDateInventoryValidation, endDateInventoryValidation)) {
      addAdministrativeServicesDocument(
        projectId,
        "Receipt and Validation Inventory",
        startDateInventoryValidation,
        endDateInventoryValidation
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateInventoryValidation,
        endDateInventoryValidation
      );

      // Mostrar mensaje de confirmación
      Alert.alert("Datos guardados", "Los datos se han guardado correctamente en la base de datos.");

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateInventoryValidation-" + projectId,
          startDateInventoryValidation
        );
        await AsyncStorage.setItem(
          "endDateInventoryValidation-" + projectId,
          endDateInventoryValidation
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveFumigation = async () => {
    if (validateDates(startDateFumigation, endDateFumigation)) {
      addAdministrativeServicesDocument(
        projectId,
        "Include Fumigation",
        startDateFumigation,
        endDateFumigation
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateFumigation,
        endDateFumigation
      );

      // Mostrar mensaje de confirmación
      Alert.alert("Datos guardados", "Los datos se han guardado correctamente en la base de datos.");

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateFumigation-" + projectId,
          startDateFumigation
        );
        await AsyncStorage.setItem(
          "endDateFumigation-" + projectId,
          endDateFumigation
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveHousekeeping = async () => {
    if (validateDates(startDateHousekeeping, endDateHousekeeping)) {
      addAdministrativeServicesDocument(
        projectId,
        "Include Housekeeping",
        startDateHousekeeping,
        endDateHousekeeping
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateHousekeeping,
        endDateHousekeeping
      );

      // Mostrar mensaje de confirmación
      Alert.alert("Datos guardados", "Los datos se han guardado correctamente en la base de datos.");

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateHousekeeping-" + projectId,
          startDateHousekeeping
        );
        await AsyncStorage.setItem(
          "endDateHousekeeping-" + projectId,
          endDateHousekeeping
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
        <Text style={styles.title}>Recibo y Validación de Inventario</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateInventoryValidation}
          value={startDateInventoryValidation}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateInventoryValidation}
          value={endDateInventoryValidation}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveInventoryValidation} />
        <Text style={styles.title}>Incluir Fumigación</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateFumigation}
          value={startDateFumigation}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateFumigation}
          value={endDateFumigation}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveFumigation} />
        <Text style={styles.title}>Incluir Aseo</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateHousekeeping}
          value={startDateHousekeeping}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateHousekeeping}
          value={endDateHousekeeping}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveHousekeeping} />
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

