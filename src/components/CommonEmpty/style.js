import { StyleSheet } from "react-native";
import Colors from "../common/Colors";
const style=(height,width,isPortrait)=>StyleSheet.create({
    container:{
        flex:1,
        // borderRadius:8,
        // borderColor:Colors.red,
        // borderWidth:1,
        // padding:10,
        // backgroundColor:Colors.category4
    },
    title:{
        fontFamily:'Poppins-Regular',
        fontSize:22,
        color:Colors.SlateGray,
        textAlign:'center',
    }
});
export default style;