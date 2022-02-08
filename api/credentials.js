import AsyncStorage from '@react-native-async-storage/async-storage'

export const setCredentials = async credentials => {
  try {
    await AsyncStorage.setItem('@credentials', credentials)
  } catch (error) {
    console.error(error)
  }
}
