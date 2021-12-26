import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

export default function AccountSelectorScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState(null);
  const [hasError, setHasError] = useState(null);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    try {
      const response = await fetch("http://localhost:8080/account", {
        headers: new Headers({
          Authorization: "Basic Y3JpczEyMzpwYXNzd29yZA==",
        }),
      });
      const data = await response.json();
      setAccounts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setHasError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      {accounts.map((a) => (
        <TouchableOpacity
          style={styles.account}
          onPress={() => navigation.navigate("Categories")}
        >
          <Text style={styles.textAccount}>{a.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.newAccount}>
        <Text style={styles.plusIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
  },
  account: {
    width: 150,
    height: 150,
    alignContent: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    margin: 20,
  },
  textAccount: {
    textAlign: "center",
  },
  newAccount: {
    width: 150,
    height: 150,
    alignContent: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    margin: 20,
  },
  plusIcon: {
    fontSize: 36,
    textAlign: "center",
  },
});
