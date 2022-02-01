import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import Modal from '../ui/Modal'

export default function DeleteModal({ visible, onCancel, onConfirm }) {
  return (
    <Modal visible={visible} onConfirm={onConfirm} onCancel={onCancel}>
      <View style={styles.modalView}>
        <Text style={styles.text}>Está a punto de eliminar la cuenta, ¿está seguro?</Text>
        <View style={styles.buttons}>
          <TouchableWithoutFeedback onPress={onConfirm}>
            <View style={[styles.button, styles.confirm]}>
              <Text style={styles.confirmation}>Confirmar</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onCancel}>
            <View style={[styles.button, styles.cancel]}>
              <Text style={styles.confirmation}>Cancelar</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    // margin: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 35,
    paddingHorizontal: 15,
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
  },
  buttons: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  confirm: {
    backgroundColor: '#3f5efb',
  },
  cancel: {
    backgroundColor: '#ba0001',
  },
  confirmation: {
    color: 'white',
    fontSize: 14,
  },
})
