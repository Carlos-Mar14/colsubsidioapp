import React, { useState } from 'react'
import { size } from 'lodash'
import { Avatar, Icon } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { deleteProjectFromDatabase } from '../../utils/actions';

export default function ListProjects({ projects, setProjects, navigation, handleLoadMore }) {
  return (
    <View>
        <FlatList
            data={projects}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={handleLoadMore}
            renderItem={(project) => (
                <Project project={project} navigation={navigation} setProjects={setProjects} projects={projects}/>
            )}
        />
    </View>
  )
}

function Project({ project, navigation, setProjects, projects }) {
    const { id, name,celog, address, description } = project.item
    const [photoUrl, setPhotoUrl] = useState(photoUrl)

    const goProject = () => {
        navigation.navigate("project", { celog ,name, id })
    }
    const deleteProject = () => {
        Alert.alert(
            "Eliminar proyecto",
            "¿Estás seguro de que quieres eliminar este proyecto?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: async () => {
                      // Elimina el proyecto de la base de datos
                      const response = await deleteProjectFromDatabase(id);
                      if (response.statusResponse) {
                        // Elimina el proyecto de la lista
                        const newProjects = projects.filter((p) => p.id !== id);
                        // Actualiza la lista
                        setProjects(newProjects);
                      } else {
                        console.log(response.error);
                      }
                    },
                  },
                ],
                { cancelable: false }
              );
            };
    return (
        <TouchableOpacity onPress={goProject}>
            <View style={styles.viewProjects}>
                <View style={styles.viewProjectAvatar}>
                    <Avatar
                        style={styles.avatarProject}
                        rounded
                        sizeMode="cover"
                        source={
                            photoUrl
                            ? {url: photoUrl}
                            : require("../../assets/avatar-default1.jpg")
                        }
                    />
                </View>
                <View>
                    <Text style={[styles.projectTitle, { maxWidth: 200 }]} numberOfLines={1} ellipsizeMode="tail">
                        {name}
                    </Text>
                    <Text style={styles.projectInformation}>{celog}</Text>
                    <Text style={styles.projectInformation}>{address}</Text>
                    <Text style={styles.projectDescription}>
                        {size(description) > 0 ? `${description.substr(0, 60)}...` : description}
                    </Text>
                </View>
                {/* Agrega el botón de eliminación */}
                <TouchableOpacity style={styles.deleteButton} onPress={deleteProject}>
                    <Icon name="delete" size={30} color="#900" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewProjects:{
        flexDirection: "row",
        margin:10
    },
    viewProjectAvatar:{
        margin: 15
    },
    avatarProject:{
        width:70,
        height:70
    },
    projectTitle:{
        fontWeight: "bold"
    },
    projectInformation:{
        paddingTop:2,
        color:"grey"
    },
    projectDescription:{
        paddingTop: 2,
        color:"grey",
        width:"75%"
    },
    // deleteButton: {
    //     width: 50,
    //     alignItems: 'flex-end',
    // }
})