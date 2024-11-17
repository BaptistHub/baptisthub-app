import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  
} from 'react-native';
import TrackPlayer, {
  Capability,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { churchlist } from '../mockdata/churches';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';


function PlayerScreen({ route }) {
  const  sermon  = route?.params.info;
  const churchLogo =  churchlist[sermon.church].logo;
  const [trackIndex, setTrackIndex] = useState(0);
  const [isLiked, setisLiked] = useState(null);
  const loadingStates = ["none", undefined, "loading", "buffering"];
  const [sliderWidth, setSliderWidth] = useState(0)
  const navigation = useNavigation();
  const playBackState = usePlaybackState();
  const progress = useProgress();

  const setupPlayer = async () => {
    try {
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          // Capability.SkipToNext,
          // Capability.SkipToPrevious
        ],
      });
      await TrackPlayer.reset();
      const track = {
        url: sermon.link, // Load media from the app bundle
        title: sermon.name,
        artist: sermon.pastor,
        artwork: churchlist[sermon.church].logo, // Load artwork from the app bundle
        duration: 67
    };
      await TrackPlayer.add(track);
    } catch (error) { console.log(error); }
  };

  const togglePlayBack = async playBackState => {
      if ((playBackState.state === "paused") || (playBackState.state === "ready")) {
        await TrackPlayer.play();
        await setInHistory()
      } else {
        await TrackPlayer.pause();
      }
  };

  const nexttrack = async () => {
      await TrackPlayer.skipToNext();
  };

  const previoustrack = async () => {
    if (trackIndex > 0) {
      await TrackPlayer.skipToPrevious();
      gettrackdata();
    };
  };
  
  getSermonIndex = (arr) => 
    (arr ?? []).findIndex((serm) => 
      serm.name === sermon.name && serm.date === sermon.date);

  //Like button
  const toggleLiked = async () => {
    try {
      setisLiked(null);
      const value = await AsyncStorage.getItem('likedSongs');
      let currLiked =JSON.parse(value ?? '[]');
      if (!isLiked) {
        currLiked.push(sermon)
      } else {
        currLiked.splice(getSermonIndex(currLiked), 1);
      }
      await AsyncStorage.setItem('likedSongs', JSON.stringify(currLiked));
      setisLiked(!isLiked); 
    } catch (e) {
        console.log(e);
    }
  };

  const checkIfSermonIsLiked = async () => {
    const likedSermons = await AsyncStorage.getItem('likedSongs');
    setisLiked(getSermonIndex(JSON.parse(likedSermons)) != -1);
  };

  const fastForward = (timeTo) => TrackPlayer.seekBy(timeTo);

  async function setInHistory() {
    const history = await AsyncStorage.getItem('history');
    var arr =  JSON.parse(history) ?? [];
    if (getSermonIndex(arr) != -1) {arr.splice(getSermonIndex(arr), 1);}
    arr.push(sermon);
    await AsyncStorage.setItem('history', JSON.stringify(arr));
  }

  const getTimeStamp = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor((time % 60));
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    setupPlayer();
    checkIfSermonIsLiked();
  }, []);

  return (
    <LinearGradient colors={['#040306', '#131624']} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() =>  navigation.goBack()}>
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerText}>Now Playing</Text>
          {isLiked == null ?
            (<ActivityIndicator size="small" color="white" />) :
            (<AntDesign 
              onPress={toggleLiked}
              name={isLiked ? "heart" : "hearto"} 
              size={24} 
              color={isLiked ? "#1DB954" : "white"} 
            />) 
          }
        </View>

        {/* Sermon Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: churchLogo }} 
            style={styles.sermonImage}
          />
        </View>

        {/* Sermon Info */}
        <View style={styles.infoContainer}>
          <Text  style={styles.title}>{sermon.name}</Text>
          <Text style={styles.church}>{sermon.pastor}</Text>
        </View>

        {/* Scrubber */}
        <View style={styles.scrubberContainer}>
        <View onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setSliderWidth(width);}}>
        <Slider
            style={{ width: sliderWidth, height: 40 }}
            value={progress.position}
            minimumValue={0}
            maximumValue={progress.duration}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={async value => await TrackPlayer.seekTo(value) }
          />
        </View>
        </View>
        <View
          style={styles.progressLabelContainer}
        >
        <Text style={styles.progressLabelStyle}>
          {getTimeStamp(progress.position)}
        </Text>
        <Text style={styles.progressLabelStyle}>
          {getTimeStamp(progress.duration)}
        </Text>
      </View>
        {/* Player Controls */}
        <View style={styles.controls}>
          <Pressable onPress={() => fastForward(-5)}>
            <FontAwesome5 name="backward" size={30} color="white" />
          </Pressable>
          <View style={{width: 60, height: 60}}>
          {loadingStates.includes(playBackState.state)
           ? <ActivityIndicator size="large" color="gray" /> :
            <Pressable onPress={() => togglePlayBack(playBackState)}>
                <Ionicons 
                  name={((playBackState.state === "paused") || (playBackState.state === "ready")) ? 
                    "play-circle" : "pause-circle"} 
                  size={60} 
                  color="white" 
                /> 
              </Pressable>}
          </View>
          <Pressable onPress={() => fastForward(5)}>
            <FontAwesome5 name="forward" size={30} color="white" />
          </Pressable>
        </View>
    </LinearGradient>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressLabelContainer: {
    marginTop: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressLabelStyle: { 
    color: "white", 
    fontSize: 15, 
    color: "#D3D3D3" 
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  sermonImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center'
  },
  church: {
    color: '#909090',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
  },
  scrubberContainer: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  scrubberTouch: {
    height: 20,
    justifyContent: 'center',
  },
  scrubberTrack: {
    height: 3,
    backgroundColor: '#4f4f4f',
    borderRadius: 1.5,
  },
  scrubberProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#1DB954', // Spotify green color
    borderRadius: 1.5,
  },
  scrubberKnob: {
    position: 'absolute',
    top: -6.5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
