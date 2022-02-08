import React from 'react'
import { Text, StyleSheet } from 'react-native'

import ColoredBox from '../ui/ColoredBox'

export default function AccountBox(props) {
  return (
    <ColoredBox style={props.style} color={props.account.color} onPress={props.onPress} onLongPress={props.onLongPress}>
      <Text style={[styles.text, { fontWeight: 'bold' }]}>{props.account.name}</Text>
      <Text style={styles.text}>{props.account.currentBalance}€</Text>
    </ColoredBox>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
})
