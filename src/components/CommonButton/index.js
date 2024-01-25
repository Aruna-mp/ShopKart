import React from "react";
import {Text,TouchableOpacity} from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
const CommonButton=props=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,
            dimensions.windowHeight,
             dimensions.isPortrait
        );
    return(
        <TouchableOpacity onPress={props.onButtonPress}
            style={responsivestyle.container}>
            <Text style={responsivestyle.text}>
                {props.buttontext}
            </Text>
        </TouchableOpacity>
    );
}
export default CommonButton;