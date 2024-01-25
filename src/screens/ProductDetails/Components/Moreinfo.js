import { View,Text } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDimensionContext } from "../../../context";
import Colors from "../../../components/common/Colors";
import style from "./style";

const Moreinfo=props=>{
const dimensions=useDimensionContext();
const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait);
 return(
    <View style={responsivestyle.container}>
    <View style={responsivestyle.box}>
        <Text style={responsivestyle.boxtext}>500gm/ ₹60.00</Text>
        <AntDesign name="down" size={25} color={Colors.Gray} />
    </View>
    <View style={responsivestyle.box}>
        <Text style={responsivestyle.boxtext}>Delivery Time</Text>
        <AntDesign name="down" size={25} color={Colors.Gray} />
    </View>
</View>
  );
}
export default Moreinfo;
