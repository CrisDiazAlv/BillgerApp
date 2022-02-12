import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import Modal from '../ui/Modal'

export default function LogOutModal({ visible, onCancel, onConfirm }) {
  return (
    <Modal visible={visible} onConfirm={onConfirm} onCancel={onCancel}>
      <View style={styles.modalView}>
        <TouchableWithoutFeedback onPress={onConfirm}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.close} onPress={onCancel}>
          Cerrar
        </Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 35,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 100,
    elevation: 4,
    paddingHorizontal: 20,
    backgroundColor: '#ba0001',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  close: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
})
