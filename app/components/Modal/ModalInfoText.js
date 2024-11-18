import React from 'react'
import { Text, StyleSheet } from 'react-native'

function ModalInfoText({textProp}) {
  return (
    <Text style={[styles.text]}>
        {textProp}
    </Text>
  )
}

export default ModalInfoText
const styles = StyleSheet.create({
    text: {
      fontSize: 17,
      lineHeight: 24,
      color: "white",
      textAlign: 'center'
    }
  });