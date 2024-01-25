import React from "react";
import {Image, View ,TextInput, Text} from "react-native";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import { useDimensionContext } from "../../context";
import Colors from "../common/Colors";
import { onChange } from "react-native-reanimated";
const CustomSearch=(props)=>{
    const {filter,placeholder,mike=true,onChangeText={}}={...props};
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    return(
        <View style={[filter?responsivestyle.newcontainer:responsivestyle.container]}> 
        <View style={[filter?responsivestyle.Newstyle:responsivestyle.search]}>
            <View style={responsivestyle.innerview}>
            <Image source={require('../../assets/image/search-black.png')} 
            style={responsivestyle.searchicon}/>
            <TextInput placeholder={placeholder?placeholder:" Search Here   " }
            placeholderTextColor={Colors.SlateGray} 
             style={responsivestyle.textinput}
             onChangeText={text=>{onChangeText(text)}}
             />
             {mike?(
            <Image source={require('../../assets/image/voice.png')} 
            style={responsivestyle.searchicon}/>):null}
            </View>
            
        </View>
        {filter?<Text style={responsivestyle.filter}>
            filter
        </Text>:null}
       
        
        
        </View>
    );
};
export default CustomSearch;