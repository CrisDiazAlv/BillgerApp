import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import Modal from '../ui/Modal'

export default function DeleteModal({ modalVisible, onConfirm }) {
  const [visible, setVisible] = useState(modalVisible)

  useEffect(() => {
    setVisible(modalVisible)
  }, [modalVisible])

  return (
    <Modal modalVisible={visible} onConfirm={onConfirm} onCancel={() => setVisible(false)}>
      <View style={styles.modalView}>
        <Text style={styles.text}>Está a punto de eliminar la cuenta, ¿está seguro?</Text>
        <View style={{ width: '80%', flexDirection: 'row', alignContent: 'flex-end' }}>
          <TouchableWithoutFeedback onPress={onConfirm}>
            <View style={[styles.button, styles.confirm]}>
              <Text style={styles.confirmation}>Confirmar</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => setVisible(false)}>
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
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 100,
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
