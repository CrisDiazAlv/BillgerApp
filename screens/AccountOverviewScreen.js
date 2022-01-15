import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import AccountInfo from '../components/AccountInfo'
import FloatingButton from '../components/ui/FloatingButton'
import BillsByCategories from '../components/BillsByCategories'

export default function AccountOverviewScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <AccountInfo id={route.params.account} navigation={navigation} />
      <BillsByCategories account={route.account} />
      <FloatingButton onPress={() => navigation.navigate('CategoryForm')}>
        <Text style={styles.text}>+</Text>
      </FloatingButton>
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
  },
})
