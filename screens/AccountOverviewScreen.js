import React from 'react'
import { View } from 'react-native'

import AccountInfo from '../components/AccountInfo'
import BillsByCategories from '../components/BillsByCategories'

export default function AccountOverviewScreen({ navigation, route }) {
  return (
    <View>
      <AccountInfo id={route.params.account} navigation={navigation} />
      <BillsByCategories category={route.categoryId} />
    </View>
  )
}
