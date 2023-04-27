import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-elements';
import { loadImageFromGallery } from '../../utils/helpers';

import { updateProfile, uploadImage } from '../../utils/actions';
import { initial, set } from 'lodash';

export default function InfoUser({ user, setLoading, setLoadingText }) {
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)

    const changePhoto = async() => {
        const result = await loadImageFromGallery([1, 1])
        if(!result.status){
            return
        }
        setLoadingText("Actualizando imagen....")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
        if (resultUploadImage.statusResponse) {
            setLoading(false)
            Alert.alert("error al almacenar la foto de perfil.")
            return
        }
        const resultUpdateProfile = await updateProfile({ photoUrl: resultUploadImage.url })
        setLoading(false)
        if (resultUpdateProfile.statusResponse) {
            setPhotoUrl(resultUploadImage.url)
        } else{
            Alert.alert("error al actualizar la de perfil.")
        }
    }
    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                //onPress={changePhoto}
                source={
                    photoUrl
                    ? {url: photoUrl}
                    : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName: "Anónimo"
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    infoUser:{
        marginLeft: 20
    },
    displayName:{
        fontWeight:"bold",
        paddingBottom: 5
    }
})