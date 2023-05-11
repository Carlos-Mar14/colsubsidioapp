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
import { addHumanTalentDocument } from "../../../utils/actions";

export default function HumanTalent({
  route: {
    params: { projectId },
  },
}) {
  console.log("ID del proyecto recibido:", projectId);
  const [startDateRecruitment, setStartDateRecruitment] = useState("");
  const [endDateRecruitment, setEndDateRecruitment] = useState("");
  const [startDatePlantCreation, setStartDatePlantCreation] = useState("");
  const [endDatePlantCreation, setEndDatePlantCreation] = useState("");
  const [startDateRecruitmentOfPersonnel, setStartDateRecruitmentOfPersonnel] =
    useState("");
  const [endDateRecruitmentOfPersonnel, setEndDateRecruitmentOfPersonnel] =
    useState("");
  const [
    startDateDeliveryOfNewWorkersEndowment,
    setStartDateDeliveryOfNewWorkersEndowment,
  ] = useState("");
  const [
    endDateDeliveryOfNewWorkersEndowment,
    setEndDateDeliveryOfNewWorkersEndowment,
  ] = useState("");
  const [startDateInductionAndTraining, setStartDateInductionAndTraining] =
    useState("");
  const [endDateInductionAndTraining, setEndDateInductionAndTraining] =
    useState("");

  useEffect(() => {
    // Recuperar las fechas almacenadas al iniciar la aplicación
    const getStoredDates = async () => {
      try {
        const storedStartDateRecruitment = await AsyncStorage.getItem(
          "startDateRecruitment-" + projectId
        );
        if (storedStartDateRecruitment) {
          setStartDateRecruitment(storedStartDateRecruitment);
        }
        const storedEndDateRecruitment = await AsyncStorage.getItem(
          "endDateRecruitment-" + projectId
        );
        if (storedEndDateRecruitment) {
          setEndDateRecruitment(storedEndDateRecruitment);
        }

        const storedStartDatePlantCreation = await AsyncStorage.getItem(
          "startDatePlantCreation-" + projectId
        );
        if (storedStartDatePlantCreation) {
          setStartDatePlantCreation(storedStartDatePlantCreation);
        }
        const storedEndDatePlantCreation = await AsyncStorage.getItem(
          "endDatePlantCreation-" + projectId
        );
        if (storedEndDatePlantCreation) {
          setEndDatePlantCreation(storedEndDatePlantCreation);
        }

        const storedStartDateRecruitmentOfPersonnel =
          await AsyncStorage.getItem(
            "startDateRecruitmentOfPersonnel-" + projectId
          );
        if (storedStartDateRecruitmentOfPersonnel) {
          setStartDateRecruitmentOfPersonnel(
            storedStartDateRecruitmentOfPersonnel
          );
        }
        const storedEndDateRecruitmentOfPersonnel = await AsyncStorage.getItem(
          "endDateRecruitmentOfPersonnel-" + projectId
        );
        if (storedEndDateRecruitmentOfPersonnel) {
          setEndDateRecruitmentOfPersonnel(storedEndDateRecruitmentOfPersonnel);
        }

        const storedStartDateDeliveryOfNewWorkersEndowment =
          await AsyncStorage.getItem(
            "startDateDeliveryOfNewWorkersEndowment-" + projectId
          );
        if (storedStartDateDeliveryOfNewWorkersEndowment) {
          setStartDateDeliveryOfNewWorkersEndowment(
            storedStartDateDeliveryOfNewWorkersEndowment
          );
        }
        const storedEndDateDeliveryOfNewWorkersEndowment =
          await AsyncStorage.getItem(
            "endDateDeliveryOfNewWorkersEndowment-" + projectId
          );
        if (storedEndDateDeliveryOfNewWorkersEndowment) {
          setEndDateDeliveryOfNewWorkersEndowment(
            storedEndDateDeliveryOfNewWorkersEndowment
          );
        }

        const storedStartDateInductionAndTraining = await AsyncStorage.getItem(
          "startDateInductionAndTraining-" + projectId
        );
        if (storedStartDateInductionAndTraining) {
          setStartDateInductionAndTraining(storedStartDateInductionAndTraining);
        }
        const storedEndDateInductionAndTraining = await AsyncStorage.getItem(
          "endDateInductionAndTraining-" + projectId
        );
        if (storedEndDateInductionAndTraining) {
          setEndDateInductionAndTraining(storedEndDateInductionAndTraining);
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

  const handleSaveRecruitment = async () => {
    if (validateDates(startDateRecruitment, endDateRecruitment)) {
      addHumanTalentDocument(
        projectId,
        "Recruitment",
        startDateRecruitment,
        endDateRecruitment
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateRecruitment,
        endDateRecruitment
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateRecruitment-" + projectId,
          startDateRecruitment
        );
        await AsyncStorage.setItem(
          "endDateRecruitment-" + projectId,
          endDateRecruitment
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSavePlantCreation = async () => {
    if (validateDates(startDatePlantCreation, endDatePlantCreation)) {
      addHumanTalentDocument(
        projectId,
        "Plant Creation",
        startDatePlantCreation,
        endDatePlantCreation
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDatePlantCreation,
        endDatePlantCreation
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDatePlantCreation-" + projectId,
          startDatePlantCreation
        );
        await AsyncStorage.setItem(
          "endDatePlantCreation-" + projectId,
          endDatePlantCreation
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveRecruitmentOfPersonnel = async () => {
    if (
      validateDates(
        startDateRecruitmentOfPersonnel,
        endDateRecruitmentOfPersonnel
      )
    ) {
      addHumanTalentDocument(
        projectId,
        "Recruitment Of Personnel",
        startDateRecruitmentOfPersonnel,
        endDateRecruitmentOfPersonnel
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateRecruitmentOfPersonnel,
        endDateRecruitmentOfPersonnel
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateRecruitmentOfPersonnel-" + projectId,
          startDateRecruitmentOfPersonnel
        );
        await AsyncStorage.setItem(
          "endDateRecruitmentOfPersonnel-" + projectId,
          endDateRecruitmentOfPersonnel
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveDeliveryOfNewWorkersEndowment = async () => {
    if (
      validateDates(
        startDateDeliveryOfNewWorkersEndowment,
        endDateDeliveryOfNewWorkersEndowment
      )
    ) {
      addHumanTalentDocument(
        projectId,
        "Delivery of New Worker's Endowment",
        startDateDeliveryOfNewWorkersEndowment,
        endDateDeliveryOfNewWorkersEndowment
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateDeliveryOfNewWorkersEndowment,
        endDateDeliveryOfNewWorkersEndowment
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateDeliveryOfNewWorkersEndowment-" + projectId,
          startDateDeliveryOfNewWorkersEndowment
        );
        await AsyncStorage.setItem(
          "endDateDeliveryOfNewWorkersEndowment-" + projectId,
          endDateDeliveryOfNewWorkersEndowment
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveInductionAndTraining = async () => {
    if (
      validateDates(startDateInductionAndTraining, endDateInductionAndTraining)
    ) {
      addHumanTalentDocument(
        projectId,
        "Induction and Training",
        startDateInductionAndTraining,
        endDateInductionAndTraining
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateInductionAndTraining,
        endDateInductionAndTraining
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateInductionAndTraining-" + projectId,
          startDateInductionAndTraining
        );
        await AsyncStorage.setItem(
          "endDateInductionAndTraining-" + projectId,
          endDateInductionAndTraining
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Reclutamiento</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateRecruitment}
          value={startDateRecruitment}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateRecruitment}
          value={endDateRecruitment}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveRecruitment} />

        <Text style={styles.title}>Creación de Planta</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDatePlantCreation}
          value={startDatePlantCreation}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDatePlantCreation}
          value={endDatePlantCreation}
        />
        <Button title="Guardar/Actualizar" onPress={handleSavePlantCreation} />

        <Text style={styles.title}>Contratación de Personal</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateRecruitmentOfPersonnel}
          value={startDateRecruitmentOfPersonnel}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateRecruitmentOfPersonnel}
          value={endDateRecruitmentOfPersonnel}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveRecruitmentOfPersonnel}
        />

        <Text style={styles.title}>Entrega Dotación Nuevos Trabajadores</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateDeliveryOfNewWorkersEndowment}
          value={startDateDeliveryOfNewWorkersEndowment}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateDeliveryOfNewWorkersEndowment}
          value={endDateDeliveryOfNewWorkersEndowment}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveDeliveryOfNewWorkersEndowment}
        />

        <Text style={styles.title}>Inducción y Formación</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateInductionAndTraining}
          value={startDateInductionAndTraining}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateInductionAndTraining}
          value={endDateInductionAndTraining}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveInductionAndTraining}
        />
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
