import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { post } from '../api/verbs'
import TextField from '../components/form/TextField'
import SubmitButton from '../components/form/SubmitButton'

export default function AccountFormScreen({ navigation }) {
  const nameField = useRef()
  const initialBalanceField = useRef()
  const accountNumberField = useRef()

  const [name, setName] = useState('')
  const [initialBalance, setInitialBalance] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [error, setError] = useState('')

  const save = async () => {
    setError('')
    let hasErrors = false
    if (!nameField.current.validate()) hasErrors = true
    if (!initialBalanceField.current.validate()) hasErrors = true
    if (!accountNumberField.current.validate()) hasErrors = true
    if (hasErrors) return

    try {
      const response = await post(
        '/account',
        JSON.stringify({ name, initialBalance: parseFloat(initialBalance), accountNumber })
      )

      if (!response.ok) throw new Error(response.status)
      navigation.navigate({ name: 'AccountSelector', params: { updateTime: new Date().toISOString() } })
    } catch (error) {
      console.error(`Could not save account: ${error}`)
      setError(`No se ha podido guardar la cuenta: ${error}`)
    }
  }

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextField ref={nameField} name="Nombre" required onChange={setName} value={name} />
      <TextField
        ref={initialBalanceField}
        keyboardType="numeric"
        numeric
        name="Balance inicial"
        onChange={setInitialBalance}
        value={initialBalance}
      />
      <TextField
        ref={accountNumberField}
        name="Número de cuenta"
        onChange={setAccountNumber}
        value={accountNumber}
        autoCapitalize="characters"
      />
      <SubmitButton title="Guardar" onPress={save} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
})
