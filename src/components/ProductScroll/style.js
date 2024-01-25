import { StyleSheet } from "react-native";
import Colors from "../common/Colors";


const style=(width,height)=>StyleSheet.create({
    container:{
        padding:width*.05,
       backgroundColor:Colors.white,
    },
    borderview:{
        height:300,
        width:150,
        padding:15,
        marginVertical:15,
        marginRight:15,
        borderRadius:15,borderWidth:1,
        borderColor:Colors.green
        },
    wishlist:{
        width:25,
        height:25,
        resizeMode:'contain',
        alignSelf:'flex-end'
    },
    image:{
        width:75,
        height:75,
        resizeMode:'contain',
        alignSelf:'center',
        marginVertical:15
    },
    head:{
        fontFamily:'Poppins-Bold',
        fontSize:20,
        color:Colors.black
    },
    content:{
        fontFamily:'Poppin-Regular',
        fontSize:16
    },
    priceview:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:15,
    },
    price:{
        fontFamily:'Poppins-Regular',
        fontSize:20,
        color:Colors.black
    },
    plusview:{
        padding:3,
        backgroundColor:Colors.green,
        borderRadius:5
    },
    plus:{
        fontFamily:'Poppins-Regular',
        fontSize:20,
        color:Colors.white
    },
    
    
    }
)
export default style;