import React, { useEffect, useRef, useState } from "react";
import {Image, Text, View,TouchableOpacity, ScrollView} from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import CommonHeaderRight from "../../components/CommonHeaderRight";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../../components/common/Colors";
import StarRating from 'react-native-star-rating-widget';
import Moreinfo from "./Components/Moreinfo";
import Extrainfo from "./Components/Extrainfo";
import ProductReview from "./Components/ProductReview";
import Deliveryinfo from "./Components/Deliveryinfo";
import ProductScroll from "../../components/ProductScroll";
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import { updateCartCount, updateWishIds } from "../../storage/action";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "react-native-snackbar";
const ProductDetails =props=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait);
    const navigation=useNavigation();
    const route=useRoute();
    const { product } = route.params;
    const scrollRef=useRef(null);
    const [qun, setQun] = useState(1);
    const [rating, setRating] = useState(5);
    const [productDetailsObj, setProductDetails] = useState({});
    const cartCount = useSelector(state => state.cartCount);
    const userId = useSelector(state => state.userId);
    const wishIds = useSelector(state => state.wishIds);
    const  dispatch=useDispatch();
    // console.warn(product);
    useEffect(() => {
        navigation.setOptions({
            headerLeft:()=><CommonHeaderLeft type='back'/>,
            headerRight:()=><CommonHeaderRight cart={true} share={true}/>,
            title:'', })
        }, []);
    
    useEffect(() => {
        setProductDetails(product);
    }, [product]);
    const navigationNeeded=(val,item)=>{
    if(val){
        scrollRef.current.scrollTo({x:0,y:0,animated:true});
        setProductDetails(item);
    }
    }
const handleQuantity=type=>{
    if(type==='plus'){
        setQun(qun+1);

    }
    else {
        if(qun===1){
            return;
         }
        else{
            setQun(qun-1);
         }
    }       

}
const handleAddToCart=async()=>{
        await firestore()
          .collection("Cart")
          .where("userId", "==", userId)
          .where("productId", "==", productDetailsObj.id)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              firestore().collection("Cart").add({
                created: Date.now(),
                description: productDetailsObj.description,
                name: productDetailsObj.name,
                price: productDetailsObj.price,
                quantity: qun,
                userId: userId,
                productId: productDetailsObj.id,
                image: productDetailsObj.image,
              });
              dispatch(updateCartCount(cartCount+1));
            } else {
              firestore()
                .collection("Cart")
                .doc(snapshot?.docs[0].id)
                .update({
                  quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + qun,
                });
            }
          });   
}
const addToWishlist=productDetails=>{
    // console.warn(productDetails)
    firestore()
    .collection('Wishlist')
    .where('userId','==',userId)
    .where('productId','==',productDetails.id)
    .get()
    .then(snapshot=>{
        if(snapshot.empty){
            firestore().collection("Wishlist")
            .add({
                created: Date.now(),
                updated:Date.now(),
                description: productDetails.description,
                name: productDetails.name,
                price: productDetails.price,
                userId: userId,
                image: productDetails.image,
                categoryId:productDetails.categoryId,
                productId:productDetails.id
              })
              .then(resp=>{
                dispatch(updateWishIds([...wishIds,productDetails.id]));
                Snackbar.show({
                    text: 'Item added to wishlist.!',
                   duration: Snackbar.LENGTH_SHORT,
                   backgroundColor:Colors.green,
                   textColor:Colors.white
                });
              });
            }else{
                Snackbar.show({
                    text: 'Item is in your wishlist.!',
                   duration: Snackbar.LENGTH_SHORT,
                   backgroundColor:Colors.green,
                   textColor:Colors.white
                });
            }

        });
    }
    return(
        <View>
        <ScrollView ref={scrollRef}>
            <View style={responsivestyle.heart}>
                <TouchableOpacity onPress={()=>addToWishlist(productDetailsObj)}>
                    <Image source={ wishIds.includes(productDetailsObj.id)
                    ?require('../../assets/image/wishlist-red.png')
                    :require('../../assets/image/wishlist.png')}
                    style={responsivestyle.wishlist}/>
                </TouchableOpacity>
            </View>
            <Image source={{uri:productDetailsObj.image}} style={responsivestyle.proimage}/>
            <View  style={responsivestyle.mainview}>
                <View style={responsivestyle.padding}>
                <Text  style={responsivestyle.title}>{productDetailsObj.name}</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <StarRating rating={rating} onChange={setRating} starSize={25}/>
                <Text style={responsivestyle.rating}>
                    (1 rating)
                </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text  style={responsivestyle.price}>
                    ₹ {parseFloat(productDetailsObj.price).toFixed(2)}
                </Text>
                <Text style={responsivestyle.off}> 25% OFF
                </Text>
            </View>
            <Moreinfo/>
            <View style={responsivestyle.productview}>
                <Text  style={responsivestyle.deschead}> Product Details</Text>
                <Text  style={responsivestyle.description}>{productDetailsObj.description}</Text>
                </View>
                <Extrainfo/>
                <ProductReview product={product}/>
                <Deliveryinfo/>
                </View>
                <ProductScroll isNavigationNeeded={navigationNeeded}/>
            </View>
            
        </ScrollView>
        <View style={responsivestyle.cartview}>
            <View style={responsivestyle.cartinner}>
                <TouchableOpacity onPress={()=>handleQuantity('minus')}>
                <AntDesign name="minus" size={20} color={Colors.green} />
                </TouchableOpacity>
                <Text style={responsivestyle.quantity}>{qun}</Text>
                <TouchableOpacity onPress={()=>handleQuantity('plus')}>
                <AntDesign name="plus" size={20} color={Colors.green} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleAddToCart}>
            <Text  style={responsivestyle.add}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    </View>
        );
}
export default ProductDetails;