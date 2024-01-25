import {StyleSheet } from "react-native";
import Colors from "../common/Colors";
const style=(width,height)=>StyleSheet.create({
    button:{
        backgroundColor:Colors.green,
        borderRadius:10,
        padding:width*.03,
        justifyContent:'center',
        alignItems:'center',
        marginVertical:width*.025,
        flexDirection:'row'
    },
    textfont:{
        color:Colors.WhiteSmoke,
        fontSize:14,
        fontFamily:'Poppins-Regular'
    },
    buttonicon:{
        width:width*.08,
        height:width*.08,
        marginRight:width*.025,
    }
    
    
});
export default style;