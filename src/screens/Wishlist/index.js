import React ,{useEffect, useState}from "react";
import {FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import { useDispatch, useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { updateCartCount } from "../../storage/action";
import CommonHeaderRight from "../../components/CommonHeaderRight";
const Wishlist=()=>{
    const dimensions=useDimensionContext();
    const navigation=useNavigation();
    const responsivestyle=style(dimensions.windowWidth,
            dimensions.windowHeight,
             dimensions.isPortrait  );
    const cartCount=useSelector(state=>state.cartCount);
    const userId=useSelector(state=>state).userId;
    const [wishItem, setWishItem] = useState();
    const  dispatch=useDispatch();
    const isFocused=useIsFocused();
    useEffect(() => {
        getWishlist();
    }, [isFocused]);
    useEffect(() => {
        navigation.setOptions({
            headerRight :()=><CommonHeaderRight cart={true}/>,
            headerLeft:()=><CommonHeaderLeft/>,

        })
     }, []);
    const getWishlist=async()=>{
        await firestore().collection('Wishlist')
        .where('userId','==',userId)
        .get()
        .then(snapshot=>{
            if(snapshot.empty){
                setWishItem([]);
            }else{
                const objArray=[];
                snapshot?.docs.forEach(document=>{
                    const result={id:document.id, ...document?.data()};
                    objArray.push(result)
                });
                setWishItem(objArray);
            }   
        })
    }
    const addToCart=async itemToAdd=>{
        console.warn('added');
        await firestore()
        .collection("Cart")
        .where("userId", "==", userId)
        .where("productId", "==", itemToAdd.id)
        .get()
        .then((snapshot) => {
            if (snapshot.empty) {
            firestore().collection("Cart").add({
                created: Date.now(),
                description: itemToAdd.description,
                name: itemToAdd.name,
                price: itemToAdd.price,
                quantity: 1,
                userId: userId,
                productId: itemToAdd.id,
                image:itemToAdd.image,
            });
            dispatch(updateCartCount(cartCount+1));
            } else {
            firestore()
                .collection("Cart")
                .doc(snapshot?.docs[0].id)
                .update({
                quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
                });
            }
        });

    }
    const removeItem= async itemToRemove=>{
        await firestore().collection('Wishlist')
        .doc(itemToRemove.id)
        .delete()
        .then(()=>{
            const filteredWishlist=wishItem.filter(ele=>ele.id !== itemToRemove.id,);
            setWishItem(filteredWishlist);
        });
    }
    const navigateToShop=()=>{
        navigation.navigate('Shop', {type:'all'});
    }
    return(
        <View style={responsivestyle.container}> 
        <FlatList
        data={wishItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=>{
            return(
                <View style={responsivestyle.emptyview}>
                    <Text style={responsivestyle.emptytext}>Your Wishlist is Empty</Text>
                    <TouchableOpacity onPress={navigateToShop}
                    style={{padding:15}}>
                        <Text style={responsivestyle.shoptext}>Go to Shop</Text>
                    </TouchableOpacity>
                </View>
            );
        }}
        renderItem={({item,index})=>{
            return(
                <View style={responsivestyle.productview}>
                    
            <Image source={{uri:item.image}}
                            style={responsivestyle.productimage}/>
            <View style={responsivestyle.secondview}>
                <Text  style={responsivestyle.title} numberOfLines={2}>{item.name}</Text>
                <Text  style={responsivestyle.desc} numberOfLines={2}>{item.description}</Text>
                <View  style={responsivestyle.bottomview}>
                    <Text style={responsivestyle.price}> ₹ {item.price}</Text>
                    {/* <View  style={responsivestyle.offview}>
                        <Text style={responsivestyle.offtext}>{item.off} OFF</Text>
                    </View> */}
                    <TouchableOpacity onPress={()=>addToCart(item)}
                    style={responsivestyle.cartview}>
                        <Text style={responsivestyle.carttext}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={()=>removeItem(item) }
            style={responsivestyle.deleteview}>
                    <Image source={require('../../assets/image/delete.png')}
                            style={responsivestyle.delete}/>
            </TouchableOpacity>
        </View>
            
            );
            }}/>
            
        </View>
    );
};
export default Wishlist;