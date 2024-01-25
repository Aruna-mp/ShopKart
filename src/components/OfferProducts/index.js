import React, { useEffect, useState } from "react";
import { View ,Text, Image, TouchableOpacity} from "react-native";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import { useDimensionContext } from "../../context";
import { FlatList } from "react-native-gesture-handler";
import CommonSectionHeader from "../CommonSectionHeader";
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from "react-redux";
import { updateCartCount } from "../../storage/action";
const OfferProducts=()=>{
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const [product,setProduct]=useState([]);
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
    return(
        <View style={responsivestyle.container}> 
    <CommonSectionHeader 
    head={'Say Hello to Offers'} 
    content={'Best price ever for all the time.'}
    rightText={'See All'}
    />
        <View>
            <FlatList
            data={product}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item,index)=>String(index)}
            renderItem={({item,index})=>(<RenderItem item={item} index={index}/>  )}/>
        </View>
        </View> 
    );
};
const RenderItem=({item,index})=>{
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const [qun, setQun] = useState(0);
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const cartCount = useSelector(state => state.cartCount);
    const userId = useSelector(state => state.userId);
    const  dispatch=useDispatch();
    const handleProduct=()=>{
        navigation.navigate('ProductDetails',{product:item})
       }
    const addToCart = async()=> {
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
    return(
        <TouchableOpacity onPress={handleProduct} 
                    style={responsivestyle.productview}>
                    <Image source={{uri:item.image}}
                    style={responsivestyle.productimage}/>
                    <View style={responsivestyle.innerview}>
                    <Text style={responsivestyle.head} numberOfLines={1}>{item.name}</Text>
                    <Text style={responsivestyle.des}numberOfLines={2}>{item.description}</Text>
                    <View style={responsivestyle.priceview}>
                    <View style={responsivestyle.priceview2}>
                        <Text style={responsivestyle.pricetext}>₹{item.price}</Text>
                        <View style={responsivestyle.offview}>
                            <Text style={responsivestyle.offtext}>10%</Text>
                        </View>
                    </View>
                    <View style={responsivestyle.qunview}>
                        <TouchableOpacity onPress={()=>{setQun(qun<=0?qun:qun-1)}}>
                            <Text style={responsivestyle.quntext1}>-</Text>
                        </TouchableOpacity>
                        <Text style={responsivestyle.quntext2}>{qun}</Text>
                        <TouchableOpacity onPress={()=>{setQun(qun+1), addToCart()}}>
                            <Text style={responsivestyle.quntext1}>+</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
                    </TouchableOpacity>
    );
}
export default OfferProducts;