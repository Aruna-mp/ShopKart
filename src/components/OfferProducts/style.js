import { StyleSheet } from "react-native";
import Colors from "../common/Colors";


const style=(width,height)=>StyleSheet.create({
    container:{
       padding:15,
       backgroundColor:Colors.lightpink,
    },
    productview:{
                    
        width:'100%',
        padding:15,
        marginVertical:15,
        marginRight:15,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.white,
        overflow:'hidden'
        },
    productimage:{
        width:75,
        height:75,
        resizeMode:'contain',
        alignSelf:'center',
        marginVertical:15,
    },
    innerview:{ 
        borderLeftWidth:1,
        paddingHorizontal:10,
        marginLeft:10,
        width:width*.68
    },
    head:{
        fontFamily:'Poppins-Bold',
        fontSize:20,
        color:Colors.black
    },
    priceview:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:15,
        width:width*.625
    },
    priceview2:{
        flexDirection:'row',
        alignItems:'center',
    },
    des:{
        fontFamily:'Poppin-Regular',
        fontSize:16,
        color:Colors.jetblack,

    },
    pricetext:{
        fontFamily:'Poppins-Bold',
        fontSize:18,
        color:Colors.black
    },
    offview:{
        backgroundColor:Colors.green,
        padding:3,
        borderRadius:20,
        marginHorizontal:15
    },
    offtext:{
        fontFamily:'Poppins-SemiBold',
        fontSize:16,
        color:Colors.white,
        marginHorizontal:10,
    },
    qunview:{
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        borderRadius:20,
        borderWidth:1,
        borderColor:Colors.green,
        overflow:'hidden',
        paddingVertical:1,
    },
    quntext1:{
        fontFamily:'Poppins-Bold',
        fontSize:20,
        color:Colors.black,
        marginHorizontal:10,
    },
    quntext2:{
        fontFamily:'Poppins-Bold',
        fontSize:18,
        color:Colors.green,
        marginHorizontal:5,
    },
    
    
    }
)
export default style;