import React, { useState, useEffect, useMemo } from 'react'
import { ActivityIndicator } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import BillFormScreen from './screens/BillFormScreen'
import AccountFormScreen from './screens/AccountFormScreen'
import CategoryFormScreen from './screens/CategoryFormScreen'
import AccountSelectorScreen from './screens/AccountSelectorScreen'
import AccountOverviewScreen from './screens/AccountOverviewScreen'

import { AuthContext } from './AuthContext'

import { isLoggedIn } from './api/verbs'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const { Navigator, Screen } = createNativeStackNavigator()

  useEffect(() => {
    login()
  }, [])

  const login = async () => {
    try {
      const response = await isLoggedIn()
      if (!response.ok) throw new Error(response.status)

      setIsSignedIn(true)
    } catch (error) {
      console.error(`User could not authenticate: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const authContext = useMemo(
    () => ({
      logIn: async () => {
        setIsSignedIn(true)
      },
      logOut: async () => {
        setIsSignedIn(false)
      },
    }),
    []
  )

  if (isLoading) return <ActivityIndicator />

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Navigator>
          {!isSignedIn ? (
            <>
              <Screen name="Login" component={SignInScreen} options={{ title: 'Entrar' }} />
              <Screen name="SignUp" component={SignUpScreen} options={{ title: 'Registrarse' }} />
            </>
          ) : (
            <>
              <Screen name="AccountSelector" component={AccountSelectorScreen} options={{ title: 'Mis cuentas' }} />
              <Screen name="AccountForm" component={AccountFormScreen} options={{ title: 'Nueva cuenta' }} />
              <Screen
                name="AccountOverview"
                component={AccountOverviewScreen}
                options={({ route }) => ({ title: route.params.name })}
              />
              <Screen name="BillForm" component={BillFormScreen} options={{ title: 'Nuevo recibo' }} />
              <Screen name="CategoryForm" component={CategoryFormScreen} options={{ title: 'Nueva categoría' }} />
            </>
          )}
        </Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
