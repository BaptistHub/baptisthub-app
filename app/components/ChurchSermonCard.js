import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React ,{useContext, useState} from  "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Player } from "../PlayerContext";
import ContentInfoModal from "./ContentInfoModal";
import { useNavigation } from "@react-navigation/native";


const ChruchSermonCard = ({ info, onPress, moreInfoModal, isPlaying }) => {
  const title = info?.name;
  const preacher = info?.pastor;
  const [openModal, setOpenModal] = useState(false);
  const navigation = useNavigation();

  const { currentTrack, setCurrentTrack } = useContext(Player);

 function toggleModal() {
    setOpenModal(!openModal);
 }

  return (
    <View>
        <ContentInfoModal 
            visible={openModal} Title={"Sermon"} info={info}
            closeModal={toggleModal} onPlayPress={onPress}
        ></ContentInfoModal>
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
        <Pressable onPress={() => toggleModal()}>
            <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" /> 
        </Pressable>
        </Pressable>
    </View>
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
