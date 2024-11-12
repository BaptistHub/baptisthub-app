import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React ,{useContext} from  "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Player } from "../PlayerContext";


const ChruchSermonCard = ({ info, onPress, isPlaying }) => {
  const title = info?.name;
  const preacher = info?.pastor;
  const { currentTrack, setCurrentTrack } = useContext(Player);
  return (
    <Pressable
    onPress={onPress}
      style={styles.cardLayoutStyle}>
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.titleStyle}
        >
          {title}
        </Text>
        <Text style={styles.infoTextStyle}>
          {preacher}
        </Text>
      </View>
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" /> 
    </Pressable>
  );
};

export default ChruchSermonCard;

const styles = StyleSheet.create({
  cardLayoutStyle: {
    flexDirection: "row", 
    justifyContent:"space-between",
    aligninfos: "center", 
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  titleStyle : { 
    fontWeight: "bold", 
    fontSize: 14, 
    color: "white" 
  },
  leftContent : {
    flexDirection: "row",
    aligninfos: "center",
    gap: 7,
    marginHorizontal:2,
  },
  infoTextStyle : { 
    marginTop: 4, 
    color: "#989898" 
  }
});
