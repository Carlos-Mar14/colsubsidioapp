
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
  
  const navigation = useNavigation()

  return (
    <ScrollView
      centerContent
      style={styles.viewBody}
    >
        <Image
          source={require("../../assets/logoPrincipal.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.tittle}>Consulta tu perfil en Gestion de Proyectos Regional Norte</Text>
        <Text style={styles.descriptions}>Busca y visualiza el estado de los proyectos que tenemos en curso</Text>
        <Button
          buttonStyle={styles.button}
          title="Ir a tu perfil"
          onPress={() => navigation.navigate("login")}
        />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30
  },
  image: {
    height: 250,
    width: "100%",
    marginTop: 100,
    marginBottom: 10,
    textAlign: "center"
  },
  tittle: {
    fontWeight: "bold",
    fontSize: 19,
    marginTop: -50,
    textAlign: "center"
  },
  descriptions:{
    textAlign: "justify",
    marginBottom: 20,
    fontSize: 19,
    marginVertical: 100,
    color: "#0464b4",
    textAlign: "center",
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#0464b4"
  }
})