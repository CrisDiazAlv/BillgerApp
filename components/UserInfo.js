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
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.account}>{user.accountNumber}</Text>
          <Text style={styles.amount}>{user.currentBalance}€</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0891b2",
    padding: 12,
  },
  white: {
    color: "#fff",
  },
  username: {
    color: "#fff",
    fontSize: 18,
  },
  account: {
    color: "#fff",
    fontWeight: "bold",
  },
  amount: {
    color: "#fff",
    fontSize: 14,
  },
});
