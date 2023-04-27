import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'


export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async(array) =>{
    const response = { status: false, image: null}
    try {
        const resultPermissions = await ImagePicker.requestCameraPermissionsAsync(Permissions.CAMERA)
        if (resultPermissions.status === "denied") {
            Alert.alert("Debes otorgar permiso para acceder a tu galeria.")
            return response
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: array
        })
        if (result.canceled) {
            return response
        }
        response.status = true
        response.image = result.assets
    } catch (error) {
        // Manejar cualquier excepción aquí
        console.log("Error en loadImageFromGallery: ", error)
        response.status = false
        response.image = null
    }
    return response
}


export const fileToBlob = async(path) => {
    const file = await fetch(path)
    const blob = await file.blob()
    return blob
}