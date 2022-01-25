import React, { useCallBack, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { get } from '../api/verbs'

export default function BillsByCategories() {
  const [isLoading, setLoading] = useState(true)
  const [bills, setBills] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    getBills()
  }, [])

  const getBills = async () => {
    try {
      const response = await get('/bill/group/category')
      if (!response.ok) throw new Error(response.status)

      const data = await response.json()
      setBills(data)
      setLoading(false)
    } catch (error) {
      console.error(`Could not load bills: ${error}`)
    }
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <FlatList
      data={bills}
      renderItem={({ item }) => <CategorySummary summary={item} />}
      keyExtractor={(item, index) => index}
    />
  )
}

function CategorySummary(props) {
  const [isExpanded, setIsExpanded] = useState(false)

  const backgroundColor = { backgroundColor: props.summary.category.color }

  return (
    <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
      <View style={styles.container}>
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
        {isExpanded &&
          props.summary.bills.map(b => {
            return <Text>hola</Text>
          })}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#3f5efb',
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
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
    marginBottom: 10,
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
