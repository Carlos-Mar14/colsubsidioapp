import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import RegisterForm from "../../components/account/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Register() {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Image
        source={require("../../assets/logoPrincipal.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <RegisterForm />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 140,
    width: "60%",
    marginBottom: 10,
    marginLeft: 70,
  },
});
