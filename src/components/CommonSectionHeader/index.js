import { View,Text } from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
const CommonSectionHeader=props=>{
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight);
    const navigation=useNavigation();
    const handleNavigate=()=>{
        navigation.navigate('Shop',{type:'all'});
    }
    return(
        <View style={responsivestyle.headview}>
            <View>
                <Text style={responsivestyle.headtext}>{props.head}</Text>
                <Text style={responsivestyle.contenttext}>
                    {props.content}</Text>
            </View>
            <Text style={responsivestyle.seetext} onPress={handleNavigate}>
                {props.rightText}</Text>
        </View>
    );
}
export default CommonSectionHeader;