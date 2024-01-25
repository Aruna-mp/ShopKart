import { StyleSheet,Dimensions } from "react-native";
import Colors from "../../components/common/Colors";


const style=(width,height,isPortrait)=>StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.WhiteSmoke,
        padding:15
    },
    productview:{
        alignSelf:'center',
        backgroundColor:Colors.white,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        overflow:'hidden',
        width:width*.9,
        padding:15,
        marginTop:15,
    },
    cartcount:{
        position:'absolute',
        top:0,
        right:10,
        backgroundColor:Colors.red,
        borderRadius:20/2,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        // paddingVertical:1,
        // paddingHorizontal:6,
        height:20,
        width:20,
        zIndex:9,
    },
    count:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color:Colors.white
    },
    deleteview:{
        position:'absolute',
        top:2,
        right:0,
        borderRadius:10,
        overflow:'hidden',
        padding:4
    },
    delete:{
        width:width*.07,
        height:width*.07,
        resizeMode:'contain',
    },
    cartimage:{
        height:width*.09,
        width:width*.09,
        resizeMode:'contain',
        marginRight:15
    },
    productimage:{
        height:width*.2,
        width:width*.2,
        resizeMode:'contain',
    },
    secondview:{
        borderLeftColor:Colors.SlateGray,
        borderLeftWidth:1,
        paddingLeft:10,
        marginLeft:10,
        width:width*.6,
        overflow:'hidden',
    },
    title:{
        fontFamily:'Poppins-Bold',
        fontSize:18,
        color:Colors.black,
    },
    desc:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        color:Colors.charcol,
    },
    price:{
        fontFamily:'Poppins-Bold',
        fontSize:12,
        color:Colors.black,
    },
    bottomview:{
        flexDirection:'row',
        marginVertical:5,
        justifyContent:'space-between',
        alignItems:'center',
    },
    offview:{
        borderRadius:15,
        backgroundColor:Colors.green,
        padding:4,
        marginHorizontal:4
    },
    offtext:{
        fontFamily:'Poppins-Regular',
        fontSize:12,
        color:Colors.white
    },
    cartview:{
        borderRadius:15,
        padding:4,
        marginHorizontal:4,
        borderWidth:1,
        borderColor:Colors.green,
    },
    carttext:{
        fontFamily:'Poppins-Regular',
        fontSize:12,
        color:Colors.green
    },
    emptyview:{
        justifyContent:'center',
        alignItems:'center',
        padding:15
    },
    emptytext:{
        fontFamily:'Poppins-Bold',
        fontSize:20,
        color:Colors.Gray
    },
    shoptext:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        color:Colors.Gray
    },
    }
)
export default style;