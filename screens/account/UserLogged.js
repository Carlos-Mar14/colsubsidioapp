import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import { closeSession, getCurrentUser } from "../../utils/actions";
import Loading from "../../components/Loading";
import InfoUser from "../../components/account/InfoUser";
import AccountOptions from "../../components/account/AccountOptions";

export default function UserLogged() {
  const toastRef = useRef();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(null);
  const [relodUser, setRelodUser] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser);
    setRelodUser(false);
  }, [relodUser]);

  return (
    <View style={styles.container}>
      {user && (
        <View>
          <InfoUser
            user={user}
            setLoading={setLoading}
            setLoadingText={setLoadingText}
          />
          <AccountOptions
            user={user}
            toastRef={toastRef}
            setRelodUser={setRelodUser}
          />
        </View>
      )}
      <Button
        title="Cerrar Sesión"
        buttonStyle={styles.btnCloseSesion}
        titleStyle={styles.btnCloseSesionTitle}
        onPress={() => {
          closeSession();
          navigation.navigate("projects");
        }}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9",
  },
  btnCloseSesion: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#0464b4",
    borderBottomWidth: 1,
    borderBottomColor: "#0464b4",
    paddingVertical: 10,
  },
  btnCloseSesionTitle: {
    color: "#0464b4",
  },
});
