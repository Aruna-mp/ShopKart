import React, { useEffect, useRef } from "react";
import {ScrollView, Text, View } from "react-native";
import style from "./style";
import CustomSearch from "../../components/CustomSearch";
import Banner from "./Components/Banner";
import CommonHeader from "../../components/CommonHeader";
import RecentBought from "./Components/RecentBought";
import ShopCategory from "./Components/ShopCategory";
import ProductScroll from "../../components/ProductScroll";
import OfferProducts from "../../components/OfferProducts";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { updateWishIds } from "../../storage/action";
import { useIsFocused } from "@react-navigation/native";

const Home=()=>{
    const userId=useSelector(state=>state).userId;
    const dispatch=useDispatch();
    const scrollRef=useRef(null);
    const isFocused=useIsFocused();
    useEffect(() => {
        if(isFocused){
            scrollRef.current.scrollTo({y:0,animated:true})
        }
    }, [isFocused]);
    
    useEffect(() => {
        getWishIds();
    }, []);
    
    const getWishIds=async ()=>{
        await firestore().collection('Wishlist')
        .where('userId','==',userId)
        .get()
        .then(snapshot=>{
            if(snapshot.empty){
                dispatch(updateWishIds([]))
            }else{
                const idArray=[];
                snapshot?.docs.forEach(document=>{
                    idArray.push(document?.data().productId)
                });
                dispatch(updateWishIds(idArray));
            }   
        })
    }
    return(
        <View style={style.main}>
        <CommonHeader/>
        <ScrollView ref={scrollRef}
        style={style.container}
        nestedScrollEnabled 
        showsVerticalScrollIndicator={false}> 
           
            <CustomSearch/>
            <Banner/>
            <RecentBought/>
            <ShopCategory/>
            <ProductScroll/>
            <OfferProducts/>
            <Text style={style.foottext}>Didn't find what you are looking for?</Text>
            <View style={style.footview}>
                <Text style={style.footbuttontext}>Browse categoey</Text></View>
        </ScrollView>
        </View>
    );
};
export default Home;