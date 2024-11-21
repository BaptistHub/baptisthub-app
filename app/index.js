import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { ModalPortal } from "react-native-modals";
import { PlayerContext } from "./PlayerContext";
import Navigation from "./StackNavigator";
import { StatusBar } from "react-native";
import TrackPlayer, {AppKilledPlaybackBehavior, Capability} from 'react-native-track-player';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import LoadingScreen from "./screens/LoadingScreen";
// The player is ready to be used

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  async function initalizer() {
    setIsLoading(true);
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
      },
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        // Capability.SkipToNext,
        // Capability.SkipToPrevious
      ],
    });
    setIsLoading(false);
  }

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    StatusBar.setBackgroundColor('black');
    initalizer();
  }, [])
  

  return (
    <SafeAreaProvider style={{backgroundColor: 'black'}}>
      <PlayerContext>
        {isLoading ? <LoadingScreen/> :
          <>
            <Navigation />
            <ModalPortal/>
          </>
        }
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
