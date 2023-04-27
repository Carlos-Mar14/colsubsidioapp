import React, { useState, useEffect, useCallback} from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {Button} from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import Loading from '../../components/Loading'
import { getDocumentById } from '../../utils/actions'
import Contracting from './areas/Contracting'

export default function Project({ navigation, route: { params: { name, id } } }) {
    const [project, setProject] = useState(null)
    

  navigation.setOptions({ title: name })

  useFocusEffect(
    useCallback(() => {
        (async() => {
            const response = await getDocumentById("projects", id)
            if (response.statusResponse) {
                setProject(response.document)
            } else {
                setProject({})
                Alert.alert("Ocurrió un problema cargando el restaurante, intente más tarde.")
            }
        })()
    }, [])
)
  if (!project) {
    return <Loading isVisible={true} text="Cargando..."/>
  }

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.btnSquare} onPress={() => navigation.navigate('Contratación', { projectId: id })}>
          <Text style={styles.btnText}>Contratación</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSquare} onPress={() => navigation.navigate('Infraestructura', { projectId: id })}>
          <Text style={styles.btnText}>Infraestructura</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.btnSquare} onPress={() => navigation.navigate('Tecnología', { projectId: id })}>
          <Text style={styles.btnText}>Tecnología</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSquare} onPress={() => navigation.navigate('Talento Humano', { projectId: id })}>
          <Text style={styles.btnText}>Talento Humano</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.btnSquare} onPress={() => navigation.navigate('Servicios Administrativos', { projectId: id })}>
          <Text style={styles.btnText}>Servicios Administrativos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  btnSquare: {
    width: 150,
    height: 100,
    marginHorizontal: 10,
    marginVertical: -5,
    backgroundColor: '#044db4',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});