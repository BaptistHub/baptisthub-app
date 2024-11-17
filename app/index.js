import { StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { ModalPortal } from "react-native-modals";
import { PlayerContext } from "./PlayerContext";
import Navigation from "./StackNavigator";
import { StatusBar } from "react-native";
import TrackPlayer from 'react-native-track-player';
import { SafeAreaProvider} from 'react-native-safe-area-context';
// The player is ready to be used

export default function App() {

  async function hello() {
    await TrackPlayer.setupPlayer();
  }

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('black');
    hello();
  //  TrackPlayer.setupPlayer()
  }, [])
  

  return (
    <SafeAreaProvider style={{backgroundColor: 'black'}}>
      <PlayerContext>
        <Navigation />
        <ModalPortal/>
      </PlayerContext>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
