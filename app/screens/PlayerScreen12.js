import {ActivityIndicator, StyleSheet, Text, View, Image, SafeAreaView, Pressable, DeviceEventEmitter } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";
import forEach from 'lodash/forEach';
import { index } from 'react-native-cheerio/lib/api/traversing';
import { convertToObject } from 'typescript';
import { churchlist } from '../mockdata/churches';
import Slider from '@react-native-community/slider';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { isLoading } from 'expo-font';
import { load } from 'react-native-track-player/lib/src/trackPlayer';
import { all } from 'axios';


var myTimer;

const PlayerScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isLiked, setisLiked] = useState(null)
  const  sermon  = route?.params;
  const nameChurch =  sermon.info.church;
  const [sound, setSound] = useState();
  const churchLogo =  churchlist[nameChurch].logo;
  const [isPlaying, setIsPlaying] = useState(false); 
  const [loading, setLoading] = useState(false) 
  const [progress, setProgress] = useState(null);
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubberWidth, setScrubberWidth] = useState(1)
  const [scrubPosition, setScrubPosition] = useState(0);
  const mounted = useRef(false);  

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      DeviceEventEmitter.emit("popsong");
    });
    return unsubscribe;
  }, [navigation]);

  const storeLikedSong = async () => {
    try {
      setisLiked(null);
      const value = await AsyncStorage.getItem('likedSongs');
      let currLiked =JSON.parse(value ?? '[]');
      currLiked.push(sermon.info)
      await AsyncStorage.setItem('likedSongs', JSON.stringify(currLiked));
      setisLiked(true);
    } catch (e) {
        console.log(e);
    }
  };

  getSermonIndex = (arr) => 
    (arr ?? []).findIndex((serm) => 
      serm.name === sermon.info.name && serm.date === sermon.info.date);

  const unLikeSong = async () => {
    try {
      setisLiked(null);
      const likedSermons = await AsyncStorage.getItem('likedSongs');
      var arr =  JSON.parse(likedSermons);
      arr.splice(getSermonIndex(arr), 1);
      await AsyncStorage.setItem('likedSongs', JSON.stringify(arr));
      setisLiked(false);
    } catch (error) {
      console.error('Error reading from AsyncStorage:', error);
    }
  };

  async function clearAll() {
    await AsyncStorage.clear();
  }

  const checkIfSermonIsLiked = async () => {
    try {
      const likedSermons = await AsyncStorage.getItem('likedSongs');
      setisLiked(getSermonIndex(JSON.parse(likedSermons)) != -1);
    } catch (error) {
      console.error('Error reading from AsyncStorage:', error);
    }
  };

  const onHeartPressed = () => {
    console.log("pressed");
    isLiked ? unLikeSong() : storeLikedSong();
  }

  useEffect(() => {
    mounted.current = true;
    checkIfSermonIsLiked();
    setInitSound();
    return () => {
      mounted.current = false;
      console.log("done");
      clearInterval(myTimer);
    };
  }, [])
  
  //Play sound

  playbackUpdate = (status) => {
   // console.log(status);
  }

  getProgressBarPos = () => {
    if (progress != null) {
      return (progress.positionMillis / progress.durationMillis);
    }
    return 0;
  }

  async function setInitSound() {
    console.log('Loading Sound');
    setLoading(true);
    console.log(route?.params?.info?.link);
    const sound = new Audio.Sound();
    sound.setOnPlaybackStatusUpdate(playbackUpdate);
    await sound.loadAsync({uri: route?.params?.info?.link});
    setSound(sound);
    startInterval();
    setLoading(false);
  }

  startInterval = () => {
    myTimer = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (mounted.current) {setProgress(status)};
    }, 500);
  };

  async function setInHistory() {
    const history = await AsyncStorage.getItem('history');
    var arr =  JSON.parse(history) ?? [];
    console.log(arr);
    console.log(getSermonIndex(arr));
    if (getSermonIndex(arr) != -1) {arr.splice(getSermonIndex(arr), 1);}
    arr.push(sermon.info);
    console.log(arr);
    await AsyncStorage.setItem('history', JSON.stringify(arr));
  }

  async function handlePlayPause() {
    console.log("toggle play/pause");
    setLoading(true);
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      await sound.playAsync();
      await setInHistory();
    } else {
      await sound.pauseAsync();
    }
    setLoading(false);
  }

  soundPosSet = async(millis) => {
    try {
      setLoading(true);
      await sound.setPositionAsync(millis);
      const status = await sound.getStatusAsync();
      setProgress(status);
      setLoading(false);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  }

  fastForward = async (seconds) => {
    if (sound && progress) {
      const currentPosition = progress.positionMillis;
      let newPosition = Math.min(Math.max(0, currentPosition + (seconds * 1000)), progress.durationMillis);
      await soundPosSet(newPosition);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <LinearGradient colors={['#040306', '#131624']} style={styles.container}>
      <SafeAreaView>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() =>  navigation.goBack()}>
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerText}>Now Playing</Text>
          {isLiked == null ?
            (<ActivityIndicator size="small" color="white" />) :
            (<AntDesign 
              onPress={onHeartPressed}
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
          <Text  style={styles.title}>{sermon?.info.name}</Text>
          <Text style={styles.church}>{sermon?.info.pastor}</Text>
        </View>

        {/* Scrubber */}
        <View style={styles.scrubberContainer}>
        <View onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setScrubberWidth(width);}}>
        <Slider
            style={{ width: scrubberWidth, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={getProgressBarPos()}
            minimumTrackTintColor='#1DB954'
            maximumTrackTintColor='white'
            onValueChange={value => {
            }}
            onSlidingStart={async () => {
            }}
            onSlidingComplete={async value => {
              console.log(value);
              soundPosSet(value * progress.durationMillis);
            }}
          />
        </View>
        </View>
        <View
          style={{
            marginTop: 12,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
        <Text style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}>
          {formatTime(progress?.positionMillis ?? 0)}
        </Text>
        <Text style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}>
        {formatTime(progress?.durationMillis ?? 0)}
        </Text>
      </View>
        {/* Player Controls */}
        <View style={styles.controls}>
          <Pressable onPress={() => fastForward(-5)}>
            <FontAwesome5 name="backward" size={30} color="white" />
          </Pressable>
          <View style={{width: 60, height: 60}}>
          { loading ? <ActivityIndicator size="large" color="gray" /> :
            <Pressable onPress={handlePlayPause}>
              <Ionicons 
                name={isPlaying ? "pause-circle" : "play-circle"} 
                size={60} 
                color="white" 
              /> 
            </Pressable>}</View>
          <Pressable onPress={() => fastForward(5)}>
            <FontAwesome5 name="forward" size={30} color="white" />
          </Pressable>
        </View>
      </SafeAreaView>
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
