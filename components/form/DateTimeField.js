import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import DateTimePicker from '@react-native-community/datetimepicker'

function DateTimeField(props, ref) {
  const [show, setShow] = useState(false)
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

    return isValid
  }

  const parseDate = value => {
    if (!value) return
    return value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.name}</Text>
      <TextInput
        style={styles.input}
        {...props}
        placeholder={props.placeholder || props.name}
        value={parseDate(props.value)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
      />
      {show && (
        <DateTimePicker
          {...props}
          value={new Date()}
          onChange={(_, date) => {
            props.onChange(date)
            setShow(false)
          }}
        />
      )}
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignSelf: 'stretch',
  },
  label: {
    marginBottom: 5,
    marginLeft: 10,
    color: '#3f5efb',
  },
  input: {
    borderRadius: 100,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 5,
    elevation: 4,
  },
  error: {
    color: 'red',
    marginLeft: 10,
  },
})

export default forwardRef(DateTimeField)