import React, { useState } from 'react'
import { View, ScrollView, TextInput, Text, StyleSheet } from 'react-native'

import { post } from '../api/verbs'

import TextField from '../components/form/TextField'
// import DateTimeField from '../components/form/DateTimeField'
import SubmitButton from '../components/form/SubmitButton'

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [identityDocument, setIdentityDocument] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')
  const [error, setError] = useState('')

  const signUp = async () => {
    console.log(birthday)
    try {
      const response = await post('/user/signup', {
        body: JSON.stringify({ name, username, password, identityDocument, email }),
      })
      if (!response.ok) throw new Error(response.status)

      navigation.navigate('Login')
    } catch (error) {
      console.error(error)
      setError(error)
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextField name="Nombre" required value={name} onChange={setName} />
        <TextField name="Apellidos" />
        <TextField name="Usuario" required value={username} onChange={setUsername} />
        <TextField
          name="Contraseña"
          autoCapitalize="none"
          secureTextEntry
          required
          min={8}
          value={password}
          onChange={setPassword}
        />
        <TextField name="Email" autoCapitalize="none" keyboardType="email-address" required onChange={setEmail} />
        {/* <DateTimeField name="Fecha de nacimiento" required value={birthday} onChange={setBirthday} /> */}
        <TextField name="DNI" required keyboardType="phone-pad" onChange={setIdentityDocument} />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <SubmitButton title="Registrarse" onPress={signUp} />
        <Text style={styles.login} onPress={() => navigation.navigate('Login')}>
          ¿Ya tienes una cuenta? Inicia sesión
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  login: {
    marginTop: 15,
    color: '#3f5efb',
  },
})
