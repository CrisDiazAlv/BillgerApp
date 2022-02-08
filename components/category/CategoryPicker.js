import React, { useState, useContext, useEffect, useImperativeHandle, forwardRef } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import { Picker } from '@react-native-picker/picker'

import { AuthContext } from '../../AuthContext'

import { get } from '../../api/verbs'

import Modal from '../ui/Modal'

function CategoryPicker(props, ref) {
  const [categories, setCategories] = useState([])
  const [selectedCategoryText, setSelectedCategoryText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { logOut } = useContext(AuthContext)

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

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    try {
      const response = await get('/category')
      if (!response.ok) throw new Error(response.status)

      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error(`Could not load categories: ${error}`)
      if (error.message === '401') await logOut()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.name}</Text>
      <TextInput
        caretHidden
        style={styles.input}
        placeholder={props.placeholder || props.name}
        value={selectedCategoryText}
        onPressIn={() => setModalVisible(true)}
      />
      <CategoryPickerModal
        visible={modalVisible}
        value={props.value}
        categories={categories}
        onCancel={() => setModalVisible(false)}
        onValueChange={value => {
          // find category returned by modal and get its name to display on the TextInput
          setSelectedCategoryText(categories.find(c => c.id === value).name)
          props.onChange(value)
          setModalVisible(false)
        }}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </View>
  )
}

function CategoryPickerModal({ visible, value, categories, onCancel, onValueChange }) {
  return (
    <Modal visible={visible} onCancel={onCancel}>
      <View style={styles.modalView}>
        <Picker mode="dropdown" selectedValue={value} onValueChange={value => onValueChange(value)}>
          {categories.map(c => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    marginLeft: 10,
    color: '#3f5efb',
  },
  input: {
    borderRadius: 100,
    alignSelf: 'stretch',
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
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    elevation: 5,
  },
})

export default forwardRef(CategoryPicker)
