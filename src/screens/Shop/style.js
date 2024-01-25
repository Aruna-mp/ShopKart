import { StyleSheet } from "react-native";
import Colors from "../../components/common/Colors";

const style=(width,height,isPortrait)=>StyleSheet.create({
    // container:{
    //     flex:1,
    // },
    catitemview:{
        margin:10,
    },
    catitem:{
        fontFamily:'Poppins-Regular',
        fontSize:18,
        color:Colors.green,
    },
    categories:{
        backgroundColor:Colors.LightGreen,
    },
    contentstyle:{
        justifyContent:'space-around',
        alignItems:'center',
    },
    outerview:{
        paddingHorizontal:15
    },
    productview:{             
        width:'100%',
        padding:8,
        marginVertical:5,
        marginRight:15,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.white,
        overflow:'hidden'
        },
    productimage:{
        width:70,
        height:70,
        resizeMode:'contain',
        alignSelf:'center',
        marginVertical:15,
    },
    innerview1:{ 
         borderLeftWidth:1,
        paddingHorizontal:10,
        marginLeft:10,
        width:'80%',
        overflow:'hidden'
    },
    head1:{
        fontFamily:'Poppins-Bold',
        fontSize:20,
        color:Colors.black
    },
    priceview:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:10,
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
        padding:4,
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
        paddingVertical:3,
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
    

})
export default style;