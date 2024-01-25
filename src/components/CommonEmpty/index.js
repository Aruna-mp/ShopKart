import React from "react";
import { Text, View} from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";

const CommonEmpty =props=>{
const dimensions=useDimensionContext();
const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait);
return(
    <View style={responsivestyle.container}>
        <Text style={responsivestyle.title}>{props.title}</Text>
    </View>
    );
}
export default CommonEmpty;