import React, { useCallback, useContext, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native'

import { useFocusEffect } from '@react-navigation/native'

import { AuthContext } from '../AuthContext'

import { get, deleteById } from '../api/verbs'

import AccountBox from '../components/account/AccountBox'
import AddAccountButton from '../components/account/AddAccountButton'
import DeleteAccountModal from '../components/account/DeleteAccountModal'

export default function AccountSelectorScreen({ navigation }) {
  const [accounts, setAccounts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [accountId, setAccountId] = useState()

  const { logOut } = useContext(AuthContext)

  useFocusEffect(
    useCallback(() => {
      getAccounts()
    }, [])
  )

  const getAccounts = async () => {
    try {
      const response = await get('/account')
      if (!response.ok) throw new Error(response.status)

      const data = await response.json()
      setAccounts(data)
      setIsLoading(false)
    } catch (error) {
      console.error(`Could not load accounts: ${error}`)
      if (error.message === '401') await logOut()
    }
  }

  const deleteAccount = async id => {
    try {
      const response = await deleteById(`/account/${id}`)
      if (!response.ok) throw new Error(response.status)

      setAccounts(accounts.filter(a => a.id !== id))
    } catch (error) {
      console.error(`Could not delete account: ${error}`)
      if (error.message === '401') await logOut()
    } finally {
      setModalVisible(false)
    }
  }

  if (isLoading) return <ActivityIndicator />

  return (
    <ScrollView>
      <View style={styles.container}>
        {accounts.map(a => {
          return (
            <AccountBox
              key={a.id}
              style={styles.box}
              account={a}
              onPress={() => navigation.navigate('AccountOverview', { name: a.name, account: a.id })}
              onLongPress={() => {
                setAccountId(a.id)
                setModalVisible(true)
              }}
            />
          )
        })}

        <AddAccountButton onPress={() => navigation.navigate('AccountForm')} />
        <DeleteAccountModal
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onConfirm={() => deleteAccount(accountId)}
        />
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
    paddingVertical: 60,
    elevation: 5,
    borderRadius: 10,
  },
})
