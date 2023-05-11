import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { addTechnologyDocument } from "../../../utils/actions";

export default function Technology({
  route: {
    params: { projectId },
  },
}) {
  console.log("ID del proyecto recibido:", projectId);
  const [startDateEquipmentPurchase, setStartDateEquipmentPurchase] =
    useState("");
  const [endDateEquipmentPurchase, setEndDateEquipmentPurchase] = useState("");
  const [startDateTechnicalVisitNetworks, setStartDateTechnicalVisitNetworks] =
    useState("");
  const [endDateTechnicalVisitNetworks, setEndDateTechnicalVisitNetworks] =
    useState("");
  const [
    startDateInstallationCommunicationChannel,
    setStartDateInstallationCommunicationChannel,
  ] = useState("");
  const [
    endDateInstallationCommunicationChannel,
    setEndDateInstallationCommunicationChannel,
  ] = useState("");
  const [startDateEquipmentInstallation, setStartDateEquipmentInstallation] =
    useState("");
  const [endDateEquipmentInstallation, setEndDateEquipmentInstallation] =
    useState("");
  const [startDateTests, setStartDateTests] = useState("");
  const [endDateTests, setEndDateTests] = useState("");
  const [startDateKeysAndUsers, setStartDateKeysAndUsers] = useState("");
  const [endDateKeysAndUsers, setEndDateKeysAndUsers] = useState("");

  useEffect(() => {
    // Recuperar las fechas almacenadas al iniciar la aplicación
    const getStoredDates = async () => {
      try {
        const storedStartDateEquipmentPurchase = await AsyncStorage.getItem(
          "startDateEquipmentPurchase-" + projectId
        );
        if (storedStartDateEquipmentPurchase) {
          setStartDateEquipmentPurchase(storedStartDateEquipmentPurchase);
        }
        const storedEndDateEquipmentPurchase = await AsyncStorage.getItem(
          "endDateEquipmentPurchase-" + projectId
        );
        if (storedEndDateEquipmentPurchase) {
          setEndDateEquipmentPurchase(storedEndDateEquipmentPurchase);
        }

        const storedStartDateTechnicalVisitNetworks =
          await AsyncStorage.getItem(
            "startDateTechnicalVisitNetworks-" + projectId
          );
        if (storedStartDateTechnicalVisitNetworks) {
          setStartDateTechnicalVisitNetworks(
            storedStartDateTechnicalVisitNetworks
          );
        }
        const storedEndDateTechnicalVisitNetworks = await AsyncStorage.getItem(
          "endDateTechnicalVisitNetworks-" + projectId
        );
        if (storedEndDateTechnicalVisitNetworks) {
          setEndDateTechnicalVisitNetworks(storedEndDateTechnicalVisitNetworks);
        }

        const storedStartDateInstallationCommunicationChannel =
          await AsyncStorage.getItem(
            "startDateInstallationCommunicationChannel-" + projectId
          );
        if (storedStartDateInstallationCommunicationChannel) {
          setStartDateInstallationCommunicationChannel(
            storedStartDateInstallationCommunicationChannel
          );
        }
        const storedEndDateInstallationCommunicationChannel =
          await AsyncStorage.getItem(
            "endDateInstallationCommunicationChannel-" + projectId
          );
        if (storedEndDateInstallationCommunicationChannel) {
          setEndDateInstallationCommunicationChannel(
            storedEndDateInstallationCommunicationChannel
          );
        }

        const storedStartDateEquipmentInstallation = await AsyncStorage.getItem(
          "startDateEquipmentInstallation-" + projectId
        );
        if (storedStartDateEquipmentInstallation) {
          setStartDateEquipmentInstallation(
            storedStartDateEquipmentInstallation
          );
        }
        const storedEndDateEquipmentInstallation = await AsyncStorage.getItem(
          "endDateEquipmentInstallation-" + projectId
        );
        if (storedEndDateEquipmentInstallation) {
          setEndDateEquipmentInstallation(storedEndDateEquipmentInstallation);
        }

        const storedStartDateTests = await AsyncStorage.getItem(
          "startDateTests-" + projectId
        );
        if (storedStartDateTests) {
          setStartDateTests(storedStartDateTests);
        }
        const storedEndDateTests = await AsyncStorage.getItem(
          "endDateTests-" + projectId
        );
        if (storedEndDateTests) {
          setEndDateTests(storedEndDateTests);
        }

        const storedStartDateKeysAndUsers = await AsyncStorage.getItem(
          "startDateKeysAndUsers-" + projectId
        );
        if (storedStartDateKeysAndUsers) {
          setStartDateKeysAndUsers(storedStartDateKeysAndUsers);
        }
        const storedEndDateKeysAndUsers = await AsyncStorage.getItem(
          "endDateKeysAndUsers-" + projectId
        );
        if (storedEndDateKeysAndUsers) {
          setEndDateKeysAndUsers(storedEndDateKeysAndUsers);
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

  const handleSaveEquipmentPurchase = async () => {
    if (validateDates(startDateEquipmentPurchase, endDateEquipmentPurchase)) {
      addTechnologyDocument(
        projectId,
        "Purchase of equipment",
        startDateEquipmentPurchase,
        endDateEquipmentPurchase
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateEquipmentPurchase,
        endDateEquipmentPurchase
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateEquipmentPurchase-" + projectId,
          startDateEquipmentPurchase
        );
        await AsyncStorage.setItem(
          "endDateEquipmentPurchase-" + projectId,
          endDateEquipmentPurchase
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveTechnicalVisitNetworks = async () => {
    if (
      validateDates(
        startDateTechnicalVisitNetworks,
        endDateTechnicalVisitNetworks
      )
    ) {
      addTechnologyDocument(
        projectId,
        "Technical Visit Networks",
        startDateTechnicalVisitNetworks,
        endDateTechnicalVisitNetworks
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateTechnicalVisitNetworks,
        endDateTechnicalVisitNetworks
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateTechnicalVisitNetworks-" + projectId,
          startDateTechnicalVisitNetworks
        );
        await AsyncStorage.setItem(
          "endDateTechnicalVisitNetworks-" + projectId,
          endDateTechnicalVisitNetworks
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveInstallationCommunicationChannel = async () => {
    if (
      validateDates(
        startDateInstallationCommunicationChannel,
        endDateInstallationCommunicationChannel
      )
    ) {
      addTechnologyDocument(
        projectId,
        "Installation Communication channel",
        startDateInstallationCommunicationChannel,
        endDateInstallationCommunicationChannel
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateInstallationCommunicationChannel,
        endDateInstallationCommunicationChannel
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateInstallationCommunicationChannel-" + projectId,
          startDateInstallationCommunicationChannel
        );
        await AsyncStorage.setItem(
          "endDateInstallationCommunicationChannel-" + projectId,
          endDateInstallationCommunicationChannel
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveEquipmentInstallation = async () => {
    if (
      validateDates(
        startDateEquipmentInstallation,
        endDateEquipmentInstallation
      )
    ) {
      addTechnologyDocument(
        projectId,
        "Equipment Installation",
        startDateEquipmentInstallation,
        endDateEquipmentInstallation
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateEquipmentInstallation,
        endDateEquipmentInstallation
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateEquipmentInstallation-" + projectId,
          startDateEquipmentInstallation
        );
        await AsyncStorage.setItem(
          "endDateEquipmentInstallation-" + projectId,
          endDateEquipmentInstallation
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveTests = async () => {
    if (validateDates(startDateTests, endDateTests)) {
      addTechnologyDocument(projectId, "Tests", startDateTests, endDateTests);
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateTests,
        endDateTests
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateTests-" + projectId,
          startDateTests
        );
        await AsyncStorage.setItem("endDateTests-" + projectId, endDateTests);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveKeysAndUsers = async () => {
    if (validateDates(startDateKeysAndUsers, endDateKeysAndUsers)) {
      addTechnologyDocument(
        projectId,
        "Keys and Users",
        startDateKeysAndUsers,
        endDateKeysAndUsers
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateKeysAndUsers,
        endDateKeysAndUsers
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateKeysAndUsers-" + projectId,
          startDateKeysAndUsers
        );
        await AsyncStorage.setItem(
          "endDateKeysAndUsers-" + projectId,
          endDateKeysAndUsers
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Compra de Equipos</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateEquipmentPurchase}
          value={startDateEquipmentPurchase}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateEquipmentPurchase}
          value={endDateEquipmentPurchase}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveEquipmentPurchase}
        />

        <Text style={styles.title}>Visita Técnica Redes</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateTechnicalVisitNetworks}
          value={startDateTechnicalVisitNetworks}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateTechnicalVisitNetworks}
          value={endDateTechnicalVisitNetworks}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveTechnicalVisitNetworks}
        />

        <Text style={styles.title}>Instalación de Canal de Comunicación</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateInstallationCommunicationChannel}
          value={startDateInstallationCommunicationChannel}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateInstallationCommunicationChannel}
          value={endDateInstallationCommunicationChannel}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveInstallationCommunicationChannel}
        />

        <Text style={styles.title}>Instalación de Equipos</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateEquipmentInstallation}
          value={startDateEquipmentInstallation}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateEquipmentInstallation}
          value={endDateEquipmentInstallation}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveEquipmentInstallation}
        />

        <Text style={styles.title}>Pruebas</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateTests}
          value={startDateTests}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateTests}
          value={endDateTests}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveTests} />

        <Text style={styles.title}>Claves y Usuarios</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateKeysAndUsers}
          value={startDateKeysAndUsers}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateKeysAndUsers}
          value={endDateKeysAndUsers}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveKeysAndUsers} />
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
