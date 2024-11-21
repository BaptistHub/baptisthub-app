import {
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LikedSermonCard from "../components/LikedSermonCard";
import { Player } from "../PlayerContext";
import { debounce } from "lodash";
import { churchlist } from "../mockdata/churches";
import ClearModal from "../components/ClearModal";
import TrashButton from "../components/TrashButton";


const LikedSongsScreen = () => {
  const colors = [
    "#27374D",
    "#1D267D",
    "#BE5A83",
    "#212A3E",
    "#917FB3",
    "#37306B",
    "#443C68",
    "#5B8FB9",
    "#144272",
  ];
  const navigation = useNavigation();
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [input, setInput] = useState("");
  const [likedTracks, setLikedTracks] = useState(null);
  const [clearLikedModal, setClearLikedModal] = useState(false)
  const value = useRef(0);


  
  
  async function getLikedTracks() {
    const value = await AsyncStorage.getItem('likedSongs');
    let currLiked =JSON.parse(value ?? '[]');
    setLikedTracks(currLiked);
  }

  const unLikeSermon = async (item) => {
    try {
      const arr = likedTracks.filter((serm) => 
        serm.name !== item.name || serm.date !== item.date);
      await AsyncStorage.setItem('likedSongs', JSON.stringify(arr));
      setLikedTracks(arr);
    } catch (error) {
      console.error('Error reading from AsyncStorage:', error);
    }
  };


  useEffect(() => {
    getLikedTracks();
    DeviceEventEmitter.addListener("popsong", getLikedTracks);
  }, []);

  useEffect(() => {
      handleSearch(input)
  },[likedTracks, input])


  const debouncedSearch = debounce(handleSearch, 800);
  function handleSearch(text) {
    if (likedTracks != null) {
      const filteredTracks = likedTracks.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchedTracks(filteredTracks);      
    }
  }
  const handleInputChange = (text) => {
    setInput(text);
    debouncedSearch(text);
  };

  async function clearLiked() {
    await AsyncStorage.setItem('likedSongs', '[]');
    await getLikedTracks();
    setSearchedTracks([]);
    setClearLikedModal(false);
  }

  return (
    <>
      <ClearModal
        visible={clearLikedModal}
        Title={'Clear favorites'} content={'This will delete all content from your favorites library'}
        buttonPress={() =>  clearLiked()}
      ></ClearModal>
      <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection:'row'}}>
          <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              style={{paddingHorizontal: 16,paddingVertical: 20, marginLeft: 5}}
              color="white"
          />
          <Text
            style={styles.songCountHeadingText}
          >
          Favorites
          </Text>
        </View>
        <TrashButton
            onPress={() => setClearLikedModal(true)}
        ></TrashButton>
        </View>
          <Pressable
            style={styles.searchBarContainerStyle}
          >
            <Pressable
              style={styles.searchBarStyle}
            >
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                value={input}
                onChangeText={(text) => handleInputChange(text)}
                placeholder="Find sermons"
                placeholderTextColor={"white"}
                style={{ fontWeight: "500",color:"white" }}
              />
            </Pressable>

            <Pressable
              style={styles.sortBtnStyle}
            >
              <Text style={{ color: "white" }}>Sort</Text>
            </Pressable>
          </Pressable>

          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={styles.numOfSongsTextStyle}>
            {searchedTracks?.length ?? 0} songs
            </Text>
          </View>
          <View style={{ height: 10 }} />
         

          {likedTracks == null ? (
            <ActivityIndicator size="large" color="gray" /> // Show a loading indicator while data is being fetched
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchedTracks}
              renderItem={({ item, index }) => (
                <LikedSermonCard
                key={index}
                  info={item}
                  logo={churchlist[item.church].logo}
                  onHeartPressed={unLikeSermon}
                  onPress={() => navigation.navigate(
                    "Player", {
                      churchName: item.church, 
                      info: item})}
                 // isPlaying={item === currentTrack}
                />
              )}
            />
          )}
      </LinearGradient>
    </>
  );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
  sortBtnStyle :{
    marginHorizontal: 10,
    backgroundColor: "#42275a",
    padding: 10,
    borderRadius: 3,
    height: 38,
  },
  numOfSongsTextStyle : { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "white" 
  },
  searchBarStyle : {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#42275a",
    padding: 9,
    flex: 1,
    borderRadius: 3,
    height: 38,
  },
  searchBarContainerStyle : {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
  },
  songCountHeadingText : {
    color: "white",
    marginHorizontal: 12,
    marginTop: 16,
    fontSize: 22,
    fontWeight: "bold",
  }
});
