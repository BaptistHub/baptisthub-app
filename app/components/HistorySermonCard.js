import React from 'react'
import LikedSermonCard from "./LikedSermonCard";
import { View } from 'react-native';

function HistorySermonCard({info, onPress, logo}) {
  return (
    <View>
        <LikedSermonCard
            info={info}
            onPress={onPress}
            logo={logo}
            showHeart={false}
        ></LikedSermonCard>
    </View>
  )
}

export default HistorySermonCard