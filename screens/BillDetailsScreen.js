import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { AuthContext } from '../AuthContext'

import { deleteById } from '../api/verbs'

import DeleteBillModal from '../components/bill/DeleteBillModal'

export default function BillDetailsScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false)

  const { logOut } = useContext(AuthContext)

  const parseDate = value => {
    if (!value) return
    const date = new Date(value)
    return date.toLocaleDateString('es')
  }

  const deleteBill = async () => {
    try {
      const response = await deleteById(`/bill/${route.params.id}`)
      if (!response.ok) throw new Error(response.status)

      navigation.goBack()
    } catch (error) {
      console.error(`Could not delete bill: ${error}`)
      setModalVisible(false)
      if (error.message === '401') await logOut()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.row} numberOfLines={1}>
        {route.params.description}
      </Text>
      <Text style={[styles.row, { textAlign: 'center' }]}>{route.params.amount}€</Text>
      <Text style={[styles.row, { textAlign: 'center' }]}>{parseDate(route.params.date)}</Text>
      <Text onPress={() => setModalVisible(true)}>Eliminar</Text>
      <DeleteBillModal visible={modalVisible} onCancel={() => setModalVisible(false)} onConfirm={() => deleteBill()} />
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
    width: '20%',
  },
})
