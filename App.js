import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import AccountFormScreen from './screens/AccountFormScreen'
import AccountSelectorScreen from './screens/AccountSelectorScreen'
import CategoriesOverviewScreen from './screens/CategoriesOverviewScreen'

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Login">
        <Screen name="SignUp" component={SignUpScreen} options={{ title: 'Registrarse' }}></Screen>
        <Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }}></Screen>
        <Screen name="AccountSelector" component={AccountSelectorScreen} options={{ title: 'Mis cuentas' }} />
        <Screen name="AccountForm" component={AccountFormScreen} options={{ title: 'Nueva cuenta' }} />
        <Screen name="Categories" component={CategoriesOverviewScreen} options={{ title: 'Categorías' }} />
      </Navigator>
    </NavigationContainer>
  )
}
