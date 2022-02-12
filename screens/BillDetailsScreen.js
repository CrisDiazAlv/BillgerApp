import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

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
      <View style={styles.bill}>
        <Text style={styles.description} numberOfLines={4}>
          {route.params.description}
        </Text>
        <View style={styles.details}>
          <Text style={styles.row}>{route.params.amount}€</Text>
          <Text style={styles.row}>{parseDate(route.params.date)}</Text>
        </View>
        {!!route.params.notes && (
          <View style={styles.notes}>
            <Text style={{ fontWeight: 'bold' }}>Notas:</Text>
            <Text numberOfLines={10}>{route.params.notes}</Text>
          </View>
        )}
      </View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </View>
      </TouchableWithoutFeedback>
      <DeleteBillModal visible={modalVisible} onCancel={() => setModalVisible(false)} onConfirm={() => deleteBill()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  bill: {
    padding: 20,
  },
  description: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    fontSize: 18,
  },
  notes: {
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 100,
    width: '45%',
    elevation: 4,
    paddingHorizontal: 20,
    backgroundColor: '#ba0001',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
})
