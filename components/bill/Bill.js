import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native'

export default function Bill(props) {
  const parseDate = value => {
    if (!value) return
    const date = new Date(value)
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.row} numberOfLines={1}>
        {props.description}
      </Text>
      <Text style={[styles.row, { textAlign: 'center' }]}>{props.amount}€</Text>
      <Text style={[styles.row, { textAlign: 'right' }]}>{parseDate(props.date)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#98c4ec',
    justifyContent: 'space-around',
  },
  row: {
    width: '33%',
  },
})
