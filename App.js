import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import HomeScreen from "./screens/HomeScreen";
import AccountSelectorScreen from "./screens/AccountSelectorScreen";
import AccountScreen from "./screens/AccountScreen";
import CategoriesOverviewScreen from "./screens/CategoriesOverviewScreen";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName="AccountSelector">
        <Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Bienvenido" }}
        ></Screen>
        <Screen
          name="AccountSelector"
          component={AccountSelectorScreen}
          options={{ title: "Cuentas" }}
        />
        <Screen
          name="Account"
          component={AccountScreen}
          options={{ title: "Cuenta" }}
        />
        <Screen
          name="Categories"
          component={CategoriesOverviewScreen}
          options={{ title: "Categorías" }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
