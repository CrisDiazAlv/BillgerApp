import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function Bill(props) {
  const navigation = useNavigation()

  const parseDate = value => {
    if (!value) return
    const date = new Date(value)
    return date.toLocaleDateString('es')
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('BillDetails', { ...props })}>
      <Text style={styles.row} numberOfLines={1}>
        {props.description}
      </Text>
      <Text style={[styles.row, { textAlign: 'center' }]}>{props.amount}€</Text>
      <Text style={[styles.row, { textAlign: 'right' }]}>{parseDate(props.date)}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    borderBottomColor: '#3f5efb',
    borderBottomWidth: 1,
  },
  row: {
    width: '33%',
  },
})
