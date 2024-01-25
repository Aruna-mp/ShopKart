import { StyleSheet } from "react-native";

import Colors from "../../components/common/Colors";
const style=(width,height,isPortrait)=>StyleSheet.create({
    container:{
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.green,
        width:width*.9,
        padding:15,
        marginVertical:15,
        alignSelf:'center'
    },
    text:{
        color:Colors.white,
        fontFamily:'Poppins-Bold',
        fontSize:22,
    },
});
export default style;