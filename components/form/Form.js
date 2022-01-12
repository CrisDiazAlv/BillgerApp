import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Form({ children, error, style }) {
  return (
    <View style={[styles.container, style]}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
})
