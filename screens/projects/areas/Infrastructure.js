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
import { addInfrastructureDocument } from "../../../utils/actions";

export default function Infrastructure({
  route: {
    params: { projectId },
  },
}) {
  console.log("ID del proyecto recibido:", projectId);
  const [startDateTechnicalVisit, setStartDateTechnicalVisit] = useState("");
  const [endDateTechnicalVisit, setEndDateTechnicalVisit] = useState("");
  const [
    startDateArchitecturalPlantDesign,
    setStartDateArchitecturalPlantDesign,
  ] = useState("");
  const [endDateArchitecturalPlantDesign, setEndDateArchitecturalPlantDesign] =
    useState("");
  const [startDateAirConditioningDesign, setStartDateAirConditioningDesign] =
    useState("");
  const [endDateAirConditioningDesign, setEndDateAirConditioningDesign] =
    useState("");
  const [startDateElectricalDesign, setStartDateElectricalDesign] =
    useState("");
  const [endDateElectricalDesign, setEndDateElectricalDesign] = useState("");
  const [startDateBudgets, setStartDateBudgets] = useState("");
  const [endDateBudgets, setEndDateBudgets] = useState("");
  const [startDatePurchaseOfEndowments, setStartDatePurchaseOfEndowments] =
    useState("");
  const [endDatePurchaseOfEndowments, setEndDatePurchaseOfEndowments] =
    useState("");
  const [startDateInvitationToQuote, setStartDateInvitationToQuote] =
    useState("");
  const [endDateInvitationToQuote, setEndDateInvitationToQuote] = useState("");
  const [startDateSupplierAssignment, setStartDateSupplierAssignment] =
    useState("");
  const [endDateSupplierAssignment, setEndDateSupplierAssignment] =
    useState("");
  const [startDateCivilWorks, setStartDateCivilWorks] = useState("");
  const [endDateCivilWorks, setEndDateCivilWorks] = useState("");
  const [startDateDeliveryToUES, setStartDateDeliveryToUES] = useState("");
  const [endDateDeliveryToUES, setEndDateDeliveryToUES] = useState("");
  const [startDateMTTOReceipt, setStartDateMTTOReceipt] = useState("");
  const [endDateMTTOReceipt, setEndDateMTTOReceipt] = useState("");
  const [
    startDateFirefightersCertificate,
    setStartDateFirefightersCertificate,
  ] = useState("");
  const [endDateFirefightersCertificate, setEndDateFirefightersCertificate] =
    useState("");
  const [startDatePgirasa, setStartDatePgirasa] = useState("");
  const [endDatePgirasa, setEndDatePgirasa] = useState("");

  useEffect(() => {
    // Recuperar las fechas almacenadas al iniciar la aplicación
    const getStoredDates = async () => {
      try {
        const storedStartDateTechnicalVisit = await AsyncStorage.getItem(
          "startDateTechnicalVisit-" + projectId
        );
        if (storedStartDateTechnicalVisit) {
          setStartDateTechnicalVisit(storedStartDateTechnicalVisit);
        }
        const storedEndDateTechnicalVisit = await AsyncStorage.getItem(
          "endDateTechnicalVisit-" + projectId
        );
        if (storedEndDateTechnicalVisit) {
          setEndDateTechnicalVisit(storedEndDateTechnicalVisit);
        }

        const storedStartDateArchitecturalPlantDesign =
          await AsyncStorage.getItem(
            "startDateArchitecturalPlantDesign-" + projectId
          );
        if (storedStartDateArchitecturalPlantDesign) {
          setStartDateArchitecturalPlantDesign(
            storedStartDateArchitecturalPlantDesign
          );
        }
        const storedEndDateArchitecturalPlantDesign =
          await AsyncStorage.getItem(
            "storedEndDateArchitecturalPlantDesign-" + projectId
          );
        if (storedEndDateArchitecturalPlantDesign) {
          setEndDateArchitecturalPlantDesign(
            storedEndDateArchitecturalPlantDesign
          );
        }

        const storedStartDateAirConditioningDesign = await AsyncStorage.getItem(
          "startDateAirConditioningDesign-" + projectId
        );
        if (storedStartDateAirConditioningDesign) {
          setStartDateAirConditioningDesign(
            storedStartDateAirConditioningDesign
          );
        }
        const storedEndDateAirConditioningDesign = await AsyncStorage.getItem(
          "endDateAirConditioningDesign-" + projectId
        );
        if (storedEndDateAirConditioningDesign) {
          setEndDateAirConditioningDesign(storedEndDateAirConditioningDesign);
        }

        const storedStartDateElectricalDesign = await AsyncStorage.getItem(
          "startDateElectricalDesign-" + projectId
        );
        if (storedStartDateElectricalDesign) {
          setStartDateElectricalDesign(storedStartDateElectricalDesign);
        }
        const storedEndDateElectricalDesign = await AsyncStorage.getItem(
          "endDateElectricalDesign-" + projectId
        );
        if (storedEndDateElectricalDesign) {
          setEndDateElectricalDesign(storedEndDateElectricalDesign);
        }

        const storedStartDateBudgets = await AsyncStorage.getItem(
          "startDateBudgets-" + projectId
        );
        if (storedStartDateBudgets) {
          setStartDateBudgets(storedStartDateBudgets);
        }
        const storedEndDateBudgets = await AsyncStorage.getItem(
          "endDateBudgets-" + projectId
        );
        if (storedEndDateBudgets) {
          setEndDateBudgets(storedEndDateBudgets);
        }

        const storedStartDatePurchaseOfEndowments = await AsyncStorage.getItem(
          "startDatePurchaseOfEndowments-" + projectId
        );
        if (storedStartDatePurchaseOfEndowments) {
          setStartDatePurchaseOfEndowments(storedStartDatePurchaseOfEndowments);
        }
        const storedEndDatePurchaseOfEndowments = await AsyncStorage.getItem(
          "endDatePurchaseOfEndowments-" + projectId
        );
        if (storedEndDatePurchaseOfEndowments) {
          setEndDatePurchaseOfEndowments(storedEndDatePurchaseOfEndowments);
        }

        const storedStartDateInvitationToQuote = await AsyncStorage.getItem(
          "startDateInvitationToQuote-" + projectId
        );
        if (storedStartDateInvitationToQuote) {
          setStartDateInvitationToQuote(storedStartDateInvitationToQuote);
        }
        const storedEndDateInvitationToQuote = await AsyncStorage.getItem(
          "endDateInvitationToQuote-" + projectId
        );
        if (storedEndDateInvitationToQuote) {
          setEndDateInvitationToQuote(storedEndDateInvitationToQuote);
        }

        const storedStartDateSupplierAssignment = await AsyncStorage.getItem(
          "startDateSupplierAssignment-" + projectId
        );
        if (storedStartDateSupplierAssignment) {
          setStartDateSupplierAssignment(storedStartDateSupplierAssignment);
        }
        const storedEndDateSupplierAssignment = await AsyncStorage.getItem(
          "endDateSupplierAssignment-" + projectId
        );
        if (storedEndDateSupplierAssignment) {
          setEndDateSupplierAssignment(storedEndDateSupplierAssignment);
        }

        const storedStartDateCivilWorks = await AsyncStorage.getItem(
          "startDateCivilWorks-" + projectId
        );
        if (storedStartDateCivilWorks) {
          setStartDateCivilWorks(storedStartDateCivilWorks);
        }
        const storedEndDateCivilWorks = await AsyncStorage.getItem(
          "endDateCivilWorks-" + projectId
        );
        if (storedEndDateCivilWorks) {
          setEndDateCivilWorks(storedEndDateCivilWorks);
        }

        const storedStartDateDeliveryToUES = await AsyncStorage.getItem(
          "startDateDeliveryToUES-" + projectId
        );
        if (storedStartDateDeliveryToUES) {
          setStartDateDeliveryToUES(storedStartDateDeliveryToUES);
        }
        const storedEndDateDeliveryToUES = await AsyncStorage.getItem(
          "endDateDeliveryToUES-" + projectId
        );
        if (storedEndDateDeliveryToUES) {
          setEndDateDeliveryToUES(storedEndDateDeliveryToUES);
        }

        const storedStartDateMTTOReceipt = await AsyncStorage.getItem(
          "startDateMTTOReceipt-" + projectId
        );
        if (storedStartDateMTTOReceipt) {
          setStartDateMTTOReceipt(storedStartDateMTTOReceipt);
        }
        const storedEndDateMTTOReceipt = await AsyncStorage.getItem(
          "endDateMTTOReceipt-" + projectId
        );
        if (storedEndDateMTTOReceipt) {
          setEndDateMTTOReceipt(storedEndDateMTTOReceipt);
        }

        const storedStartDateFirefightersCertificate =
          await AsyncStorage.getItem(
            "startDateFirefightersCertificate-" + projectId
          );
        if (storedStartDateFirefightersCertificate) {
          setStartDateFirefightersCertificate(
            storedStartDateFirefightersCertificate
          );
        }
        const storedEndDateFirefightersCertificate = await AsyncStorage.getItem(
          "endDateFirefightersCertificate-" + projectId
        );
        if (storedEndDateFirefightersCertificate) {
          setEndDateFirefightersCertificate(
            storedEndDateFirefightersCertificate
          );
        }

        const storedStartDatePgirasa = await AsyncStorage.getItem(
          "startDatePgirasa-" + projectId
        );
        if (storedStartDatePgirasa) {
          setStartDatePgirasa(storedStartDatePgirasa);
        }
        const storedEndDatePgirasa = await AsyncStorage.getItem(
          "endDatePgirasa-" + projectId
        );
        if (storedEndDatePgirasa) {
          setEndDatePgirasa(storedEndDatePgirasa);
        }
        // ... Agregar más código para recuperar las demás fechas almacenadas
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

  const handleSaveTechnicalVisit = async () => {
    if (validateDates(startDateTechnicalVisit, endDateTechnicalVisit)) {
      addInfrastructureDocument(
        projectId,
        "Technical visit",
        startDateTechnicalVisit,
        endDateTechnicalVisit
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateTechnicalVisit,
        endDateTechnicalVisit
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateTechnicalVisit-" + projectId,
          startDateTechnicalVisit
        );
        await AsyncStorage.setItem(
          "endDateTechnicalVisit-" + projectId,
          endDateTechnicalVisit
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveArchitecturalPlantDesign = async () => {
    if (
      validateDates(
        startDateArchitecturalPlantDesign,
        endDateArchitecturalPlantDesign
      )
    ) {
      addInfrastructureDocument(
        projectId,
        "Architectural plant design",
        startDateArchitecturalPlantDesign,
        endDateArchitecturalPlantDesign
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateArchitecturalPlantDesign,
        endDateArchitecturalPlantDesign
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateArchitecturalPlantDesign-" + projectId,
          startDateArchitecturalPlantDesign
        );
        await AsyncStorage.setItem(
          "endDateArchitecturalPlantDesign-" + projectId,
          endDateArchitecturalPlantDesign
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveAirConditioningDesign = async () => {
    if (
      validateDates(
        startDateAirConditioningDesign,
        endDateAirConditioningDesign
      )
    ) {
      addInfrastructureDocument(
        projectId,
        "Air conditioning design",
        startDateAirConditioningDesign,
        endDateAirConditioningDesign
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateAirConditioningDesign,
        endDateAirConditioningDesign
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateAirConditioningDesign-" + projectId,
          startDateAirConditioningDesign
        );
        await AsyncStorage.setItem(
          "endDateAirConditioningDesign-" + projectId,
          endDateAirConditioningDesign
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveElectricalDesign = async () => {
    if (validateDates(startDateElectricalDesign, endDateElectricalDesign)) {
      addInfrastructureDocument(
        projectId,
        "Electrical design",
        startDateElectricalDesign,
        endDateElectricalDesign
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateElectricalDesign,
        endDateElectricalDesign
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateElectricalDesign-" + projectId,
          startDateElectricalDesign
        );
        await AsyncStorage.setItem(
          "endDateElectricalDesign-" + projectId,
          endDateElectricalDesign
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveBudgets = async () => {
    if (validateDates(startDateBudgets, endDateBudgets)) {
      addInfrastructureDocument(
        projectId,
        "Budgets",
        startDateBudgets,
        endDateBudgets
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateBudgets,
        endDateBudgets
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateBudgets-" + projectId,
          startDateBudgets
        );
        await AsyncStorage.setItem(
          "endDateBudgets-" + projectId,
          endDateBudgets
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSavePurchaseOfEndowments = async () => {
    if (
      validateDates(startDatePurchaseOfEndowments, endDatePurchaseOfEndowments)
    ) {
      addInfrastructureDocument(
        projectId,
        "Purchase of endowments",
        startDatePurchaseOfEndowments,
        endDatePurchaseOfEndowments
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDatePurchaseOfEndowments,
        endDatePurchaseOfEndowments
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDatePurchaseOfEndowments-" + projectId,
          startDatePurchaseOfEndowments
        );
        await AsyncStorage.setItem(
          "endDatePurchaseOfEndowments-" + projectId,
          endDatePurchaseOfEndowments
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveInvitationToQuote = async () => {
    if (validateDates(startDateInvitationToQuote, endDateInvitationToQuote)) {
      addInfrastructureDocument(
        projectId,
        "Invitation to quote",
        startDateInvitationToQuote,
        endDateInvitationToQuote
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateInvitationToQuote,
        endDateInvitationToQuote
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateInvitationToQuote-" + projectId,
          startDateInvitationToQuote
        );
        await AsyncStorage.setItem(
          "endDateInvitationToQuote-" + projectId,
          endDateInvitationToQuote
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveSupplierAssignment = async () => {
    if (validateDates(startDateSupplierAssignment, endDateSupplierAssignment)) {
      addInfrastructureDocument(
        projectId,
        "Supplier assignment",
        startDateSupplierAssignment,
        endDateSupplierAssignment
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateSupplierAssignment,
        endDateSupplierAssignment
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateSupplierAssignment-" + projectId,
          startDateSupplierAssignment
        );
        await AsyncStorage.setItem(
          "endDateSupplierAssignment-" + projectId,
          endDateSupplierAssignment
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSaveCivilWorks = async () => {
    if (validateDates(startDateCivilWorks, endDateCivilWorks)) {
      addInfrastructureDocument(
        projectId,
        "Civil works",
        startDateCivilWorks,
        endDateCivilWorks
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateCivilWorks,
        endDateCivilWorks
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateCivilWorks-" + projectId,
          startDateCivilWorks
        );
        await AsyncStorage.setItem(
          "endDateCivilWorks-" + projectId,
          endDateCivilWorks
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveDeliveryToUES = async () => {
    if (validateDates(startDateDeliveryToUES, endDateDeliveryToUES)) {
      addInfrastructureDocument(
        projectId,
        "Delivery to UES",
        startDateDeliveryToUES,
        endDateDeliveryToUES
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateDeliveryToUES,
        endDateDeliveryToUES
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateDeliveryToUES-" + projectId,
          startDateDeliveryToUES
        );
        await AsyncStorage.setItem(
          "endDateDeliveryToUES-" + projectId,
          endDateDeliveryToUES
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveMTTOReceipt = async () => {
    if (validateDates(startDateMTTOReceipt, endDateMTTOReceipt)) {
      addInfrastructureDocument(
        projectId,
        "MTTO receipt",
        startDateMTTOReceipt,
        endDateMTTOReceipt
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateMTTOReceipt,
        endDateMTTOReceipt
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateMTTOReceipt-" + projectId,
          startDateMTTOReceipt
        );
        await AsyncStorage.setItem(
          "endDateMTTOReceipt-" + projectId,
          endDateMTTOReceipt
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveFirefightersCertificate = async () => {
    if (
      validateDates(
        startDateFirefightersCertificate,
        endDateFirefightersCertificate
      )
    ) {
      addInfrastructureDocument(
        projectId,
        "Firefighters certificate",
        startDateFirefightersCertificate,
        endDateFirefightersCertificate
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDateFirefightersCertificate,
        endDateFirefightersCertificate
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDateFirefightersCertificate-" + projectId,
          startDateFirefightersCertificate
        );
        await AsyncStorage.setItem(
          "endDateFirefightersCertificate-" + projectId,
          endDateFirefightersCertificate
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSavePgirasa = async () => {
    if (validateDates(startDatePgirasa, endDatePgirasa)) {
      addInfrastructureDocument(
        projectId,
        "Pgirasa",
        startDatePgirasa,
        endDatePgirasa
      );
      console.log(
        "Datos enviados a la DB:",
        projectId,
        startDatePgirasa,
        endDatePgirasa
      );

      // Mostrar mensaje de confirmación
      Alert.alert(
        "Datos guardados",
        "Los datos se han guardado correctamente en la base de datos."
      );

      // Almacenar las fechas en el dispositivo del usuario
      try {
        await AsyncStorage.setItem(
          "startDatePgirasa-" + projectId,
          startDatePgirasa
        );
        await AsyncStorage.setItem(
          "endDatePgirasa-" + projectId,
          endDatePgirasa
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Visita Técnica</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateTechnicalVisit}
          value={startDateTechnicalVisit}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateTechnicalVisit}
          value={endDateTechnicalVisit}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveTechnicalVisit} />

        <Text style={styles.title}>Diseño de Planta Arquitectónica</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateArchitecturalPlantDesign}
          value={startDateArchitecturalPlantDesign}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateArchitecturalPlantDesign}
          value={endDateArchitecturalPlantDesign}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveArchitecturalPlantDesign}
        />

        <Text style={styles.title}>Diseño de Aires Acondicionados</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateAirConditioningDesign}
          value={startDateAirConditioningDesign}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateAirConditioningDesign}
          value={endDateAirConditioningDesign}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveAirConditioningDesign}
        />

        <Text style={styles.title}>Diseño Eléctrico</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateElectricalDesign}
          value={startDateElectricalDesign}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateElectricalDesign}
          value={endDateElectricalDesign}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveElectricalDesign}
        />

        <Text style={styles.title}>Presupuestos</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateBudgets}
          value={startDateBudgets}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateBudgets}
          value={endDateBudgets}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveBudgets} />

        <Text style={styles.title}>Compra de Dotaciones</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDatePurchaseOfEndowments}
          value={startDatePurchaseOfEndowments}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDatePurchaseOfEndowments}
          value={endDatePurchaseOfEndowments}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSavePurchaseOfEndowments}
        />

        <Text style={styles.title}>Invitación a Cotizar</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateInvitationToQuote}
          value={startDateInvitationToQuote}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateInvitationToQuote}
          value={endDateInvitationToQuote}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveInvitationToQuote}
        />

        <Text style={styles.title}>Asignación de Proveedor</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateSupplierAssignment}
          value={startDateSupplierAssignment}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateSupplierAssignment}
          value={endDateSupplierAssignment}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveSupplierAssignment}
        />

        <Text style={styles.title}>Obras Civil</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateCivilWorks}
          value={startDateCivilWorks}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateCivilWorks}
          value={endDateCivilWorks}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveCivilWorks} />

        <Text style={styles.title}>Entrega a La UES</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateDeliveryToUES}
          value={startDateDeliveryToUES}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateDeliveryToUES}
          value={endDateDeliveryToUES}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveDeliveryToUES} />

        <Text style={styles.title}>Recibo MTTO</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateMTTOReceipt}
          value={startDateMTTOReceipt}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateMTTOReceipt}
          value={endDateMTTOReceipt}
        />
        <Button title="Guardar/Actualizar" onPress={handleSaveMTTOReceipt} />

        <Text style={styles.title}>Certificado de Bomberos</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDateFirefightersCertificate}
          value={startDateFirefightersCertificate}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDateFirefightersCertificate}
          value={endDateFirefightersCertificate}
        />
        <Button
          title="Guardar/Actualizar"
          onPress={handleSaveFirefightersCertificate}
        />

        <Text style={styles.title}>PGIRASA</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha de inicio (DD/MM/YYYY)"
          onChangeText={setStartDatePgirasa}
          value={startDatePgirasa}
        />
        <TextInput
          style={styles.input}
          placeholder="Fecha de fin (DD/MM/YYYY)"
          onChangeText={setEndDatePgirasa}
          value={endDatePgirasa}
        />
        <Button title="Guardar/Actualizar" onPress={handleSavePgirasa} />
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
