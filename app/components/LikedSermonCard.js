import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React ,{useContext, useState} from  "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Player } from "../PlayerContext";
import { churchlist } from '../mockdata/churches'
import ContentInfoModal from "./ContentInfoModal";

const LikedSermonCard = ({ info, onPress, logo, onHeartPressed, showHeart=true }) => {
  const title = info?.name;
  const preacher = info?.pastor;
  const [openModal, setOpenModal] = useState(false)

 function toggleModal() {
    setOpenModal(!openModal);
 }

  return (
    <View>
      <ContentInfoModal 
        visible={openModal} Title={'Sermon'} info={info}
        closeModal={toggleModal} onPlayPress={onPress}
      ></ContentInfoModal>
    <Pressable
    onPress={onPress}
      style={styles.cardLayoutStyle}>
      <Image
        style={styles.imageStyle}
        source={{ uri: logo}}
      />

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

      <View style={styles.leftContent}>
        {showHeart ? <Pressable onPress={() => onHeartPressed(info)}>
          <AntDesign name="heart" size={24} color="#1DB954" />
        </Pressable> : null}
        <Pressable onPress={() => toggleModal()}>
          <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" /> 
        </Pressable>
      </View>
    </Pressable>
    </View>
  );
};

export default LikedSermonCard;

const styles = StyleSheet.create({
  cardLayoutStyle: {
    flexDirection: "row", 
    justifyContent:"space-between",
    aligninfos: "center", 
    padding: 10 
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
  imageStyle: { 
    width: 50, 
    height: 50, 
    marginRight: 10
  },
  infoTextStyle : {
     marginTop: 4, 
     color: "#989898" }
});
