import React from 'react'
import { Pressable } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";


function TrashButton({onPress}) {
  return (
    <Pressable onPress={() => onPress()}>
      <FontAwesome name="trash-o" 
        style={{paddingHorizontal: 16,paddingVertical: 20, marginRight: 7}}
      size={24} color="white" />
    </Pressable>
  )
}

export default TrashButton;