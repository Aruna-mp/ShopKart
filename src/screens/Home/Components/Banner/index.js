import React, { useEffect, useState } from "react";
import {View ,Text, ImageBackground, TouchableOpacity} from "react-native";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import { useDimensionContext } from "../../../../context";
import { FlatList } from "react-native-gesture-handler";
import firestore from '@react-native-firebase/firestore';

const Banner=()=>{
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const [bannerItems,setbannerItems]=useState([]);
    useEffect(()=>{
        getBanners();
    },[]);
    const getBanners=async()=>{
        await firestore().collection('Banners').get().then(snapshot=>{
            if(!snapshot.empty){
                const result=[];
                 console.log(snapshot.docs);
                snapshot.docs.forEach(doc=>{
                    if(doc.exists){
                        // console.warn(doc);
                        result.push(doc.data());
                    }
                });
                setbannerItems(result);
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <View>
            <FlatList data={bannerItems} 
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index)=>String(index)}
        renderItem={({item,index})=>{
        return(
           <ImageBackground source={{uri:item.image}} 
           style={responsivestyle.banner}>
                <View style={responsivestyle.innerview}>
                    <Text style={responsivestyle.head} >{item.head}</Text>
                    <Text style={responsivestyle.content}>{item.description}</Text>
                    <TouchableOpacity style={responsivestyle.touch}>
                        <Text style={responsivestyle.touchtext}>Shop Now</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        )
        }
    }/>
        </View>
    );
};
export default Banner;