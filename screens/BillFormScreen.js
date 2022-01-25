import React, { useRef, useState } from 'react'
import { ScrollView } from 'react-native'

import { post } from '../api/verbs'

import { Form, TextField, DateTimeField, CategoryPicker, Checkbox, SubmitButton } from '../components/form'

export default function BillFormScreen({ navigation, route }) {
  const amountField = useRef()
  const dateField = useRef()
  const descriptionField = useRef()

  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [paid, setPaid] = useState(true)
  const [description, setDescription] = useState('')
  const [notes, setNotes] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState('')

  const save = async () => {
    setError('')
    let hasErrors = false
    if (!amountField.current.validate()) hasErrors = true
    if (!dateField.current.validate()) hasErrors = true
    if (!descriptionField.current.validate()) hasErrors = true
    if (hasErrors) return

    try {
      const body = JSON.stringify({
        amount,
        date,
        description,
        notes,
        account: route.params.account,
        paid,
        category: 3,
      })
      const response = await post('/bill', body)
      if (!response.ok) throw new Error(response.status)

      navigation.goBack()
    } catch (error) {
      console.error(`Could not save category: ${error}`)
      if (error.message === '401') navigation.navigate('Login')
      setError(`No se ha podido guardar el recibo: ${error}`)
    }
  }

  return (
    <ScrollView>
      <Form style={{ width: '90%', marginVertical: 50 }} error={error}>
        <TextField
          ref={amountField}
          name="Cantidad"
          placeholder="150, 20, -25"
          required
          keyboardType="numeric"
          numeric
          value={amount}
          onChange={setAmount}
        />
        <DateTimeField ref={dateField} name="Fecha" required value={date} onChange={setDate} />
        <TextField ref={descriptionField} name="Concepto" required value={description} onChange={setDescription} />
        <TextField name="Notas" value={notes} onChange={setNotes} />
        <CategoryPicker name="Categoria" value={category} onChange={setCategory} />
        <Checkbox name="Pagado" value={paid} onChange={setPaid} />
        <SubmitButton title="Guardar" onPress={save} />
      </Form>
    </ScrollView>
  )
}
