import React, { useContext } from 'react'
import { TouchableWithoutFeedback, Text } from 'react-native'

import { AuthContext } from '../../AuthContext'

export default function ProfileIcon() {
  const { logOut } = useContext(AuthContext)

  return (
    <TouchableWithoutFeedback onPress={logOut}>
      <Text style={{ fontSize: 24 }}>👤</Text>
    </TouchableWithoutFeedback>
  )
}
