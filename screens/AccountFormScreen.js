import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Button } from 'react-native'

export default function AccountFormScreen({ navigation }) {
  const [name, setName] = useState('')
  const [initialBalance, setInitialBalance] = useState('')
  const [accountNumber, setAccountNumber] = useState('')

  const save = async () => {
    try {
      const response = await fetch('http://localhost:8080/account', {
        method: 'POST',
        headers: new Headers({
          Authorization: 'Basic Y3JpczEyMzpwYXNzd29yZA==',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ name, initialBalance, accountNumber }),
      })
      if (!response.ok) {
        throw new Error('Error Saving')
      }
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Balance inicial" onChangeText={setInitialBalance} />
      <TextInput style={styles.input} placeholder="Número de cuenta" onChangeText={setAccountNumber} />
      <Button style={styles.button} title="Guardar" onPress={save} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 40,
    paddingHorizontal: 5,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  button: {
    borderRadius: 10,
  },
})
