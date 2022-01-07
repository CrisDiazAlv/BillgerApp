import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { login } from '../api/verbs'

import TextField from '../components/form/TextField'
import SubmitButton from '../components/form/SubmitButton'

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
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
  signup: {
    marginTop: 15,
    color: '#3f5efb',
  },
})
