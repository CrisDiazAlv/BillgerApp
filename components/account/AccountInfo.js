import React, { useCallback, useContext, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import { AuthContext } from '../../AuthContext'

import { get } from '../../api/verbs'

export default function AccountInfo({ id }) {
  const [account, setAccount] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const { logOut } = useContext(AuthContext)

  useFocusEffect(
    useCallback(() => {
      getUserInfo()
    }, [])
  )

  const getUserInfo = async () => {
    try {
      const response = await get(`/account/${id}`)
      if (!response.ok) throw new Error(response.status)

      const data = await response.json()
      setAccount(data)
      setIsLoading(false)
    } catch (error) {
      console.error(`Could not load account: ${error}`)
      if (error.message === '401') await logOut()
    }
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <View style={styles.container}>
      <Text style={[styles.username, styles.text]}>{account.name}</Text>
      <Text style={[styles.account, styles.text]}>{account.accountNumber}</Text>
      <Text style={[styles.amount, styles.text]}>{account.currentBalance}€</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f5efb',
    padding: 20,
  },
  text: {
    color: '#fff',
    marginBottom: 5,
  },
  username: {
    fontSize: 24,
  },
  account: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  amount: {
    fontSize: 18,
  },
})
