import React ,{ useEffect, useState }from "react";
import {FlatList, ScrollView ,Text, View,Image, TouchableOpacity, ImageBackground} from "react-native";
import style from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomSearch from "../../components/CustomSearch";
import { useDimensionContext } from "../../context";
import firestore from '@react-native-firebase/firestore';
import Colors from "../../components/common/Colors";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import { useSelector } from "react-redux";
const Categories=()=>{
    const dimensions=useDimensionContext();
    const categories=useSelector(state=> state.categories)
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const [product,setProduct]=useState([]);
    const [active, setActive]=useState(0);
    const navigation=useNavigation();
    const route=useRoute();
    const { catIndex=0 }=route?.params??{};
    useEffect(() => {
        setActive(catIndex);
    }, [catIndex]);
    
    useEffect(()=>{
        navigation.setOptions({
            headerLeft:()=><CommonHeaderLeft/>,
        })
     getProduct();
    },[])
    
    const getProduct=async()=>{
        await firestore().collection('Products').get().then(snapshot=>{
            if(!snapshot.empty){
                const result=[];
                console.log(snapshot.docs);
                snapshot.docs.forEach(doc=>{
                    if(doc.exists){
                        console.warn(doc);
                        result.push(doc.data());
                    }
                });
                setProduct(result);
            }
        }).catch(err=>{
            console.log(err);
        })
       } 
    const handleCategoryTouch=index=>{
        setActive(index);
    }
    const handleProduct=item=>{
        navigation.navigate('ProductDetails',{product:item});
    }
    
    return(
        <View style={responsivestyle.main}>
        <ScrollView style={responsivestyle.container}
        nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <CustomSearch/>
       
        <View style={responsivestyle.rowview}>
            {/* side bar */}
        <View>
            <FlatList
            data={categories}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={responsivestyle.catflatstyle}
            renderItem={({item,index})=>{
                return(
                    <TouchableOpacity 
                    style={[responsivestyle.cattouch,
                        {backgroundColor:index===active?Colors.white:'transparent'}]}
                    onPress={()=>handleCategoryTouch(index)}>
                    <Image source={{uri:item.image}}
                            style={responsivestyle.image}/>
                            </TouchableOpacity>
                );
            }}/>
        </View>
        {/* content */}
        <ScrollView showsVerticalScrollIndicator={false}>
            <ImageBackground source={require('../../assets/image/Fruitshome.png')}
            style={responsivestyle.backimage}>
                <Text numberOfLines={1} style={responsivestyle.name}>
                    {categories[active]?.name}
                </Text>
                <Text numberOfLines={3} style={responsivestyle.desc}>
                    {categories[active]?.description}
                </Text>
            </ImageBackground>
            <FlatList
            data={product} 
            numColumns={4}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item,index)=>String(index)}
            contentContainerStyle={responsivestyle.prostyle}
            renderItem={({item,index})=>{
                return(
                    <TouchableOpacity onPress={()=>handleProduct(item)}
                    style={responsivestyle.procontainer}>
                        <View style={responsivestyle.imagebg}>
                        <Image source={{uri:item.image}} 
                        style={responsivestyle.proimage}/>
                        </View>
                        <Text style={responsivestyle.proname}>{item.name}</Text>
                        <Text style={responsivestyle.prodesc}>₹{item.price}</Text>
                    </TouchableOpacity>
                );
            }
            }/>

        </ScrollView>
        </View>
        </ScrollView>
        </View>
    );
};
export default Categories;