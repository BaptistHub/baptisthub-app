import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { churchlist } from '../mockdata/churches';
import axios from "axios";
import ChannelCard from "../components/ChannelCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "react-native-reanimated";


const HomeScreen = () => {
  const navigation = useNavigation();
  const [recentlyplayed, setRecentlyPlayed] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [layout, setLayout] = useState({width: 0,height: 0});
  const [screenLayout, setScreenLayout] = useState({width: 0, height: 0});
  const greetingMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return "Good Morning";
    } else if (currentTime < 16) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };
  

  const message = greetingMessage();
  
  return (
    <LinearGradient
    onLayout={(event) => setScreenLayout(event.nativeEvent.layout)}
    colors={["#040306", "#131624"]} style={{ flex: 1 }}>
        {/* Greeting */}
        <View style={{ height: 6.5 }} />
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
              style={{
                marginLeft: 10,
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {message}
          </Text>
        </View>

        <View style={{ height: 12 }} />

        {/* top cards */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Pressable
          onLayout={(event) => setLayout(event.nativeEvent.layout)}
          onPress={() => navigation.navigate("Liked")}
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 15,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              Liked Sermons
            </Text>
          </Pressable>
          <Pressable
          onPress={() => navigation.navigate("History")}
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 15,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <Image
              style={{ width: 55, height: 55 }}
              source={{ uri: "https://cdn.pixabay.com/photo/2016/05/08/19/05/time-1379641_640.jpg" }}
            />
            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              History
            </Text>
          </Pressable>
        </View>

        <View style={{ height: 20 }} />

        {/* church cards */}
        <FlatList
          data={Object.keys(churchlist)}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ChannelCard imageUrl={churchlist[item].logo} name={item}
            onPressed={() => navigation.navigate("Info", {church: item, info: churchlist[item]})}
            margin={
              ((screenLayout.width/2)-layout.width)/2} 
              size={layout.width} key={index} />
          )}
        />

    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
