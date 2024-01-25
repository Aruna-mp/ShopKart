import {Platform, StyleSheet } from "react-native";
import Colors from "../common/Colors";

const style=(width,height,isPortrait)=>StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
       backgroundColor: Colors.LightGreen,
        borderRadius:15,
        padding:width*.01,
        marginVertical:10,
        borderColor:Colors.Gray,
        borderWidth: .5,
    },
    textinput:{
        color:Colors.LimeGreen,
        fontSize:16,
        fontFamily:'Poppins-Regular',
        flex:1
        
    },
    icon:{
        width:width*.05,
        height:width*0.05,
        resizeMode:'contain',
    },
    checktext:{
        fontFamily:'Poppins-Regular',
        color:Colors.green,
        fontSize:18
    }
    
    
});
export default style;