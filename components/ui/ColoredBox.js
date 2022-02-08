import React from 'react'
import { TouchableOpacity } from 'react-native'

export default function ColoredBox({ color, children, style = {}, ...props }) {
  return (
    <TouchableOpacity style={[{ backgroundColor: color }, style]} {...props}>
      {children}
    </TouchableOpacity>
  )
}
