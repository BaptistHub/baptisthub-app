import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const ArtistCard = ({ item, name, size, screenLayout, onPressed }) => {
  // Extract the key and value from the item
  const churchName = name;
  const imageUrl = item.logo;

  return (
    <Pressable onPress={() => onPressed()}>
    <View style={{ margin: (((screenLayout/2)-size))/2 }}>
      <Image
        style={{ width: size, height: size, borderRadius: 5 }}
        source={{ uri: imageUrl }}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        {churchName}
      </Text>
    </View>
    </Pressable>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({});
