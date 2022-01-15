import React, { useRef, useState } from 'react'

import { post } from '../api/verbs'
import { Form, TextField, SubmitButton } from '../components/form'

export default function AccountFormScreen({ navigation }) {
  const nameField = useRef()
  const initialBalanceField = useRef()

  const [name, setName] = useState('')
  const [initialBalance, setInitialBalance] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [error, setError] = useState('')

  const save = async () => {
    setError('')
    let hasErrors = false
    if (!nameField.current.validate()) hasErrors = true
    if (!initialBalanceField.current.validate()) hasErrors = true
    if (hasErrors) return

    try {
      const body = JSON.stringify({ name, initialBalance: parseFloat(initialBalance), accountNumber })
      const response = await post('/account', body)
      if (!response.ok) throw new Error(response.status)

      navigation.navigate({ name: 'AccountSelector', params: { updateTime: new Date().toISOString() } })
    } catch (error) {
      console.error(`Could not save account: ${error}`)
      if (error.message === '401') navigation.navigate('Login')
      setError(`No se ha podido guardar la cuenta: ${error}`)
    }
  }

  return (
    <Form style={{ width: '90%' }} error={error}>
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
        name="Número de cuenta"
        onChange={setAccountNumber}
        value={accountNumber}
        autoCapitalize="characters"
      />
      <SubmitButton title="Guardar" onPress={save} />
    </Form>
  )
}
