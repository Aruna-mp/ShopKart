import { useState } from "react";
import { View,Text,Image, TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDimensionContext } from "../../../context";
import Colors from "../../../components/common/Colors";
import style from "./style";
import StarRating from "react-native-star-rating-widget";
import { useNavigation } from "@react-navigation/native";



const ProductReview=props=>{
const {product}=props;
const dimensions=useDimensionContext();
const navigation=useNavigation();
const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait);
const [rating, setRating] = useState(0);
const handleRedirect=()=>{
    navigation.navigate('Review',{product:product});
}
return(
<View style={responsivestyle.outerview}>
    <View style={responsivestyle.reviewstyle}>
        <Text style={responsivestyle.reviewhead}>
                Product Review (1)
        </Text>
        <TouchableOpacity onPress={handleRedirect}>
        <Text style={responsivestyle.seeall}>See all</Text>
        </TouchableOpacity>
    </View>
<View style={responsivestyle.innerview}>
    <View style={responsivestyle.reviewview}>
        <Image source={require('../../../assets/image/profile.png')}
        style={responsivestyle.profile}/>
        <View>
            <Text style={responsivestyle.name}>Aneesh k</Text>
            <StarRating rating={rating} onChange={()=>{}} starSize={20}/>
        </View>
    </View>
    <Text style={responsivestyle.review}>
    Lorem Ipsum has been the industry's 
    standard dummy text ever since the 1500s, when an unknown
    printer took a galley of type and scrambled it to make a 
    type specimen book.
    </Text>
</View>
</View>
  );
}
export default ProductReview;
