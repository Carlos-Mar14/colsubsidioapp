// Imports de librerias externas
import React from "react";
import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

// Imports propios componentes
import AccountStack from "./AccountStack";
import ProjectsStack from "./ProjectsStack";

//Botton que permite la navegación
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const screenOptions = (route, color) => {
    let iconName;
    switch (route.name) {
      case "Proyectos":
        iconName = "home";
        break;
      case "search":
        iconName = "magnify";
        break;
      case "Cuentas":
        iconName = "account";
        break;
    }

    return (
      <Icon type="material-community" name={iconName} size={30} color={color} />
    );
  };

  return (
    //Componente para navegar entre las pantallas en el orden que se desea
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="projects"
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: "#0464b4",
          tabBarActiveTintColor: "#fcd304",
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="Proyectos"
          component={ProjectsStack}
          options={{ headerTitle: "Proyectos", headerShown: false }}
        />
        <Tab.Screen
          name="Cuentas"
          component={AccountStack}
          options={{ headerTitle: "Cuenta", headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
