import React, { useRef, useContext, useState } from 'react'

import { AuthContext } from '../AuthContext'

import { post } from '../api/verbs'

import { Form, TextField, SubmitButton } from '../components/form'

export default function CategoryFormScreen({ navigation }) {
  const nameField = useRef()
  const colorField = useRef()

  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const { logOut } = useContext(AuthContext)

  const save = async () => {
    setError('')
    let hasErrors = false
    if (!nameField.current.validate()) hasErrors = true
    if (!colorField.current.validate()) hasErrors = true
    if (hasErrors) return

    try {
      const response = await post('/category', JSON.stringify({ name, color, description }))
      if (!response.ok) throw new Error(response.status)

      navigation.goBack()
    } catch (error) {
      console.error(`Could not save category: ${error}`)
      setError(`No se ha podido guardar la categoría: ${error}`)
      if (error.message === '401') await logOut()
    }
  }

  return (
    <Form style={{ width: '90%' }} error={error}>
      <TextField ref={nameField} name="Nombre" required value={name} onChange={setName} />
      <TextField
        ref={colorField}
        name="Color"
        required
        placeholder="#34af41, green, rgb(255,0,0)"
        value={color}
        autoCapitalize="none"
        onChange={setColor}
      />
      <TextField name="Descripción" value={description} onChange={setDescription} />

      <SubmitButton title="Guardar" onPress={save} />
    </Form>
  )
}
