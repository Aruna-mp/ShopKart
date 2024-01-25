import React, { useCallback, useEffect, useState } from "react";
import {Text, View,Image, FlatList, TouchableOpacity } from "react-native";
import style from "./style";
import { useDimensionContext } from "../../context";
import OrderTotal from "./Components/OrderTotal";
import CommonButton from "../../components/CommonButton";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import { useDispatch, useSelector } from "react-redux";
import { updateCartCount } from "../../storage/action";
import Colors from "../../components/common/Colors";
import Snackbar from "react-native-snackbar";
const Cart=()=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const navigation=useNavigation();
    const [cartProducts, setCartProducts]=useState([]); 
    const userId=useSelector(state=>state.userId);
    const email=useSelector(state=>state.email);
    const mobileNumber=useSelector(state=>state.mobileNumber);
    const cartCount=useSelector(state=>state.cartCount);
    const dispatch=useDispatch();
    const [total, setTotal] = useState();
    const [charges, setCharges] = useState(0);
    const isFocused=useIsFocused();
    useEffect(() => {
    if(isFocused){
        getCartProducts();
    }
    }, [isFocused]);
    useEffect(() => {
        if(cartProducts.length >0){
            setCharges(50);
        }
        else{
            setCharges(0);
        }
 
    }, [cartProducts]);
       const getCartProducts=async()=>{
        await firestore().collection('Cart')
        .where('userId','==',userId)
        .get()
        .then(snapshot=>{
            if(!snapshot.empty){
                const result=[];
               let totalAmount=0;
                snapshot.docs.forEach(doc=>{
                    if(doc.exists){
                        const amount=parseFloat(doc?.data().price)*parseInt(doc?.data().quantity);
                        totalAmount=totalAmount+amount;
                        // product id
                       const reponseData={id:doc.id, ...doc?.data()}
                        result.push(reponseData);
                    }
                });
                setTotal(totalAmount);
                setCartProducts(result);
            }
            else{
                setCartProducts([]);
                setTotal(0);
            }
        }).catch(err=>{
            console.log(err);
        })
       } 
    useEffect(() => {
        navigation.setOptions({
            headerLeft:()=><CommonHeaderLeft/>
        })
     }, []);
     const updateArray=productInfo=>{
       const result= cartProducts.filter(x=>
        {return x.id !==productInfo.id
        })
        setTotal(total-parseFloat(productInfo.price));
        setCartProducts(result);
        dispatch(updateCartCount(cartCount-1));
     }
     const handleTotal=(type,productInfo)=>{
        if(type==='add'){
            setTotal(total+parseFloat(productInfo.price));
        }else{
            setTotal(total-parseFloat(productInfo.price));
        }

     }
     const onButtonPress=()=>{
        if(cartProducts.length>0){
            if(email===''|| mobileNumber===''){
                Snackbar.show({
                    text: 'You have to complete your profile to continue.',
                   duration: Snackbar.LENGTH_SHORT,
                   backgroundColor:Colors.red,
                   textColor:Colors.white
                });
                navigation.navigate('Account');
            }else{
                console.warn(parseFloat(total+charges).toFixed(2));
                navigation.navigate('AddAddress',{
                    cartProducts:cartProducts,
                    total:parseFloat(total+charges).toFixed(2)});
            }

        }else{
            Snackbar.show({
                text: 'Your cart is empty.',
               duration: Snackbar.LENGTH_SHORT,
               backgroundColor:Colors.red,
               textColor:Colors.white
            });

        }

     };
    return(
        <View style={responsivestyle.container}> 
        <FlatList
        data={cartProducts}
        extraData={cartProducts}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={()=>{
            return(
                <View style={{alignItems:'center',alignSelf:'center',justifyContent:'center',padding:30}}>
                    <Text style={{fontFamily:"Poppins-Bold",
                    fontSize:20,
                color:Colors.Gray}}
                    >Cart is empty</Text>
                    <TouchableOpacity>
                        <Text>Go To Shop</Text>
                    </TouchableOpacity>
                </View>
            );
        }}
        keyExtractor={(item,index)=>String(index)}
        renderItem={({item,index})=>(
            <RenderItem item={item} index={index} 
                 updateArray={updateArray} handleTotal={handleTotal}/>
    )}
    
    ListFooterComponent={
    <>
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
                            <Text style={responsivestyle.offertext}>40</Text>
                         
                            <View>
                                <Text style={responsivestyle.off}>%</Text>
                                <Text  style={responsivestyle.off}>OFF</Text>
                            </View>
                            <View style={{marginLeft:10}}>
                            <Text  style={responsivestyle.head}>idnight sale offer</Text>
                            <Text style={responsivestyle.content}>On all orders above ₹900</Text>
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
                                RSGHJ5
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
                    <OrderTotal total={total} charges={charges}/>
                    <CommonButton buttontext='Proceed to Checkout' 
                                onButtonPress={onButtonPress}/> 
    </>
    }
    />
     
        </View>
    );
};
const RenderItem=({item,index, updateArray,handleTotal})=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const userId= useSelector(state => state.userId);
    const [qun, setQun] = useState(item.quantity);
    const navigation=useNavigation();
    useEffect(() => {
    setQun(item.quantity);
    }, [item]);
    const addToCart = async()=> {
        console.warn(item)
        await firestore()
          .collection("Cart")
          .where("userId", "==", userId)
          .where("productId", "==", item.productId)
          .get()
          .then((snapshot) => {
              firestore()
                .collection("Cart")
                .doc(snapshot?.docs[0].id)
                .update({
                  quantity: parseInt(snapshot?.docs[0].data().quantity, 10) + 1,
                });
               handleTotal('add', item);
            }
          );
       };
       const removeItem=async()=>{
        if(qun<=1){
            // remove from cart
            await firestore()
            .collection('Cart')
            .doc(item.id).delete()
            .then(()=>{
                updateArray(item);
               
            })
        }
        else{
            // update quantity
            setQun(qun-1)
            firestore().collection('Cart').doc(item.id).update({
                quantity:parseInt(item.quantity,10)-1  ,
            })
            handleTotal('minus', item);;
        }
       }
       const redirectToProductDetails=()=>{
        navigation.navigate('ProductDetails', {product:item})
       }
    return(
        <TouchableOpacity onPress={redirectToProductDetails}
        style={responsivestyle.productview}>
                <Image source={{uri:item.image}}
                    style={responsivestyle.productimage}/>
                <View style={responsivestyle.innerview1}>
                    <Text style={responsivestyle.head1} numberOfLines={1}>{item.name}</Text>
                    <Text style={responsivestyle.des}numberOfLines={2}>{item.description}</Text>
                    <View style={responsivestyle.priceview}>
                        <View style={responsivestyle.priceview2}>
                            <Text style={responsivestyle.pricetext}>₹{item.price}</Text>
                            <View style={responsivestyle.offview}>
                                <Text style={responsivestyle.offtext}>30%</Text>
                            </View>
                        </View>
                        <View style={responsivestyle.qunview}>
                        <TouchableOpacity onPress={removeItem}>
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
export default Cart;