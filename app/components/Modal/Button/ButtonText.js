import React from 'react'
import { StyleSheet, Text } from 'react-native'

function ButtonText({textProp}) {
  return (
    <Text style={[styles.textStyle]}>
        {textProp}
    </Text>
  )
}

export default ButtonText

const styles = StyleSheet.create({
    textStyle: {
      fontWeight: "600",
      fontSize: 18,
      color: "black",
    }
  });