import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function UserInfo() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:8080/account/4");
      const data = await response.json();
      setUser(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>{user.name}</Text>
          <Text>{user.accountNumber}</Text>
          <Text>{user.currentBalance}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
