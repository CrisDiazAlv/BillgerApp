import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Platform, View, Text, TextInput, StyleSheet } from 'react-native'

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
    const date = new Date(value)
    return date.toLocaleDateString('es-ES')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.name}</Text>
      {Platform.OS === 'android' ? (
        <>
          <TextInput
            style={styles.input}
            {...props}
            placeholder={props.placeholder || props.name}
            value={parseDate(props.value)}
            onPressIn={() => setShow(true)}
          />
          <DatePicker visible={show} value={props.value} setShow={setShow} onChange={props.onChange} />
        </>
      ) : (
        <DatePicker visible={true} value={props.value} setShow={setShow} onChange={props.onChange} />
      )}
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  )
}

function DatePicker(props) {
  if (!props.visible) return null

  return (
    <DateTimePicker
      locale="es-ES"
      value={props.value && props.value instanceof Date ? props.value : new Date()}
      onChange={(_, date) => {
        props.setShow(false)
        if (date === undefined) return
        props.onChange(date)
      }}
    />
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
