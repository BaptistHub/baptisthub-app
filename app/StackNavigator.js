import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "./screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LikedSongsScreen from "./screens/LikedSongsScreen";
import SermonsScreen from "./screens/SermonsScreen";
import PlayerScreen from "./screens/PlayerScreen";
import HistoryScreen from "./screens/HistoryScreen";
import EntryPoint from "./screens/EntryPoint";
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import { View } from "react-native";


const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle:{
            backgroundColor:"rgba(0,0,0,0.5)",
            position: "absolute",
            bottom:0,
            left:0,
            right:0,
            shadowOpacity:4,
            shadowRadius:4,
            elevation:4,
            shadowOffset:{
                width:0,
                height:-4
            },
            borderTopWidth:0 
        }
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
                <Ionicons name="person" size={24} color="white" />
            ) : (
                <Ionicons name="person-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}


const Stack = createNativeStackNavigator();
function Navigation(){
    let insets = useSafeAreaInsets();

    return (
      <View style={{flex: 1, marginTop: insets.top, backgroundColor: 'black'}}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{navigationBarHidden: true}}>
                {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/> */}
                <Stack.Screen name="Main" component={EntryPoint} options={{headerShown:false}}/>
                <Stack.Screen name="Liked" component={LikedSongsScreen} options={{headerShown:false}}/> 
                <Stack.Screen name="Info" component={SermonsScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Player" component={PlayerScreen} options={{headerShown:false}}/>
                <Stack.Screen name="History" component={HistoryScreen} options={{headerShown:false}}/>

            </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
}

export default Navigation