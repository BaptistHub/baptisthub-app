import React, {useState} from 'react'
import { View, Text, Pressable } from 'react-native'
import CustomSearchInput from '../components/CustomSearchInput';
import { Ionicons,Entypo } from "@expo/vector-icons";


function TopBarSimple({handleInputChange, title, goBack, customItems}) {
    const [isSearch, setIsSearch] = useState(false);

    toggleSearch = () => setIsSearch(!isSearch);
    backButtonPressed = () => {
        handleInputChange("");
        toggleSearch();
    }

    return (
        <View>
        {isSearch ? (<CustomSearchInput onChange={handleInputChange} onNavBack={backButtonPressed} / >) :  (<View 
        style={{flexDirection:'row', alignItems: 'center', justifyContent: "space-between"}}>
            <View style={{flexDirection:'row'}}><Ionicons
                onPress={() => goBack()}
                name="arrow-back"
                size={24}
                style={{paddingHorizontal: 16,paddingVertical: 20, marginLeft: 5}}
                color="white"
            />
            <Text
            style={{
                color: "white",
                marginHorizontal: 12,
                marginTop: 16,
                fontSize: 22,
                fontWeight: "bold",
            }}
            >
            {title}
            </Text></View>
            <View style={{flexDirection: 'row-reverse'}}>
                {customItems}
                <Pressable onPress={toggleSearch}><Ionicons name="search-outline" 
                style={{paddingHorizontal: 16,paddingVertical: 20, marginLeft: 5}}
                size={24} color="white" /></Pressable>
            </View>
            </View>)} 
        </View>
    )
}

export default TopBarSimple