import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'

export default function AccountSelectorScreen({ navigation }) {
  const [accounts, setAccounts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(null)

  useEffect(() => {
    getAccounts()
  }, [])

  const getAccounts = async () => {
    try {
      const response = await fetch('http://localhost:8080/account', {
        headers: new Headers({
          Authorization: 'Basic Y3JpczEyMzpwYXNzd29yZA==',
        }),
      })
      if (!response.ok) {
        throw new Error('Not found')
      }
      const data = await response.json()
      setAccounts(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setHasError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRandomColor = () => {
    const colors = ['#2b6777', '#c8d8e4', '#f2f2f2', '#52ab98', '#f5cac2']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={styles.container}>
      {accounts.map(a => (
        <TouchableOpacity
          key={a.id}
          style={[styles.box, { backgroundColor: getRandomColor() }]}
          onPress={() => navigation.navigate('Categories')}>
          <Text style={[styles.center, styles.text]}>{a.name}</Text>
          <Text style={[styles.center, styles.text]}>{a.currentBalance} €</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.box, { backgroundColor: '#c8d8e4' }]}
        onPress={() => navigation.navigate('AccountForm')}>
        <Text style={[styles.plusIcon, styles.center]}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: 130,
    height: 130,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 20,
  },
  center: {
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  plusIcon: {
    fontSize: 36,
    color: '#2b6777',
  },
})
