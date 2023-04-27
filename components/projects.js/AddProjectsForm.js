import React, { useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { isEmpty } from 'lodash'
import { Button, Input } from 'react-native-elements'
import { addDocumentWithoutId } from '../../utils/actions'

export default function AddProjectsForm({ toastRef, setLoading, navigation}) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorCelog, setErrorCelog] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)

    const addProject= async() =>{
      if (!validForm()){
        return
      }

      setLoading(true)
      const project = {
        name: formData.name,
        celog: formData.celog,
        address: formData.address,
        description: formData.description,
        //createBy: getCurrentUser().uid
      }
      const responseAddDocument = await addDocumentWithoutId("projects", project)
      setLoading(false)

      if(!responseAddDocument.statusResponse) {
        toastRef.current.show("Error guardando proyecto, intenta más tarde.", 3000)
        return
      }

      navigation.navigate("projects")
    }

    const validForm = () =>{
      clearErrors()
      let isValid = true

      if (isEmpty(formData.name)){
        setErrorName("Debes ingresar el nombre de la sede.")
        isValid = false
      }

      if (isEmpty(formData.celog)){
        setErrorCelog("Debes ingresar el CELOG de la sede.")
        isValid = false
      }

      if (isEmpty(formData.address)){
        setErrorAddress("Debes ingresar la dirección de la sede.")
        isValid = false
      }

      if (isEmpty(formData.description)){
        setErrorDescription("Debes ingresar una descripción de la sede.")
        isValid = false
      }

      return isValid
    }

    const clearErrors = () =>{
      setErrorName(null)
      setErrorCelog(null)
      setErrorAddress(null)
      setErrorDescription(null)
    }

  return (
    <View style={styles.viewContainer}>
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorCelog={errorCelog}
        errorAddress={errorAddress}
        errorDescription={errorDescription}
      />
      <Button
        title="Crear Proyecto"
        onPress={addProject}
        buttonStyle={styles.btnAddProject}
      />
    </View>
  )
}



function FormAdd({ 
  formData, 
  setFormData, 
  errorName, 
  errorCelog, 
  errorAddress, 
  errorDescription
}) {

    const onChange= ( e, type ) =>{
      setFormData({ ...formData, [type] : e.nativeEvent.text })
    }
    return (
      <View style={styles.viewForm}>
        <Input
          placeholder="Digite el nombre de la sede"
          defaultValue={formData.name}
          onChange={(e) => onChange( e, "name" )}
          errorMessage={errorName}
        />
        <Input
          placeholder="CELOG"
          defaultValue={formData.celog}
          onChange={(e) => onChange( e, "celog" )}
          errorMessage={errorCelog}
        />
        <Input
          placeholder="Dirección y/o ciudad de la sede"
          defaultValue={formData.address}
          onChange={(e) => onChange( e, "address" )}
          errorMessage={errorAddress}
        /> 
        <Input
          placeholder="Descripción de la sede"
          multiline
          containerStyle={styles.textArea}
          defaultValue={formData.description}
          onChange={(e) => onChange( e, "description" )}
          errorMessage={errorDescription}
        /> 
      </View>
    )
}

const defaultFormValues = () => {
    return {
      name: "",
      celog: "",
      address: "",
      description: ""
    }
}

const styles = StyleSheet.create({
  viewContainer:{
    height: "100%"
  },
  viewForm:{
    marginHorizontal: 10,
    marginTop: 20
  },
  btnAddProject:{
    margin: 20,
    backgroundColor: "#0464b4"
  },
  textArea:{
    height:100,
    width:"100%"
  }
})