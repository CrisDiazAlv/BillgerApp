import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import HomeScreen from "./screens/HomeScreen";
import AccountScreen from "./screens/AccountScreen";
import CategoriesOverviewScreen from "./screens/CategoriesOverviewScreen";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Bienvenido" }}
        ></Screen>
        <Screen
          name="Account"
          component={AccountScreen}
          options={{ title: "Cuentas" }}
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
