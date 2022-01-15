import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'

import { get } from '../api/verbs'

export default function AccountSelectorScreen({ navigation, route }) {
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    getAccounts()
  }, [route.params?.updateTime])

  const getAccounts = async () => {
    try {
      const response = await get('/account')
      if (!response.ok) throw new Error(response.status)

      const data = await response.json()
      setAccounts(data)
      setIsLoading(false)
    } catch (error) {
      console.error(`Could not load accounts: ${error}`)
      if (error.message === '401') {
        navigation.navigate('Login')
      }
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const getRandomColor = () => {
    const colors = ['#2b6777', '#5f2c3e', /*'#f2f2f2',*/ '#52ab98', /*'#f5cac2',*/ '#6db785', '#ef9273', '#de5499']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <ScrollView>
      <View style={styles.container}>
        {accounts.map(a => (
          <TouchableOpacity
            key={a.id}
            style={[styles.box, { backgroundColor: getRandomColor() }]}
            onPress={() => navigation.navigate('AccountOverview', { name: a.name, account: a.id })}>
            <Text style={[styles.center, styles.text]}>{a.name}</Text>
            <Text style={[styles.center, styles.text]}>{a.currentBalance} €</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.box, { backgroundColor: '#f0a04b' }]}
          onPress={() => navigation.navigate('AccountForm')}>
          <Text style={[styles.center, styles.text, { fontSize: 48 }]}>+</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '40%',
    margin: '5%',
    paddingVertical: 50,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  center: {
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: { width: 1, height: 1 },
  },
})
