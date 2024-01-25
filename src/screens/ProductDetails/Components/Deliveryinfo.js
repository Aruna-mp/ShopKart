import { View,Text } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDimensionContext } from "../../../context";
import Colors from "../../../components/common/Colors";
import style from "./style";
import CustumTextInput from "../../../components/CustumTextInput";

const Deliveryinfo=()=>{
const dimensions=useDimensionContext();
const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait);
 return(
     <View>
        <Text style={responsivestyle.deliveryhead}>Check Delivery</Text>
        <Text style={responsivestyle.commontext}>
            Enter pincode to check delivery date/pickup option.
        </Text>
        <CustumTextInput 
            type={'default'} 
            check={true}
            handleText={()=>console.warn('hello')} 
            placeholder={' Pin code   '}/>
        <Text style={responsivestyle.commontext}>
            Free delivery on orders above ₹200.00.
        </Text>
        <Text style={responsivestyle.commontext}>
            Cash on delivery available.
        </Text>
        <Text style={responsivestyle.commontext}>
            Easy 21 days return & exchange.
        </Text>
    </View>
  );
}
export default Deliveryinfo;
