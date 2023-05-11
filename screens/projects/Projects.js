import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "firebase/compat/app";
import { size } from "lodash";

import Loading from "../../components/Loading";
import { getMoreProjects, getProjects } from "../../utils/actions";
import ListProjects from "../../components/projects.js/ListProjects";

export default function Projects({ navigation }) {
  const [user, setUser] = useState(null);
  const [startProject, setStartProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  //cantidad de proyectos que apareceran en la pantalla
  const limitProjects = 20;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      async function getData() {
        setLoading(true);
        const response = await getProjects(limitProjects);
        if (response.statusResponse) {
          setStartProject(response.startProject);
          setProjects(response.projects);
        }
        setLoading(false);
      }
      getData();
    }, [])
  );

  const handleLoadMore = async () => {
    if (!startProject) {
      return;
    }

    setLoading(true);
    const response = await getMoreProjects(limitProjects, startProject);
    if (response.statusResponse) {
      setStartProject(response.startProject);
      setProjects([...projects, ...response.projects]);
    }
    setLoading(false);
  };

  if (user === null) {
    return <Loading isVisible={true} text="Cargando..." />;
  }

  return (
    <View style={styles.viewBody}>
      {size(projects) > 0 ? (
        <ListProjects
          projects={projects}
          navigation={navigation}
          setProjects={setProjects}
          handleLoadMore={handleLoadMore}
        />
      ) : (
        <View style={styles.notFoundView}>
          <Text style={styles.notFoundText}>No hay proyectos registrados.</Text>
        </View>
      )}
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#0464b4"
          reverse
          containerStyle={styles.btncontainer}
          onPress={() => navigation.navigate("add-project")}
        />
      )}
      <Loading isVisible={loading} text="Cargando Restaurante" />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  btncontainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
  },
  notFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
