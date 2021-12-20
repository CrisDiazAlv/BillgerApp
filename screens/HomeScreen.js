import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Ir a cuentas"
        onPress={() => navigation.navigate("Account")}
      ></Button>
      <Button
        title="Ir a categorías"
        onPress={() => navigation.navigate("Categories")}
      ></Button>
    </View>
  );
}
