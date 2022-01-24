import React from 'react'
import { Modal as ReactNativeModal, View, StyleSheet } from 'react-native'

export default function Modal({ visible, onCancel, children }) {
  return (
    <ReactNativeModal animationType="slide" transparent={true} visible={visible} onRequestClose={onCancel}>
      <View style={styles.modal}>{children}</View>
    </ReactNativeModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
})
