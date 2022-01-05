import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ColorPropType, FlatList, StyleSheet, Text, View } from 'react-native'

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
    <View style={styles.container}>
      <FlatList
        data={bills}
        renderItem={({ item }) => <CategorySummary summary={item} />}
        keyExtractor={(item, index) => index}
      />
    </View>
  )
}

function CategorySummary(props) {
  const circleColor = {
    circleColor: color => ({
      backgroundColor: color,
    }),
  }

  return (
    <View style={styles.separator}>
      <View style={styles.container}>
        <View style={styles.leftHalf}>
          <View style={styles.categoryInfo}>
            <Text style={styles.category}>{props.summary.category.name}</Text>
            <View
              style={StyleSheet.compose(
                styles.circle,
                StyleSheet.flatten([circleColor.circleColor(props.summary.category.color)])
              )}></View>
          </View>

          <Text style={styles.amount}>{props.summary.bills.length} Recibos</Text>
        </View>

        <View style={styles.rightHalf}>
          <Text style={styles.total}>{props.summary.total}€</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
  },
  container: {
    flexDirection: 'row',
    padding: 10,
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
