import React from "react";
import MainScreen from "./screens/MainScreen";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <MainScreen />
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
