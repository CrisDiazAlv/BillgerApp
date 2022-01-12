import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

import { get } from '../api/verbs'

export default function BillsByCategories() {
  const [isLoading, setLoading] = useState(true)
  const [bills, setBills] = useState([])

  useEffect(() => {
    getBills()
  }, [])

  const getBills = async () => {
    try {
      const response = await get('/bill/groupedByCategory')
      const data = await response.json()
      setBills(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={bills}
        renderItem={({ item }) => <CategorySummary summary={item} />}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}

function CategorySummary(props) {
  const backgroundColor = { backgroundColor: props.summary.category.color }

  return (
    <View style={styles.row}>
      <View style={styles.leftHalf}>
        <View style={styles.categoryInfo}>
          <Text style={styles.category}>{props.summary.category.name}</Text>
          <View style={[styles.circle, backgroundColor]}></View>
        </View>
        <Text style={styles.amount}>{props.summary.bills.length} Recibos</Text>
      </View>
      <View style={styles.rightHalf}>
        <Text style={styles.total}>{props.summary.total}€</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginVertical: 5,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#3f5efb',
    borderBottomWidth: 1,
  },
  rightHalf: {
    width: '50%',
    justifyContent: 'center',
  },
  leftHalf: {
    width: '50%',
  },
  total: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  amount: {
    fontSize: 12,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circle: {
    marginLeft: 10,
    height: 10,
    width: 10,
    borderRadius: 15,
    backgroundColor: 'black',
  },
})
