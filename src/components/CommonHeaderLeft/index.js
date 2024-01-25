import React from "react";
import {Image,TouchableOpacity} from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
const CommonHeaderLeft=props=>{
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,
            dimensions.windowHeight,
             dimensions.isPortrait);
    const handleClick=()=>{
        if(props.type==='back')
        {
            if(props. action){
                props.action();
            }else{
                navigation.goBack();
            }
        }
        else{
            navigation.toggleDrawer();
        }
    }
    return(
        <TouchableOpacity style={responsivestyle.touch}
            onPress={handleClick}>
                <Image source={props.type=='back'?require('../../assets/image/left-arrow.png'):require('../../assets/image/sideicon.png')} 
                style={responsivestyle.image}/>
            </TouchableOpacity>
    );
    };
    export default CommonHeaderLeft;