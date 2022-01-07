import React, { useState } from 'react'
import { TouchableWithoutFeedback, View, Text, StyleSheet, Animated } from 'react-native'

export default function SubmitButton({ title, onPress }) {
  const [offset] = useState(new Animated.Value(1))
  const [scale] = useState(new Animated.Value(1))

  const animate = async () => {
    Animated.spring(offset, {
      toValue: 5,
      useNativeDriver: true,
    }).start()
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start()

    await onPress()
    Animated.spring(offset, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const transform = [{ translateY: offset }, { scaleY: scale }, { scaleX: scale }]

  return (
    <TouchableWithoutFeedback onPressIn={animate}>
      <Animated.View style={{ transform, ...styles.container }}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 100,
    backgroundColor: '#3f5efb',
    elevation: 4,
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
