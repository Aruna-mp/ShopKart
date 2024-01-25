import React from "react";
import {View,Text,TouchableOpacity, Image} from 'react-native';
import style from "./style";
import Colors from "../common/Colors";
import { useDimensionContext } from "../../context";

const CustomButton=props=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);

    const {type,handleButtonPress,buttonText,icon}= props;
    return(
        <View>
            <TouchableOpacity onPress={handleButtonPress}
             style={[responsivestyle.button,
                {backgroundColor:
                type==='primary'?Colors.green:Colors.LightGreen}]}>
                {type!=='primary'?<Image source={icon} 
                style={responsivestyle.buttonicon}/>:null }
                <Text style={[responsivestyle.textfont, 
                {color:type==='primary'?Colors.WhiteSmoke:Colors.black,
                fontFamily:type==='primary'?'Poppins-Bold':'Poppins-Regular',
                fontSize:type==='primary'?16:14}
                ]}>{buttonText}</Text>
            </TouchableOpacity>
        </View>

    );
}
export default CustomButton;