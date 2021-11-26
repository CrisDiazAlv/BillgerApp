import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function BillsByCategories() {
  const [isLoading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/bill/groupedByCategory"
      );
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
        <FlatList
          data={bills}
          renderItem={({ item }) => <CategorySummary summary={item} />}
          keyExtractor={(item, index) => index}
        />
      )}
    </View>
  );
}

function CategorySummary(props) {
  return (
    <View style={styles.row}>
      <View style={styles.half}>
        <Text style={styles.item}>{props.summary.category.name}</Text>
        <Text style={styles.item}>{props.summary.bills.length}</Text>
      </View>

      <View style={styles.half}>
        <Text style={styles.item}>{props.summary.total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
  },
  row: {},

  half: {
    width: "50%",
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
