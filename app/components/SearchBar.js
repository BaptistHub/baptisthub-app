import { View, TextInput, Pressable } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";


const SearchTopBar = ({val, onChange, onNavBack}) => {
    const [layout, setLayout] = useState({width: 0,height: 0});
 

    return (
        <View 
        onLayout={(event) => setLayout(event.nativeEvent.layout)}
        style={{flexDirection:'row', alignItems: 'center'}}>
        <Ionicons
            onPress={onNavBack}
            name="arrow-back"
            size={24}
            style={{paddingHorizontal: 16,paddingVertical: 20, marginLeft: 5}}
            color="white"
        />
        <Pressable
            style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#42275a",
            padding: 9,
            width: 230,
            marginLeft: (layout.width/2) - 169,
            borderRadius: 3,
            height: 38,
            }}
        >
            <AntDesign name="search1" size={20} color="white" />
            <TextInput
            value={val}
            onChangeText={(text) => onChange(text)}
            placeholder="Find sermons"
            placeholderTextColor={"white"}
            style={{ fontWeight: "500",color:"white" }}
            />
        </Pressable> 
        </View>    
    );
};

export default SearchTopBar;
