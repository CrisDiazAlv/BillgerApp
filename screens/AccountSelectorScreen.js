import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'

import { get, deleteById } from '../api/verbs'

import AddButton from '../components/account/AddButton'
import AccountBox from '../components/account/AccountBox'
import DeleteModal from '../components/account/DeleteModal'

export default function AccountSelectorScreen({ navigation, route }) {
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [accountId, setAccountId] = useState()

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

  const deleteAccount = async id => {
    try {
      const response = await deleteById(`/account/${id}`)
      if (!response.ok) throw new Error(response.status)

      setIsLoading(false)
    } catch (error) {
      console.error(`Could not delete account: ${error}`)
      if (error.message === '401') navigation.navigate('Login')
      setHasError(true)
    }
    setModalVisible(false)
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
              onLongPress={() => {
                setAccountId(id)
                setModalVisible(true)
              }}
            />
          )
        })}

        <AddButton onPress={() => navigation.navigate('AccountForm')} />
        <DeleteModal modalVisible={modalVisible} onConfirm={() => deleteAccount(accountId)} />
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
})
