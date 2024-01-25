import { StyleSheet } from "react-native";
import Colors from "../../../components/common/Colors";

const style=(width,height,isPortrait)=>StyleSheet.create({
    // Extrainfo
    headview:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    deschead:{ 
        fontFamily:'Poppins-SemiBold',
        fontSize:20,
        color:Colors.black,
    },
    description:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color:Colors.Gray
    },
    sectionstyle:{
        paddingVertical:8,
        borderBottomColor:Colors.Gray,
        borderBottomWidth:1
    },
    // Moreinfo
    container:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:10
    },
    box:{
        flexDirection:"row",
        alignItems:'center',
        width:width*.4,
        justifyContent:'center',
        backgroundColor:Colors.lightgrey,
        padding:4,
        borderRadius:15
    },
    boxtext:{
        color:Colors.black,
        fontFamily:'Poppins-Regular',
        fontSize:14,
     },
    // Productinfo
    outerview:{marginVertical:15},
    reviewstyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:5
     },
    reviewhead:{
        color:Colors.charcol,
        fontFamily:'Poppins-Regular',
        fontSize:18
    },
    seeall:{
        color:Colors.green,
        fontFamily:'Poppins-Regular',
        fontSize:18
    },
    innerview:{
        padding:15,
        backgroundColor:Colors.lightgrey,
        borderRadius:8,
        marginVertical:10
    },
    reviewview:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10
    },
    profile:{
        height:30,
        width:30,
        resizeMode:'contain',
        borderRadius:15,
        overflow:'hidden'
    },
    name:{
        color:Colors.jetblack,
        fontFamily:'Poppins-Bold',
        fontSize:14,
        marginLeft:10
        },
    review:{
        color:Colors.SlateGray,
        fontFamily:'Poppins-Regular',
        fontSize:14
    },
// Deliveryinfo
commontext:{ 
    fontFamily:'Poppins-Regular',
    fontSize:16,
    color:Colors.SlateGray,
    lineHeight:25
},
deliveryhead:{ 
    fontFamily:'Poppins-SemiBold',
    fontSize:20,
    color:Colors.black,
    marginBottom:10
},




});
export default style;