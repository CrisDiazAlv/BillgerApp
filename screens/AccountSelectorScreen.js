import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'

import { get } from '../api/verbs'
import ColoredBox from '../components/ui/ColoredBox'
import AccountBox from '../components/account/AccountBox'

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
      if (error.message === '401') navigation.navigate('Login')
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <ScrollView>
      <View style={styles.container}>
        {accounts.map(a => {
          const { id, name, currentBalance } = a
          return (
            <AccountBox
              key={id}
              style={styles.box}
              name={name}
              currentBalance={currentBalance}
              onPress={() => navigation.navigate('AccountOverview', { name, account: id })}
              onLongPress={() => console.log('long presss')}
            />
          )
        })}
        <ColoredBox color="#3f5efb" style={styles.box} onPress={() => navigation.navigate('AccountForm')}>
          <Text style={[styles.text, { fontSize: 48 }]}>+</Text>
        </ColoredBox>
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
    elevation: 5,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: { width: 1, height: 1 },
  },
})
