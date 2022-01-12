import React, { useState, useRef } from 'react'
import { Text, StyleSheet } from 'react-native'

import { login } from '../api/verbs'

import { Form, TextField, SubmitButton } from '../components/form'

export default function LoginScreen({ navigation }) {
  const usernameField = useRef()
  const [username, setUsername] = useState('')
  const passwordField = useRef()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const logIn = async () => {
    setError('')
    let hasErrors = false
    if (!usernameField.current.validate()) hasErrors = true
    if (!passwordField.current.validate()) hasErrors = true
    if (hasErrors) return

    try {
      const response = await login(username, password)
      if (!response.ok) throw new Error(response.status)

      navigation.navigate('AccountSelector')
    } catch (error) {
      console.error(error)
      if (error.message === '401') {
        setError('Credenciales incorrectas')
      } else {
        setError('No se ha podido iniciar sesión')
      }
    }
  }

  return (
    <Form style={{ width: '90%' }} error={error}>
      <TextField
        ref={usernameField}
        name="Usuario"
        autoCapitalize="none"
        required
        value={username}
        onChange={setUsername}
      />
      <TextField
        ref={passwordField}
        name="Contraseña"
        autoCapitalize="none"
        required
        secureTextEntry
        min={5}
        value={password}
        onChange={setPassword}
      />

      <SubmitButton title="Entrar" onPress={logIn} />
      <Text style={styles.signup} onPress={() => navigation.navigate('SignUp')}>
        ¿No tienes una cuenta? Regístrate
      </Text>
    </Form>
  )
}

const styles = StyleSheet.create({
  signup: {
    marginTop: 15,
    color: '#3f5efb',
  },
})
