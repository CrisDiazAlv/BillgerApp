import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function BillSection() {
  const [isLoading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    try {
      const response = await fetch("http://localhost:8080/bill/groupedByDate", {
        headers: new Headers({
          Authorization: "Basic Y3JpczEyMzpwYXNzd29yZA==",
        }),
      });
      const data = await response.json();
      setBills(data);
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
        <SectionList
          sections={bills.map((b) => ({ title: b.date, data: b.bills }))}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.amount} {item.category.name}
            </Text>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
