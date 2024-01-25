import { StyleSheet } from "react-native";
import Colors from "../../components/common/Colors";
const style=(width,height,isPortrait)=>StyleSheet.create({
    proimage:{
        width:width,
        height:width*.6,
        resizeMode:'contain',
        marginVertical:width*.05
    },
    heart:{
        position:'absolute',
        right:0,
        marginTop:width*.05
    },
    mainview:{
        backgroundColor:Colors.white,
      
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        shadowColor:'#000',
        shadowOffset:{width:2,height:2},
        shadowOpacity:0.2,
        shadowRadius:5,
        elevation:15,
        paddingBottom:70
    },
    padding:{  padding:width*.05,},
    title:{
        fontFamily:'Poppins-Black',
        fontSize:25,
        marginBottom:15,
        color:Colors.black

    },
    price:{
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        marginVertical:15,
        color:Colors.black

    },
    productview:{
        borderBottomColor:Colors.Gray,
        borderBottomWidth:1,
        paddingVertical:20
     },
   off: {
        color:Colors.Gray,
        fontFamily:'Poppins-Bold',
        fontSize:16,
        marginLeft:30,
        color:Colors.green
   },
   rating:{
        color:Colors.Gray,
        fontFamily:'Poppins-Regular',
        fontSize:14,
        marginLeft:15
 },     
    deschead:{ 
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        color:Colors.black

    },
    description:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
    },
    cartview:{
        position:'absolute',
        bottom:10,
        alignSelf:'center',
        padding:9,
        borderRadius:8,
        backgroundColor:Colors.green,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        width:'95%'
    },
    cartinner:{
        padding:9,
        borderRadius:8,
        backgroundColor:Colors.white,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    quantity:{
        fontFamily:'Poppins-Bold',
        color:Colors.green,
        fontSize:18,
        marginHorizontal:20,  
    },
    add:{
        fontFamily:'Poppins-Black',
        color:Colors.white,
        fontSize:18
    },
    wishlist:{
        width:30,
        height:30,
        resizeMode:'contain',
        alignSelf:'flex-end',
        marginRight:15
    },


});
export default style;