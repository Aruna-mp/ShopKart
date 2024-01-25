import React from "react";
import {View,Text, Image, TouchableOpacity } from "react-native";
import Colors from "../common/Colors";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../storage/action";
const CustomDrawer=()=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const navigation=useNavigation();
    const dispatch=useDispatch();
    const firstName=useSelector(state=>state.firstName);
    const lastName=useSelector(state=>state.lastName);
    const email=useSelector(state=>state.email);
    const profileImage=useSelector(state=>state.profileImage);
    
    const contents=[
    {
        itemId : 0,
        itemName:'Home',
        navigateTo:'MyFooter',
        icon:require('../../assets/image/home2.png'),
    },
    {
        itemId : 1,
        itemName:'Shop By Category',
        navigateTo:'Categories',
        icon:require('../../assets/image/category-black.png'),
    },
    {
        itemId : 2,
        itemName:'Orders',
        navigateTo:'Orders',
        icon:require('../../assets/image/orders.png'),
    },
    {
        itemId : 3,
        itemName:'Your WishList',
        navigateTo:'Wishlist',
        icon:require('../../assets/image/wishlist.png'),
    },
    {
        itemId : 4,
        itemName:'Your Account',
        navigateTo:'Account',
        icon:require('../../assets/image/user.png'),
    },
    ];
    const handleSignout=()=>{
        dispatch(signout());
    }
    return(
        <View style={ responsivestyle.container} > 
            {/* profile */}
            <TouchableOpacity style={responsivestyle.viewstyle} 
            onPress={()=>navigation.navigate('Account')}>
            <View style={responsivestyle.profile}>
            <Image source={
                profileImage===''
                ?require('../../assets/image/profile.png')
                :{uri:profileImage}}
                style={responsivestyle.image}/>
            </View>
            <View style={responsivestyle.profilenameview}>
                <Text style={responsivestyle.profilename}> 
                {firstName} {lastName}
                </Text>
                <Text style={responsivestyle.profileemail}>{email}</Text>
            </View>
            </TouchableOpacity>
         {/* drawer */}
         <View style={responsivestyle.iconview} >
         <View>
            {contents.map((item,index)=>{
                return(
                <TouchableOpacity  key={item.itemId}style={responsivestyle.iconalign} 
                onPress={()=>navigation.navigate(item.navigateTo)}>
            
                    <View style={responsivestyle.imageview}>
                    <Image source={item.icon} style={responsivestyle.iconstyle}/>
                    <Text style={responsivestyle.texticon}>{item.itemName}</Text>
                    </View>       
                    <Image source={require('../../assets/image/right-arrow.png')} style={responsivestyle.arrow}/>
                </TouchableOpacity>
                );
            })}
            </View>
         </View>
         {/* logout */}
         <View>
            <TouchableOpacity onPress={handleSignout}
            style={responsivestyle.logoutview}>
                <Image source={require('../../assets/image/right-arrow.png')}
                 style={responsivestyle.arrow}/>
                <Text style={responsivestyle.textlogout}>Sign out</Text>
            </TouchableOpacity>
         </View>
         {/* contact support */}
         <View style={responsivestyle.supportview}>
            <Text style={responsivestyle.supporthead}>Contact Support</Text>
            <Text style={responsivestyle.supporttext}>If you any problem with the App,feel free to contact our 24 
                hours support system</Text>
      
                <View style={responsivestyle.contactview}>
                <Text style={responsivestyle.contacttext}>Contact</Text>
        </View>
 </View>
 </View>
    );
};
export default CustomDrawer;