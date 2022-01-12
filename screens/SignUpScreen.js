import React, { useRef, useState } from 'react'
import { ScrollView, TextInput, Text, StyleSheet } from 'react-native'

import { post } from '../api/verbs'

import { Form, TextField, SubmitButton } from '../components/form'
// import DateTimeField from '../components/form/DateTimeField'

export default function SignUpScreen({ navigation }) {
  const nameField = useRef()
  const usernameField = useRef()
  const passwordField = useRef()
  const emailField = useRef()
  const birthdayField = useRef()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [error, setError] = useState('')

  const signUp = async () => {
    setError('')
    let hasErrors = false
    if (!nameField.current.validate()) hasErrors = true
    if (!usernameField.current.validate()) hasErrors = true
    if (!emailField.current.validate()) hasErrors = true
    if (!passwordField.current.validate()) hasErrors = true
    //if (!birthdayField.current.validate()) hasErrors = true
    if (hasErrors) return

    try {
      const response = await post('/user/signup', JSON.stringify({ name, username, password, email }))
      if (!response.ok) throw new Error(response.status)

      navigation.navigate('Login')
    } catch (error) {
      console.error(error)
      setError(error)
    }
  }

  return (
    <ScrollView>
      <Text style={styles.greeting}>¡Únete a{'\n'}Billger!</Text>
      <Form style={{ width: '90%', marginVertical: 50 }} error={error}>
        <TextField ref={nameField} name="Nombre y apellidos" required value={name} onChange={setName} />
        <TextField
          ref={usernameField}
          name="Usuario"
          required
          autoCapitalize="none"
          value={username}
          onChange={setUsername}
        />
        <TextField
          ref={emailField}
          name="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          required
          value={email}
          onChange={setEmail}
        />
        <TextField
          ref={passwordField}
          name="Contraseña"
          autoCapitalize="none"
          secureTextEntry
          required
          min={8}
          value={password}
          onChange={setPassword}
        />

        {/* <DateTimeField name="Fecha de nacimiento" required value={birthday} onChange={setBirthday} /> */}

        <SubmitButton title="Registrarse" onPress={signUp} />
        <Text style={styles.login} onPress={() => navigation.navigate('Login')}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Text>
      </Form>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  greeting: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 32,
    lineHeight: 50,
    color: '#282612',
    textDecorationLine: 'underline',
    textDecorationColor: '#3f5efb',
  },
  login: {
    marginTop: 15,
    color: '#3f5efb',
  },
})
