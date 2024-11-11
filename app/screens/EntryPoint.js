import { StyleSheet, Text, View } from "react-native";
import {useEffect} from 'react'
import HomeScreen from "./HomeScreen";
import { Audio,InterruptionModeAndroid,InterruptionModeIOS} from "expo-av";

function EntryPoint() {

    useEffect(() => {
        Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            interruptionModeIOS: InterruptionModeIOS.DuckOthers, // Change as you like
            interruptionModeAndroid: InterruptionModeAndroid.DuckOthers, // Change as you like
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
          });
    }, [])

  return (
        <HomeScreen></HomeScreen>
  )
}

export default EntryPoint