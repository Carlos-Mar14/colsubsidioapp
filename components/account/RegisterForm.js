import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

import { validateEmail } from "../../utils/helpers";
import { registerUser } from "../../utils/actions";

export default function RegisterForm() {
  //Estado para mostrar u ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  //Estado para guardar la data del formulario de RegisterForm
  const [formData, setFormData] = useState(defaultFormValues);

  //Validaciones para cada campo
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  //Estado para la carga
  const [loading, setLoading] = useState(false);

  //Constante para usar la importanción de la navegación
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const doRegisterUser = async () => {
    if (!validateData()) {
      return;
    }

    setLoading(true);
    const result = await registerUser(formData.email, formData.password);
    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }
    navigation.navigate("account");
  };

  const validateData = () => {
    setErrorConfirm("");
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes de ingresar un email válido.");
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorPassword(
        "Debes ingresar una contraseña de al menos seis carácteres."
      );
      isValid = false;
    }

    if (size(formData.confirm) < 6) {
      setErrorConfirm(
        "Debes ingresar una confirmación de contraseña de al menos seis carácteres."
      );
      isValid = false;
    }

    if (formData.password !== formData.confirm) {
      setErrorPassword("La contraseña y la confirmación no son iguales.");
      setErrorConfirm("La contraseña y la confirmación no son iguales.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.form}>
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu email"
        onChange={(e) => onChange(e, "email")}
        keyboardType="email-address"
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Ingresa tu contraseña"
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            IconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        containerStyle={styles.input}
        placeholder="Confirma tu contraseña"
        password={true}
        secureTextEntry={!showPassword}
        onChange={(e) => onChange(e, "confirm")}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            IconStyle={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Registrar Nuevo Usuario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => doRegisterUser()}
      />
      <Loading isVisible={loading} text="Creando cuenta..." />
    </View>
  );
}

//Objetos para almacenar los datos del formulario
const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" };
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  input: {
    width: "100%",
  },
  btnContainer: {
    marginTop: 20,
    width: "85%",
  },
  btn: {
    backgroundColor: "#0464b4",
    marginLeft: 70,
    width: "70%",
  },
  icon: {
    color: "#c1c1c1",
  },
});
