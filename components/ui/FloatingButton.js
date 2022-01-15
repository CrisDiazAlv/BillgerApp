import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

export default function FloatingButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#3f5efb',
    borderRadius: 100,
  },
})
