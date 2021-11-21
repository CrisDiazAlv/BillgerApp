import React from "react";
import { View } from "react-native";
import BillSection from "../components/BillSection";
import UserInfo from "../components/UserInfo";

export default function MainScreen() {
  return (
    <View>
      <UserInfo />
      <BillSection />
    </View>
  );
}
