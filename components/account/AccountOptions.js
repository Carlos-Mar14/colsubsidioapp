import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { map } from "lodash";
import { Icon, ListItem } from "react-native-elements";

import Modal from "../Modal";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions({ user, toastRef, setRelodUser }) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);

  const generateOptions = () => {
    return [
      {
        title: "Cambiar Nombres y Apellidos",
        iconNameLeft: "account-circle",
        iconColorLeft: "#0464b4",
        iconNameRight: "chevron-right",
        iconColorRight: "#0464b4",
        onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Cambiar Email",
        iconNameLeft: "at",
        iconColorLeft: "#0464b4",
        iconNameRight: "chevron-right",
        iconColorRight: "#0464b4",
        onPress: () => selectedComponent("email"),
      },
      {
        title: "Cambiar Contraseña",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#0464b4",
        iconNameRight: "chevron-right",
        iconColorRight: "#0464b4",
        onPress: () => selectedComponent("password"),
      },
    ];
  };

  const selectedComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderComponent(
          <ChangeDisplayNameForm
            displayName={user.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setRelodUser={setRelodUser}
          />
        );
        break;
      case "email":
        setRenderComponent(
          <ChangeEmailForm
            email={user.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setRelodUser={setRelodUser}
          />
        );
        break;
      case "password":
        setRenderComponent(
          <ChangePasswordForm setShowModal={setShowModal} toastRef={toastRef} />
        );
        break;
    }
    setShowModal(true);
  };

  const menuOptions = generateOptions();

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} style={styles.menuItem} onPress={menu.onPress}>
          <Icon
            type="material-community"
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type="material-community"
            name={menu.iconNameRight}
            color={menu.iconColorRight}
          />
        </ListItem>
      ))}
      <Modal isVisible={showModal} setVisible={setShowModal}>
        {renderComponent}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#0464b4",
  },
});
