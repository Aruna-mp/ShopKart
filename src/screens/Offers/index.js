import React, { useEffect } from "react";
import {View,Text,ScrollView, Dimensions, FlatList } from "react-native";
import style from "./style";
import CustomSearch from "../../components/CustomSearch";
import { useDimensionContext } from "../../context";
import { useNavigation } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
const Offers=()=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const navigation=useNavigation();
    useEffect(() => {
        navigation.setOptions({
            headerLeft:()=><CommonHeaderLeft/>
        })
     }, []);
    const offerArray=[
        {
            offer:41,
            head:'Midnight sale offer',
            content:'On all orders above ₹900',
            code:'RSGHJ5',
        },
        {
            offer:41,
            head:'Monsoon sale offer',
            content:'On all orders above ₹900',
            code:'RSGHJ5',
        },
        {
            offer:41,
            head:'Christmas sale offer',
            content:'On all orders above ₹900',
            code:'RSGHJ5',
        },
        {
            offer:50,
            head:'Special sale offer',
            content:'On all orders above ₹500',
            code:'RSGHJ5',
        },
        {
            offer:90,
            head:'Onam sale offer',
            content:'On all orders above ₹10000',
            code:'RSGHJ5',
        },
        {
            offer:75,
            head:'Eid sale offer',
            content:'On all orders above ₹5000',
            code:'RSGHJ5',
        },
    ]
    return(
        <View style={style.main}>
        <ScrollView style={style.container}
        nestedScrollEnabled 
        showsVerticalScrollIndicator={false}>
        <CustomSearch/>
       
            <FlatList
            data={offerArray}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item,index)=>String(index)}
            contentContainerStyle={responsivestyle.flatlist}
            renderItem={({item,index})=>{
                return(
                    <View style={responsivestyle.outerview}>
                        {/* start design */}
                        <View style={responsivestyle.bview}>
                        <View>
                        <View style={responsivestyle.innerview}></View>
                        <View style={responsivestyle.innerview}></View>
                        <View style={responsivestyle.innerview}></View>
                        <View style={responsivestyle.innerview}></View>
                        </View>
                        </View>
        
                        <View style={responsivestyle.leftview}>
                            <View style={responsivestyle.insideleft}>
                            <Text style={responsivestyle.offertext}>{item.offer}</Text>
                         
                            <View>
                                <Text style={responsivestyle.off}>%</Text>
                                <Text  style={responsivestyle.off}>OFF</Text>
                            </View>
                            <View style={{marginLeft:10}}>
                            <Text  style={responsivestyle.head}>{item.head}</Text>
                            <Text style={responsivestyle.content}>{item.content}</Text>
                            </View>
                            
                            </View>
                         </View>
                          <View style={responsivestyle.bg}>
                           <View style={responsivestyle.sideview}></View>
                        <View style={responsivestyle.sideview2}></View> 
                        </View>
                        <View style={responsivestyle.right}>
                            <Text style={responsivestyle.codehead}>Use Code</Text>
                            <View style={responsivestyle.codeview}>
                                <Text style={responsivestyle.codetext}>
                                    {item.code}
                                </Text>
                            </View>
                         </View>
                         {/* end design */}
                        <View  style={{marginLeft:-25/2}}>
                        <View>
                        <View style={responsivestyle.innerview}></View>
                        <View style={responsivestyle.innerview}></View>
                        <View style={responsivestyle.innerview}></View>
                        <View style={responsivestyle.innerview}></View>
                        </View>
                        </View>
        
        
                    </View>
                );

            }}
            />
        </ScrollView>
        </View>
    );
};
export default Offers;