import React, { useState } from "react";
import {Image, TextInput, TouchableOpacity, View,Text } from "react-native";
import style from "./style";
import { useDimensionContext } from "../../context";
const CustumTextInput=(props)=>{
    const dimensions=useDimensionContext();
const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait);
    const [set,setPswd]=useState(false);
    const {type,handleText,placeholder,value,check=false,
        multiline=false}=props;
    const Keytype= type==='email'
    ?'email-address'
    :type==='password'
    ?'default'
    :type==='phone'
    ?'phone-pad':
    'default';
    const secureEntry= type=='password'?set?false:true:false;
    const icon= 
    type==='email'
    ?require('../../assets/image/email.png')
    :type==='password'
    ?set
    ?require('../../assets/image/view.png')
    :require('../../assets/image/hide.png')
    :false;
    const handlePassword=()=>{
        setPswd(!set);
    }
    return(
        <View style={responsivestyle.container} >
        <TextInput  
            style={[responsivestyle.textinput,{
                height:Platform.OS==='android'
                ?multiline
                ?dimensions.windowHeight*.15
                :dimensions.windowHeight*.06
                :multiline
                ?dimensions.windowHeight*.1
               :dimensions.windowHeight*.02
            },]} 
            placeholder={placeholder}
            keyboardType={Keytype} 
            secureTextEntry={secureEntry}
            onChangeText={handleText}
            multiline={multiline}
            value={value}/>
        {check
        ?<Text style={responsivestyle.checktext}>
            Check
        </Text>
        :null}
        {!icon?null:(
            <TouchableOpacity onPress={handlePassword} disabled={type!=='password'? true: false}>
        <Image style={responsivestyle.icon} source={icon}/>
        </TouchableOpacity>
        )}
        </View>
    );
}
export default CustumTextInput;