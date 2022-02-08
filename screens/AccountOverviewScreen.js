import React, { useEffect } from 'react'
import { View, StyleSheet, LogBox } from 'react-native'

// workaround to "componentWillReceiveProps has been renamed" warning
// https://github.com/mastermoo/react-native-action-button/issues/365
import ActionButton from 'react-native-action-button'
import { Ionicons } from '@expo/vector-icons'

import AccountInfo from '../components/account/AccountInfo'
import BillsByCategories from '../components/bill/BillsByCategories'

export default function AccountOverviewScreen({ navigation, route }) {
  // workaround to hide "Animated: useNativeDriver was not specified" warning
  // https://github.com/mastermoo/react-native-action-button/issues/339
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
  }, [])

  return (
    <View style={styles.container}>
      <AccountInfo id={route.params.account} />
      <BillsByCategories account={route.params.account} />
      <ActionButton buttonColor="#3f5efb" size={65} offsetY={40} offsetX={40} buttonTextStyle={styles.text}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Nuevo recibo"
          onPress={() => navigation.navigate('BillForm', { account: route.params.account })}>
          <Ionicons name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Nueva categoría"
          onPress={() => navigation.navigate('CategoryForm')}>
          <Ionicons name="md-pricetag" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 48,
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})
