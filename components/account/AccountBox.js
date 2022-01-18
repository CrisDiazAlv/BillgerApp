import React from 'react'
import { Text, StyleSheet } from 'react-native'

import RandomColoredBox from '../ui/RandomColoredBox'

export default function AccountBox(props) {
  const getRandomColor = () => {
    const colors = ['#2b6777', '#5f2c3e', /*'#f2f2f2',*/ '#52ab98', /*'#f5cac2',*/ '#6db785', '#ef9273', '#de5499']
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const color = getRandomColor()

  return (
    <RandomColoredBox
      style={{ backgroundColor: color, ...props.style }}
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
      <Text style={styles.text}>{props.name}</Text>
      <Text style={styles.text}>{props.currentBalance}€</Text>
    </RandomColoredBox>
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
