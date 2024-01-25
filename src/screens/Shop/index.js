import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import style from "./style";
import { useDimensionContext } from "../../context";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import CommonHeaderRight from "../../components/CommonHeaderRight";
import CustomSearch from "../../components/CustomSearch";
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import CommonEmpty from "../../components/CommonEmpty";


const Shop=()=>{
    const dimensions=useDimensionContext();
    const navigation=useNavigation();
    const categories=useSelector(state=>state.categories);
    const responsivestyle=style(dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait);
    const route=useRoute();
    const { type } = route.params;
    const [selectedCategory, setSelectedCategory] = useState(type);
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
    useEffect(() => {
        if(type==='all'){
            setSelectedCategory('Shop');
        }
   
    }, [type]);   
    useEffect(() => {
            navigation.setOptions({
                headerLeft:()=><CommonHeaderLeft type='back'/>,
                headerRight:()=><CommonHeaderRight cart={true}/>,
                title:selectedCategory, })
             }, [selectedCategory]);
    const handleCategories=async item=>{
            console.warn(item.id);
            setSelectedCategory(item.name); 
            await firestore()
            .collection('Products')
            .where('categoryId','==',item.id)
            .get()
            .then(snapshot=>{
                if(!snapshot.empty){
                    const result=[];
                    console.log(snapshot.docs);
                    snapshot.docs.forEach(doc=>{
                        if(doc.exists){
                            const reponseData={id:doc.id, ...doc?.data()}
                            result.push(reponseData);
                        }
                    });
                    setProduct(result.length>0?result:[]);
                }
                else{
                    setProduct([]);
                }
            }).catch(err=>{
                console.log(err);
            })
         }
        const handleRenderItem=({item,index})=>{
            return(
                <TouchableOpacity style={responsivestyle.catitemview}
                onPress={()=>handleCategories(item)}>
                    <Text style={responsivestyle.catitem}>{item.name}</Text>
                </TouchableOpacity>
               
            );

        };
        const handleProduct=item=>{
           navigation.navigate('ProductDetails',{product:item});
        }
        const handleProductsRender=({item,index})=>{
            return(
                <TouchableOpacity onPress={()=>handleProduct(item)}
                style={responsivestyle.productview}>
                    <Image source={{uri:item.image}}
                    style={responsivestyle.productimage}/>
                    <View style={responsivestyle.innerview1}>
                    <Text style={responsivestyle.head1} numberOfLines={1}> {item.name} </Text>
                    <Text style={responsivestyle.des}numberOfLines={2}> {item.description} </Text>
                    <View style={responsivestyle.priceview}>
                    <View style={responsivestyle.priceview2}>
                        <Text style={responsivestyle.pricetext}> ₹ {item.price} </Text>
                        <View style={responsivestyle.offview}>
                            <Text style={responsivestyle.offtext}>30%</Text>
                        </View>
                    </View>
                    <View style={responsivestyle.qunview}>
                        <Text style={responsivestyle.quntext1}>-</Text>
                        <Text style={responsivestyle.quntext2}>0</Text>
                        <Text style={responsivestyle.quntext1}>+</Text>
                    </View>
                    </View>
                    </View>
                    </TouchableOpacity> 

            );
        }
        const emptyComponent=()=>{
            return(
            <CommonEmpty title={"No products available.!"}/>
            );
        }
    return(
        <View style={responsivestyle.container}>
            <FlatList data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={responsivestyle.categories}
            contentContainerStyle={responsivestyle.contentstyle}
            renderItem={handleRenderItem}
            />
            <CustomSearch filter={true}/>
            <View style={responsivestyle.outerview}>
            
            <FlatList data={product}
            showsVerticalScrollIndicator={false}
            renderItem={handleProductsRender}
            ListEmptyComponent={emptyComponent}
           
            />
                
            
                    </View>
            </View>
    );
}
export default Shop;