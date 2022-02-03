import React, { useState, useContext, useEffect, forwardRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Picker } from '@react-native-picker/picker'

import { AuthContext } from '../../AuthContext'

import { get } from '../../api/verbs'

function CategoryPicker(props, ref) {
  const [categories, setCategories] = useState([])

  const { logOut } = useContext(AuthContext)

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
      <Picker selectedValue={props.value} onValueChange={itemValue => props.onChange(itemValue)}>
        {categories.map(c => (
          <Picker.Item key={c.id} label={c.name} value={c.id} />
        ))}
      </Picker>
    </View>
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

export default forwardRef(CategoryPicker)
