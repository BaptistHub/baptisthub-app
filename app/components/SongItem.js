import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React ,{useContext} from  "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Player } from "../PlayerContext";
import { churchlist } from '../mockdata/churches'

const SongItem = ({ item, onPress, isPlaying, onHeartPressed }) => {
  const { currentTrack, setCurrentTrack } = useContext(Player);
  // const handlePress = () => {
  //   setCurrentTrack(item);
  //   onPress(item)
  // } 
  return (
    <Pressable
    onPress={onPress}
      style={{flexDirection: "row", justifyContent:"space-between",
        alignItems: "center", padding: 10 }}
    >
      <Image
        style={{ width: 50, height: 50, marginRight: 10 }}
        source={{ uri: churchlist[item?.church]?.logo}}
      />

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontWeight: "bold", 
            fontSize: 14, color: "white" }}
        >
          {item?.name}
        </Text>
        <Text style={{ marginTop: 4, color: "#989898" }}>
          {item?.pastor}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginHorizontal:2,
        }}
      >
        <Pressable onPress={() => onHeartPressed(item)}>
          <AntDesign name="heart" size={24} color="#1DB954" />
        </Pressable>
         <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" /> 
      </View>
    </Pressable>
  );
};

export default SongItem;

const styles = StyleSheet.create({});
