import React from "react";
import {Image, Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import { useDimensionContext } from "../../context";
const CommonHeader=()=>{
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,
                    dimensions.windowHeight,
                    dimensions.isPortrait);
    return(
        <View style={responsivestyle.container}> 
            <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
             <Image source={require('../../assets/image/sideicon.png')}
             style={responsivestyle.iconstyle}/>
             </TouchableOpacity>
            <Image source={require('../../assets/image/name.jpeg')}
            style={responsivestyle.logo}/>
        </View>
    );
};
export default CommonHeader;