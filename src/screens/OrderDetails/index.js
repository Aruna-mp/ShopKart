import React, { useEffect, useState} from "react";
import { ActivityIndicator, Modal, ScrollView, Text, View } from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../../components/common/Colors";
import CustomButton from "../../components/CustomButton";
import firestore from '@react-native-firebase/firestore';
import Snackbar from "react-native-snackbar";

const OrderDetails=()=>{
    const dimensions=useDimensionContext();
    const navigation=useNavigation();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait);
    const route=useRoute();
    const { item } = route.params;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        navigation.setOptions({
        headerLeft:()=><CommonHeaderLeft type={'back'} 
        action={()=>navigation.navigate('Orders')}/>,
        title:'Order Summary'
        })
    }, []);
   const reOrder=async()=>{
    try {
        setLoading(true);
        const smallId=Math.random();
        await firestore().collection('Orders').add({
            orderId:String(smallId).slice(4,12).toUpperCase(),
            created:Date.now(),
            updated:Date.now(),
            orderStatus:'Ordered',
            totalAmount:item.totalAmount,
            address:item.address,
            userId:item.userId,
            paymentMethod:'online',
            cartItems:item.cartItems,
            userName: item.userName,
            userEmail:item.userEmail,
            userPhone:item.userPhone,
            expDelDate:'',
        })
        .then(async resp=>{
            if(resp){
                setTimeout(() => {
                    Snackbar.show({
                        text: 'Your Order is Successfully placed..!',
                       duration: Snackbar.LENGTH_SHORT,
                       backgroundColor:Colors.green,
                       textColor:Colors.white
                    }); 
                    setLoading(false);     
                },1000);
            }    
        })  
    } catch (error) {
        console.log(error);
        
    }
   }
    return(
        <View style={{flex:1}}>
            <Modal animationType='fade' transparent={true} visible={loading}>
            <View style={{
                height:'100%',
                width:'100%',
                backgroundColor:'rgba(0,0,0,0.7)',
                justifyContent:'center',
                alignItems:'center'
            }}>
            <ActivityIndicator size={'large'} color={Colors.white}/>
            </View>
            </Modal>
            <ScrollView style={responsivestyle.scroll} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={responsivestyle.contentContainerStyle}>
                <View style={responsivestyle.view1} >
                <Feather name="box" size={50} color={Colors.white} />
                    <View style={responsivestyle.idview}>
                        <Text style={responsivestyle.id}>Order Id:#{item?.orderId??'DUMMY'}</Text>
                        <Text style={responsivestyle.ordertext}>{item?.orderStatus??''}</Text>
                    </View>
                </View>

                <View style={responsivestyle.view2}>
                    <Text  style={responsivestyle.head}>Items:</Text>
                    {item?.cartItems &&
                    item.cartItems.map((ele,index)=>{
                    return(
                        <View key={index} style={responsivestyle.outerview}>
                            <View style={responsivestyle.innerview}>
                                <Text  style={responsivestyle.quantity}>{ele.quantity}</Text>
                            </View>
                            <FontAwesome5 name="star-of-life" size={17} color={Colors.jetblack} />
                            <View style={responsivestyle.itemview}>
                                <Text  style={responsivestyle.name}>{ele.name}</Text>
                                <Text  style={responsivestyle.desc}>{ele.description}</Text>
                            </View>
                            <View style={responsivestyle.priceview}>
                            <Text  style={responsivestyle.price}>₹ {ele.price}</Text>
                        </View>
                        </View>
                        );
                    })}
                </View>

                <View style={responsivestyle.view2}>
                    <Text style={responsivestyle.head}>Payment Details</Text>
                    <View style={responsivestyle.payment}>
                        <View>
                            <Text style={responsivestyle.text}>Bag Total</Text>
                            <Text style={responsivestyle.text}>Coupon Discount</Text>
                            <Text style={responsivestyle.text}>Delivery</Text>
                        </View>
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={responsivestyle.text}>₹ 1345.00</Text>
                            <Text style={responsivestyle.coupon}>Apply Coupon</Text>
                            <Text style={responsivestyle.text}>₹ 50.00</Text>
                        </View>
                    </View>
                </View>

                <View  style={responsivestyle.totalview}>
                    <Text style={responsivestyle.total}>Total Amount</Text>
                    <Text style={responsivestyle.total}>₹ {item.totalAmount}</Text>
                </View>

                <View style={responsivestyle.view2}>
                    <Text style={responsivestyle.head}>Address:</Text>
                    <Text style={responsivestyle.address}>Sreeshivam</Text>
                    <Text style={responsivestyle.address}>Kozhikode,</Text>
                    <Text style={responsivestyle.address}>kerala</Text>
                </View>

                <View style={responsivestyle.view2}>
                    <Text style={responsivestyle.head}>Payment Method:</Text>
                    <View style={responsivestyle.iconview}>
                        <FontAwesome name="cc-visa" size={30} color={Colors.black} />
                        <View style={responsivestyle.onlineview}>
                            <Text  style={responsivestyle.online}>**** **** **** 2345</Text>
                            <Text  style={responsivestyle.online}>{item?.paymentMethod??''}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            <View style={responsivestyle.button}>
                    <CustomButton type='primary' 
                    handleButtonPress={reOrder}
                     buttonText={'Reorder'}/>
            </View>
        </View>
    );
}
export default OrderDetails;
