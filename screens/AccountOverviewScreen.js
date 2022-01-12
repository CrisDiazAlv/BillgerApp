import React from 'react'
import { View } from 'react-native'

import AccountInfo from '../components/AccountInfo'
import BillsByCategories from '../components/BillsByCategories'

export default function AccountOverviewScreen({ route }) {
  return (
    <View>
      <AccountInfo />
      <BillsByCategories category={route.categoryId} />
    </View>
  )
}
