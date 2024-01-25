import { StyleSheet } from "react-native";

import Colors from "../../components/common/Colors";

const style=(height,width,isPortrait)=>StyleSheet.create({
    container:{
             height:isPortrait?height*.23:height*.125,
            justifyContent:'space-around',
            alignItems:'center',
            flexDirection:'row',
            backgroundColor:Colors.green,
    },
    footercontainer:{
        alignItems:'center',
        justifyContent:'center',
    },
    FooterText:{
        color:Colors.WhiteSmoke,
        fontSize:14,
        fontFamily:'Poppins-SemiBold',
        marginTop:isPortrait?height*.008:height*.015,
    },
    imagefont:{
        height:isPortrait?width*.03:height*.03,
        width:isPortrait?width*.03:height*.03,
        resizeMode:'cover'},
    dot:{
        fontSize:60,
        color:Colors.WhiteSmoke,
        textAlign:'center',
        marginTop:isPortrait?-height*.3:-height*.16,
        fontFamily:'Poppins-Regular'
    },
    cartcount:{
        position:'absolute',
        right:-8,
        top:-6,
        backgroundColor:Colors.red,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        borderRadius:20/2,
        height:20,
        width:20,
        // paddingHorizontal:6,
        // paddingVertical:1,
        zIndex:9
    },
    count:{
        color:Colors.white,
        fontFamily:'Poppins-Regular',
        fontSize:14,
        textAlign:'center',
    },
})
export default style;