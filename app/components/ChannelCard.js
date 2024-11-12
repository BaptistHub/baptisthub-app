import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const ChannelCard = ({ imageUrl, margin, name, size, onPressed }) => {
  // Extract the key and value from the item

  return (
    <Pressable onPress={() => onPressed()}>
    <View style={{ margin: margin }}>
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
        {name}
      </Text>
    </View>
    </Pressable>
  );
};

export default ChannelCard;

const styles = StyleSheet.create({});
