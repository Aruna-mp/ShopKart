import React, { useEffect, useState } from "react";
import { View ,Text, Image, FlatList, TouchableOpacity} from "react-native";
import style from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDimensionContext } from "../../context";
import CommonSectionHeader from "../CommonSectionHeader";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { updateCartCount, updateWishIds } from "../../storage/action";
import Colors from "../common/Colors";
import Snackbar from "react-native-snackbar";
const ProductScroll=props=>{
    const{isNavigationNeeded}=props;
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const route=useRoute();
    const [product,setProduct]=useState([]);
    const cartCount = useSelector(state => state.cartCount);
    const userId = useSelector(state => state.userId);
    const wishIds = useSelector(state => state.wishIds);
    const dispatch=useDispatch();
    useEffect(()=>{
     getProduct();
    },[])
    const getProduct=async()=>{
     await firestore().collection('Products').get().then(snapshot=>{
         if(!snapshot.empty){
             const result=[];
             console.log(snapshot.docs);
             snapshot.docs.forEach(doc=>{
                 if(doc.exists){
                    // product id
                    const reponseData={id:doc.id, ...doc?.data()}
                     result.push(reponseData);
                 }
             });
             setProduct(result);
         }
     }).catch(err=>{
         console.log(err);
     })
    } 
    const handleProduct=item=>{
        if(route.name==='ProductDetails'){
           
            isNavigationNeeded(true,item);
        }else{
            navigation.navigate('ProductDetails',{product:item});
        }
   
     }
     const addToCart = async item => {
        console.warn(item)
        await firestore()
          .collection("Cart")
          .where("userId", "==", userId)
          .where("productId", "==", item.id)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              firestore().collection("Cart").add({
                created: Date.now(),
                description: item.description,
                name: item.name,
                price: item.price,
                quantity: 1,
                userId: userId,
                productId: item.id,
                image: item.image,
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
      };
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
    <View style={responsivestyle.container}> 
    <CommonSectionHeader 
    head={'Newly Added'} 
    content={'Pay less,Get more'}
    rightText={'See All'}
    />
        <View>
            <FlatList
            data={product}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item,index)=>String(index)}
            renderItem={({item,index})=>{
                return(
                    <TouchableOpacity style={responsivestyle.borderview}
                    onPress={()=>handleProduct(item)}>
                    <TouchableOpacity onPress={()=>addToWishlist(item)}>
                        <Image source={ wishIds.includes(item.id)
                        ?require('../../assets/image/wishlist-red.png')
                        :require('../../assets/image/wishlist.png')}
                        style={responsivestyle.wishlist}/>
                    </TouchableOpacity>
                    <Image source={{uri:item.image}}
                    style={responsivestyle.image}/>
                    <Text style={responsivestyle.head} numberOfLines={1}>{item.name}</Text>
                    <Text style={responsivestyle.content}numberOfLines={2}>{item.description}</Text>
                    <View style={responsivestyle.priceview}>
                        <Text style={responsivestyle.price}>{item.price}</Text>
                        <TouchableOpacity onPress={()=>addToCart(item)}
                        style={responsivestyle.plusview}>
                        <Text style={responsivestyle.plus}>+</Text>
                    </TouchableOpacity>
                    </View>
                    </TouchableOpacity>
                );
            }}/>
        </View>
        </View>
        
       
    );
};
export default ProductScroll;