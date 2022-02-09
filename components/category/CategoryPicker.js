import React, { useState, useContext, useCallback, useImperativeHandle, forwardRef } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native'

import { Picker } from '@react-native-picker/picker'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

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

  useFocusEffect(
    useCallback(() => {
      getCategories()
    }, [])
  )

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
  const navigation = useNavigation()

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <View style={styles.modalView}>
        {/* if categories is not empty, display a picker to choose from
        otherwise, just inform the user and give him/her the ability to go to the category form */}
        {categories && !!categories.length ? (
          <Picker mode="dropdown" selectedValue={value} onValueChange={value => onValueChange(value)}>
            {categories.map(c => (
              <Picker.Item key={c.id} label={c.name} value={c.id} />
            ))}
          </Picker>
        ) : (
          <View style={styles.alertDialog}>
            <Text style={[styles.dialogText, { fontSize: 24 }]}>⚠️</Text>
            <Text style={styles.dialogText}>Todavía no has creado ninguna categoría, ¡ve a por ello!</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                onCancel()
                navigation.navigate('CategoryForm')
              }}>
              <View style={[styles.button, styles.confirm]}>
                <Text style={styles.confirmation}>Confirmar</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
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
  alertDialog: {
    marginVertical: 20,
  },
  dialogText: {
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 100,
    width: '45%',
    elevation: 4,
    paddingHorizontal: 20,
  },
  confirm: {
    backgroundColor: '#3f5efb',
  },
  confirmation: {
    color: 'white',
    fontSize: 14,
  },
})

export default forwardRef(CategoryPicker)
