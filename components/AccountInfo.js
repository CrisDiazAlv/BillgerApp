import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { get } from '../api/verbs'

export default function AccountInfo() {
  const [account, setAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const response = await get('/account/4')
      if (!response.ok) throw new Error(response.status)

      const data = await response.json()
      setAccount(data)
      setIsLoading(false)
    } catch (error) {
      console.error(`Could not load account: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{account.name}</Text>
      <Text style={styles.account}>{account.accountNumber}</Text>
      <Text style={styles.amount}>{account.currentBalance}€</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f5efb',
    padding: 12,
  },
  white: {
    color: '#fff',
  },
  username: {
    color: '#fff',
    fontSize: 24,
  },
  account: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  amount: {
    color: '#fff',
    fontSize: 18,
  },
})
