import React from "react";
import {Text, View } from "react-native";
import style from "./style";
import { useDimensionContext } from "../../../../context";
import Colors from "../../../../components/common/Colors";
const OrderTotal=props=>{
    const {total,charges}=props;
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait);
    return(
        <View>
        <View style={responsivestyle.container}>
            <View>
                <Text style={responsivestyle.head}>
                    Order Details
                </Text>
                <Text  style={responsivestyle.content}>
                    Bag Total
                </Text>
                <Text  style={responsivestyle.content}>
                    Bag Savings
                </Text>
                <Text  style={responsivestyle.content}>
                    Coupon Discount
                </Text>
                <Text  style={[responsivestyle.content,
                    {marginBottom:15,}]}>  
                    Delivery
                </Text>
            </View>

    <View style={{alignItems:'flex-end'}}>
         <Text style={[responsivestyle.head,{color:Colors.flashwhite}]}>
            ..
        </Text>
        <Text  style={responsivestyle.content}>
                ₹ {parseFloat(total).toFixed(2)}</Text>
        <Text style={[responsivestyle.content,{color:Colors.green}]}>
                ₹ 0.00
        </Text>
        <Text  style={[responsivestyle.content,{color:Colors.red}]}>
                Apply Coupon
        </Text>
        <Text  style={[responsivestyle.content,{marginBottom:15},]}>
                    ₹ {parseFloat(charges).toFixed(2)}
        </Text>
     </View>
 </View>
        
<View style={responsivestyle.total}>
    <Text style={responsivestyle.totaltext}>
                    Order Details
    </Text>
    <Text style={responsivestyle.totaltext}>
                    ₹ {parseFloat(total+charges).toFixed(2)}
    </Text>
 </View>

</View>
    );
}
export default OrderTotal;