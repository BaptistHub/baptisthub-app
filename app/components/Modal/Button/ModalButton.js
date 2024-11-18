import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { FontAwesome5 } from "@expo/vector-icons";


function ModalButton({onPress, content}) {
  return (
    <View>
        <TouchableOpacity
            style={[
                styles.button,
                {
                  width: "100%",
                  marginTop: 24,
                  backgroundColor: "#c7c7c7",
                  flexDirection: 'row', alignItems: 'center'
                },
            ]}
            onPress={() => onPress()}
        >
          {content}
        </TouchableOpacity>
    </View>
  )
}

export default ModalButton

const styles = StyleSheet.create({
    button: {
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
      height: 56,
      borderRadius: 8,
    },
  });