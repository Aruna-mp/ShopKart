import React, { useEffect, useState } from "react";
import {View,Text,ScrollView, FlatList, Image } from "react-native";
import style from "./style";
import firestore from '@react-native-firebase/firestore';
import { useDimensionContext } from "../../../../context";
import Colors from "../../../../components/common/Colors";
import { useSelector } from "react-redux";

const Trending=()=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
   const categories=useSelector(state=>state.categories);
    return(
        <View style={responsivestyle.main}>
            <Text style={responsivestyle.title}>
                Trending Category
            </Text>
            <FlatList
            data={categories} 
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item,index)=>String(index)}
            contentContainerStyle={responsivestyle.flatlist}
            renderItem={({item,index})=>{
                const CategoiesColor=
                    index%4==0
                    ?Colors.category1
                    : index%4==1
                    ?Colors.category2
                    : index%4==2
                    ?Colors.category3
                    : index%4==3
                    ?Colors.category4
                    :Colors.category1;
                return(
                    <View style={[responsivestyle.imgview,{backgroundColor:CategoiesColor}]}>
                        <Image source={{uri:item.image}}
                        style={responsivestyle.image}/>
                    </View>
                );

            }
            }/>

            
        
        </View>
    );
};
export default Trending;