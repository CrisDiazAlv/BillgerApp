import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

function TextField(props, ref) {
  const [errorMessage, setErrorMessage] = useState('')

  useImperativeHandle(ref, () => ({
    validate: () => {
      return validate()
    },
  }))

  const validate = () => {
    let isValid = true

    if (props.required && !props.value) {
      isValid = false
      setErrorMessage('Campo obligatorio')
      return
    } else {
      setErrorMessage('')
    }

    if (props.min && props.value.length < props.min) {
      isValid = false
      setErrorMessage(`Este campo debe contener ${props.min} caracteres como mínimo`)
    } else {
      setErrorMessage('')
    }

    return isValid
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.name}</Text>
      <TextInput
        style={styles.input}
        {...props}
        placeholder={props.name}
        value={props.value}
        onChangeText={props.onChange}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    marginLeft: 10,
    color: '#3f5efb',
  },
  input: {
    borderRadius: 100,
    width: 200,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: {
    color: 'red',
    marginLeft: 5,
    maxWidth: 200,
  },
})

export default forwardRef(TextField)
