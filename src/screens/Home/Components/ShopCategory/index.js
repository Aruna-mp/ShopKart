import { Text, View,FlatList, Image, TouchableOpacity } from "react-native";
import { useDimensionContext } from "../../../../context";
import style from "./style";
import Colors from "../../../../components/common/Colors";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from "react-redux";
import { categories } from "../../../../storage/action";
import { useNavigation } from "@react-navigation/native";
const ShopCategory=()=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
   const navigation=useNavigation();
    const [category,setCategory]=useState([]);
   const dispatch=useDispatch();
   
   useEffect(()=>{
    getCategory();
   },[])
   const getCategory=async()=>{
    await firestore().collection('Categories').get().then(snapshot=>{
        if(!snapshot.empty){
            const result=[];
            console.log(snapshot.docs);
            snapshot.docs.forEach(doc=>{
                if(doc.exists){
                    // for id retrieval from firebase
                   const responseData={id:doc.id, ...doc?.data()}
                    result.push(responseData);
                }
            });
            setCategory(result);
            dispatch(categories(result))
        }
    }).catch(err=>{
        console.log(err);
    })
   }
   const handleCategories= index =>{
    navigation.navigate('Categories',{catIndex:index});

   }
    return(
        <View style={responsivestyle.Container}>
            <Text style={responsivestyle.text}>Shop By Category</Text>
            <FlatList
            data={category} 
            numColumns={4}
            contentContainerStyle={responsivestyle.flatlist}
            keyExtractor={(item,index)=>String(index)}
            renderItem={({item,index})=>{
                const CategoiesColor=
                    index%4==0
                    ?Colors.category1
                    : index%4==1
                    ?Colors.category2
                    : index%4==2
                    ?Colors.category3
                    : index%4==3
                    ?Colors.category4
                    :Colors.category1;
                return(
                    
                    <TouchableOpacity onPress={()=>handleCategories(index)}
                    style={responsivestyle.innerview}>
                        <View style={[responsivestyle.imageview,
                            {backgroundColor:CategoiesColor}]}>
                            <Image source={{uri:item.image}}
                            style={responsivestyle.image}/>
                        </View>
                        <Text style={responsivestyle.category}>{item.name}</Text>
                    </TouchableOpacity>
                );
            }}/>

        </View>
    );
}
export default ShopCategory;