import React from 'react'
import { View } from 'react-native'

import UserInfo from '../components/UserInfo'
import BillsByCategories from '../components/BillsByCategories'

export default function CategoriesOverviewScreen({ route }) {
  return (
    <View>
      <UserInfo />
      <BillsByCategories category={route.categoryId} />
    </View>
  )
}
