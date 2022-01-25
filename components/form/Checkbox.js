import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ExpoCheckbox from 'expo-checkbox'

export default function Checkbox(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.name}</Text>
      <ExpoCheckbox
        style={{ marginTop: 10, marginLeft: 10 }}
        name={props.name}
        value={props.value}
        onValueChange={props.onChange}
        color={props.value ? '#3f5efb' : undefined}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    alignSelf: 'stretch',
  },
  label: {
    marginBottom: 5,
    marginLeft: 10,
    color: '#3f5efb',
  },
})
