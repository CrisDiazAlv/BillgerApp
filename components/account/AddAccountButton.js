import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ColoredBox from '../ui/ColoredBox'

export default function AddAccountButton({ onPress }) {
  return (
    <View style={styles.box}>
      <ColoredBox style={styles.circle} color="#3f5efb" onPress={onPress}>
        <Text style={[styles.text, { fontSize: 48 }]}>+</Text>
      </ColoredBox>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: '40%',
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
})
