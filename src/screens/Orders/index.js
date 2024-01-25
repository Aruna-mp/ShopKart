import React, { useEffect, useState } from "react";
import {FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import CustomSearch from "../../components/CustomSearch";
import Colors from "../../components/common/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import Snackbar from "react-native-snackbar";

const Orders=()=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,
            dimensions.windowHeight,
             dimensions.isPortrait
        );
    const [ordersArray, setOrdersArray] = useState([]);
    const navigation=useNavigation();
    const userId=useSelector(state=>state.userId);
    const isFocused=useIsFocused();
    useEffect(() => {
     if(isFocused){
        getOrders();
     }
    }, [isFocused]);
    useEffect(() => {
       
        navigation.setOptions({
            headerLeft:()=><CommonHeaderLeft/>,
        })
    }, []);
    const  getOrders=async()=>{
        await firestore().collection('Orders')
        .where('userId','==',userId)
        .get()
        .then(snapshot=>{
            if(snapshot.empty){
                setOrdersArray([]);
            }else{
                const objArray=[];
                snapshot?.docs.forEach(document=>{
                    if(document.exists){
                        const result={id: document.id, ...document?.data()}
                        objArray.push(result);
                    }
                })
                setOrdersArray(objArray);
            }
        })
     }
     const handleSearch=async text=>{
        await firestore().collection('Orders')
        .where('userId','==',userId)
        .orderBy('orderId')
        .startAt(text)
        .endAt(text+'\uf8ff')
        .get()
        .then(snapshot=>{
            if(snapshot.empty){
                setOrdersArray([]);
                Snackbar.show({
                    text: 'Order not found',
                   duration: Snackbar.LENGTH_SHORT,
                   backgroundColor:Colors.red,
                   textColor:Colors.white
                });
            }else{
                const objArray=[];
                snapshot?.docs.forEach(document=>{
                    if(document.exists){
                        const result={id:document.id, ...document?.data()};
                        objArray.push(result)
                    }
                });
                setOrdersArray(objArray);
            }
        })

     }
     const navigateToDetails=item=>{
        navigation.navigate('OrderDetails',{item:item})
     }
    return(
        <View style={responsivestyle.container}> 
        <CustomSearch filter={true} 
        placeholder={'Search using order ID       '}
        mike={false}
        onChangeText={handleSearch}
        />
        <FlatList
        data={ordersArray}
        extraData={ordersArray}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={responsivestyle.containerstyle}
        ListEmptyComponent={()=>{
            return(
                <View style={responsivestyle.emptyview}>
                    <Text style={responsivestyle.emptytext}>No data</Text>
                </View>
            );
        }}
        renderItem={({item,index})=>{
            return(
            <TouchableOpacity onPress={()=>navigateToDetails(item)}
            style={responsivestyle.touch}>
                <View style={responsivestyle.innerview}>
                    <View>
                        <Text style={responsivestyle.orderid}>ID:{item.orderId}</Text>
                        <Text style={responsivestyle.date}>Ordered on:{item.created}</Text>
                        <Text
                         style={responsivestyle.address}>{item.address1}</Text>
                        <Text
                         style={responsivestyle.address}>{item.address2}</Text>
                        <Text  style={responsivestyle.paid}>Paid
                            <Text  style={responsivestyle.price}> {item.totalAmount}</Text>,Items:
                            <Text  style={responsivestyle.price}>{item.cartItems.length}</Text>
                        </Text>
                    </View>
                  <Image source={require('../../assets/image/map.png')}
                  style={responsivestyle.image}/>
                </View>

                <View style={responsivestyle.rateview}> 
                <Text style={responsivestyle.order}>Order Shipped</Text>
                <Text  style={responsivestyle.order}>Rate & Review Products</Text>
                </View>
            </TouchableOpacity> 
            );
        }}
        keyExtractor={(item,index)=>String(index)}
        />
        
            
        </View>
    );
};
export default Orders;