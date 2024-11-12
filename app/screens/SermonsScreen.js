import { Image, TextInput,  FlatList, ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, DeviceEventEmitter } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { debounce } from "lodash";
import  SearchTopBar from "../components/SearchBar";
import * as api from '../http/api';
import ChruchSermonCard  from "../components/ChurchSermonCard";

const SermonsScreen = () => {
  const route = useRoute();
  const church = route?.params?.church;
  const churchInfo = route?.params?.info;
  const logo = churchInfo.logo
  const [tracks, setTracks] = useState([]);
  const [layout, setLayout] = useState({width: 0,height: 0});
  const [isSearch, setIsSearch] = useState(false);
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [input, setInput] = useState("");
  const navigation = useNavigation();
  const value = useRef(0);
  let sermons = [];

  async function getSermons() {
    sermons = await api.scrapeSermons(church);
    setTracks(sermons);
  }

  toggleSearch = () => setIsSearch(!isSearch);

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


  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      {isSearch ? (<SearchTopBar onChange={handleInputChange} onNavBack={toggleSearch} / >) :  (<View 
      style={styles.gradientStyle}>
         <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            style={styles.topBarItems}
            color="white"
        />
        <Pressable onPress={toggleSearch}><Ionicons name="search-outline" 
        style={styles.topBarItems}
        size={24} color="white" /></Pressable>
        </View>)}        
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[0].concat(searchedTracks)}
          renderItem={({ item, index }) => (
            index == 0 ? ( !isSearch ? 
             (<View style={{ flexDirection: 'column', padding: 12}}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: logo }}
                  />
                </View>
                <Text style={styles.church}>{church}</Text>
                <View style={{margin: 11}}></View> 
                {tracks.length == 0 ? (<ActivityIndicator size="large" color="gray" />)
                  : null
                }
              </View>) : null

            ) : (<ChruchSermonCard 
              onPress={() => navigation.navigate(
                "Player", {churchName: church, churchInfo: churchInfo, info: item})}
              key={index}
              info={item}
            >
          </ChruchSermonCard>)
          )}
        />
        <View>
      </View>
    </LinearGradient>
  );
};

export default SermonsScreen;

const styles = StyleSheet.create({
  church: {
    color: '#d6d6d6',
    fontSize: 17.3,
    textAlign: 'center',
    marginTop: 8
  },
  gradientStyle: {
    flexDirection:'row',
    alignItems: 'center', 
    justifyContent: "space-between"
  },
  topBarItems : {
    paddingHorizontal: 16,
    paddingVertical: 20, 
    marginLeft: 5
  }
});
