import React, { useEffect } from "react";
import {View,ScrollView } from "react-native";
import style from "./style";

import CustomSearch from "../../components/CustomSearch";
import OfferProducts from "../../components/OfferProducts";
import Trending from "./Components/Trending";
import { useNavigation } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
const Search=()=>{
    const navigation=useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerLeft:()=><CommonHeaderLeft/>
            //  type={'back'}/>,
        })
     }, []);
    return(
        <View style={style.main}>
        <ScrollView style={style.container}
        nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <CustomSearch/>
        <Trending/>
        <OfferProducts/>
        </ScrollView>
        
        </View>
    );
};
export default Search;