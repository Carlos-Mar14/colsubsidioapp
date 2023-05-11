import { StyleSheet, View } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";
import { ActivityIndicator } from "react-native";

export default function Loading({ isVisible, Text }) {
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#0464b4" />
        {Text && <Text style={styles.text}>{Text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#ffff",
    borderColor: "#0464b4",
    borderWidth: 2,
    borderRadius: 15,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#0464b4",
    marginTop: 10,
  },
});
