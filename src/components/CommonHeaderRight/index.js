import React from "react";
import {Image,Share,Text,TouchableOpacity, View} from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../common/Colors";
import { useSelector } from "react-redux";
const CommonHeaderRight=props=>{
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const cartCount=useSelector(state=>state.cartCount);
    const responsivestyle=style(dimensions.windowWidth,
            dimensions.windowHeight,
             dimensions.isPortrait);
    const handleClick=async(type)=>{
        if(type==='cart'){
            navigation.navigate('Cart');
        }
        else if(type==='share'){
               
                  const result = await Share.share({
                    message:
                      'React Native | A framework for building native apps using React',
                    });
                  if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                      // shared with activity type of result.activityType
                    } else {
                      // shared
                    }
                  } else if (result.action === Share.dismissedAction) {
                    // dismissed
                  }
                }
           }
        
           
       
    
    return(
        <View style={responsivestyle.flexview}>
        {props.share
            ?<TouchableOpacity style={responsivestyle.touch}
            onPress={()=>handleClick('share')}>
                <>
                <EvilIcons name="share-google" size={47} color={Colors.black} />
                </>
            </TouchableOpacity>
            :null}
        {props.cart
            ?<TouchableOpacity style={responsivestyle.touch}
            onPress={()=>handleClick('cart')}>
                <>
                <View style={responsivestyle.cartcount}>
                            <Text style={responsivestyle.count}>{cartCount}</Text>
                        </View>
                <Image source={require('../../assets/image/bag.png')} 
                style={responsivestyle.image}/>
                </>
            </TouchableOpacity>
            :null}
            {props.plus?
            <TouchableOpacity style={responsivestyle.touch}
                onPress={props.handlePlusIcon}>
                <>
                <FontAwesome name="plus-square-o" size={30} color={Colors.black} />
                </>
            </TouchableOpacity>
            :null

            }
        </View>
        
    );
    };
    export default CommonHeaderRight;