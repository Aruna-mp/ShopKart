import React, { useEffect, useRef, useState } from "react";
import { Image, View,Text, ScrollView } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { useNavigation } from "@react-navigation/native";
import { useDimensionContext } from "../../context";
import style from "./style";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import CommonHeaderRight from "../../components/CommonHeaderRight";
import StarRating from "react-native-star-rating-widget";
import CustumTextInput from "../../components/CustumTextInput";
import CustomButton from "../../components/CustomButton";
const Review=()=>{
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait);
    const [rating, setRating] = useState(5);
    const actionSheetRef = useRef(null);
    useEffect(() => {
        navigation.setOptions({
        headerLeft:()=><CommonHeaderLeft type='back'/>,
        headerRight:()=>(<CommonHeaderRight plus={true} 
        handlePlusIcon={openActionSheet}/>),
             title:'Reviews', });
        }, []);
    const openActionSheet=()=>{
        actionSheetRef.current.show();
    }
        
    return(
        <ScrollView showsVerticalScrollIndicator={false}
        style={responsivestyle.container}>
            <View style={responsivestyle.innerview}>
                <View style={responsivestyle.reviewview}>
                    <Image source={require('../../assets/image/profile.png')}
                    style={responsivestyle.profile}/>
                    <View>
                        <Text style={responsivestyle.name}>Aneesh k</Text>
                        <StarRating rating={rating} onChange={setRating} starSize={20}/>
                    </View>
                </View>
                <Text style={responsivestyle.review}>
                Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a 
                type specimen book.
                </Text>
            </View>
            <ActionSheet ref={actionSheetRef}>
               <View style={responsivestyle.actionview}>
               <Text style={responsivestyle.head}>Write a review</Text>
               <StarRating rating={rating} onChange={setRating} starSize={40}/>
               <CustumTextInput placeholder='Write here    ' 
               multiline={true}/>
               <CustomButton buttonText={'Submit Review   '} type={'primary'}/>
               </View>
            </ActionSheet>
           

        </ScrollView>
    );
}
export default Review;