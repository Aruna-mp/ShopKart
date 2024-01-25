import React, { useEffect } from "react";
import {Image, Text, View,TouchableOpacity} from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useDispatch, useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { updateCartCount } from "../../storage/action";
const CustomFooter =({state,descriptors,navigation})=>{
const dimensions=useDimensionContext();
const responsivestyle=style(dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait
    );
const cartCount=useSelector(state=>state.cartCount);
const userId=useSelector(state=>state.userId);
const dispatch=useDispatch();
useEffect(()=>{
    getCartProducts();
   },[])
const getCartProducts=async()=>{
    await firestore().collection('Cart')
    .where('userId','==',userId)
    .get()
    .then(snapshot=>{  
        dispatch(updateCartCount(snapshot.size));
    })
    .catch(err=>{
        console.log(err);
    })
   } 
    return(
        <View style={responsivestyle.container}>
            {state.routes.map((route,index) =>{
                const isFocused=state.index===index;
                const icon=route.name=='Home'
                ?require('../../assets/image/homepage.png')
                :route.name=='Category'
                ?require('../../assets/image/category.png')
                :route.name=='Search'
                ?require('../../assets/image/search.png')
                :route.name=='Offers'
                ?require('../../assets/image/offers.png')
                :require('../../assets/image/cart.png');
                return( 
                    
                    <TouchableOpacity 
                    key={index} 
                    onPress={() => navigation.navigate(route.name)}  
                    style={responsivestyle.footercontainer}>
                    <Image source={icon} style={responsivestyle.imagefont}/>
                    <Text style={responsivestyle.FooterText}> {route.name}</Text>
                    {isFocused?<Text style={responsivestyle.dot}>.</Text>:null}
                    {route.name==='Cart'?(
                        <View style={responsivestyle.cartcount}>
                            <Text style={responsivestyle.count}>{cartCount}</Text>
                        </View>
                    ):null
                    }

                 </TouchableOpacity>
                 );
                 })
                }
         </View>
    );
}
export default CustomFooter