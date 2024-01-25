import { useEffect, useState } from "react";
import { View,Text ,FlatList, Image, TouchableOpacity} from "react-native";
import { useDimensionContext } from "../../../../context";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';

const RecentBought=()=>{
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const [recentItem,setRecentItem]=useState([]);
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
                     console.warn(doc);
                     result.push(doc.data());
                 }
             });
             setRecentItem(result);
         }
     }).catch(err=>{
         console.log(err);
     })
    } 
    const handleProduct=item=>{
        navigation.navigate('ProductDetails',{product:item})
    }
    return(
        <View style={responsivestyle.Container}>
            <Text style={responsivestyle.head}>Buy from recently Bought</Text>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item,index)=>String(index)}
            data={recentItem}
            renderItem={({item,index})=>{
                return(
                    <TouchableOpacity onPress={()=>handleProduct(item)}
                    style={responsivestyle.contentview}>
                        <Image source={{uri:item.image}}
                        style={responsivestyle.image}/>
                    </TouchableOpacity>
                );
            }}/>
        </View>
    );
}
export default RecentBought;