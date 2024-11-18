import { Image, TextInput,  FlatList, ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, DeviceEventEmitter } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons,Entypo, FontAwesome } from "@expo/vector-icons";
import { debounce } from "lodash";
import { churchlist } from '../mockdata/churches'
import  CustomSearchInput from "../components/CustomSearchInput";
import TopBarSimple from "../components/TopBarSimple";
import HistorySermonCard from "../components/HistorySermonCard";
import ClearModal from "../components/ClearModal";
import TrashButton from "../components/TrashButton";

const HistoryScreen = () => {
  const route = useRoute();
  const church = route?.params?.church;
  const churchInfo = route?.params?.info;
  const [tracks, setTracks] = useState([]);
  const [layout, setLayout] = useState({width: 0,height: 0});
  const [historyModal, setHistoryModal] = useState(false)
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [input, setInput] = useState("");
  const navigation = useNavigation();
  const value = useRef(0);
  let sermons = [];

  async function getSermons() {
    const value = await AsyncStorage.getItem('history');
    let currLiked =JSON.parse(value ?? '[]');
    console.log(currLiked);
    setTracks(currLiked);
  }


  useEffect(() => {
        getSermons();
  }, []);

  useEffect(() => {
    if(tracks.length > 0){
      handleSearch(input)
    }
  },[tracks])


  const debouncedSearch = debounce(handleSearch, 800);
  function handleSearch(text) {
    const filteredTracks = tracks.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchedTracks(filteredTracks);
  }
  const handleInputChange = (text) => {
    setInput(text);
    debouncedSearch(text);
  };

  async function clearHistory() {
    await AsyncStorage.setItem('history', '[]');
    await getSermons();
    setSearchedTracks([]);
    setHistoryModal(false);
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ClearModal
        visible={historyModal}
        closeModal={() => setHistoryModal(false)}
        Title={'Clear history'} content={'This will delete all content from your listenning history'}
        buttonPress={() => clearHistory()}
      ></ClearModal>
      <TopBarSimple handleInputChange={handleInputChange}
        title={'History'}
        goBack={navigation.goBack}
        customItems={
          <TrashButton
            onPress={() => setHistoryModal(true)}
          ></TrashButton>
        }
      ></TopBarSimple>   
        {searchedTracks.length == 0 ? <View>
          <Text style={styles.contentNotFound}>No content found</Text>
        </View> : <FlatList
          showsVerticalScrollIndicator={false}
          data={[0].concat(searchedTracks)}
          renderItem={({ item, index }) => (
            index == 0 ? (<View style={{height: 20}}></View>) : (
            <HistorySermonCard
              key={index}
              onPress={() => navigation.navigate(
                "Player", {churchName: church, churchInfo: churchInfo, info: item})}
              info={item}
              logo={churchlist[item?.church]?.logo}
            ></HistorySermonCard>)
          )}
        />}
        <View>
      </View>
    </LinearGradient>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  church: {
    color: '#d6d6d6',
    fontSize: 17.3,
    textAlign: 'center',
    marginTop: 8
  },
  center : {
    alignItems: 'center',
  },
  contentNotFound : {
    color: 'white',
    textAlign: 'center',
    fontSize: 16.5,
    marginTop: 50,
    opacity: 0.8
  }
});
