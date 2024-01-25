import { StyleSheet } from "react-native";
import Colors from "../../components/common/Colors";
const style=(width,height,isPortrait)=>StyleSheet.create({
    container:{
        padding:15
    },
    innerview:{
        padding:15,
        backgroundColor:Colors.white,
        borderRadius:20,
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
    actionview:{
        padding:20,
    },
    head:{
        fontFamily:'Poppins-Black',
        fontSize:20,
        lineHeight:50
    }

})
export default style;