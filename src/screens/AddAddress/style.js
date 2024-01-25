import { StyleSheet } from "react-native";
import Colors from "../../components/common/Colors";
const style=(height,width,isPortrait)=>StyleSheet.create({
    container:{
        flex:1,
    },
    textInput:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        borderRadius:8,
        borderWidth:1,
        width:width*.9,
        height:50,
        margin:10,
        alignSelf:'center',
        borderColor:Colors.green,
        backgroundColor:Colors.LightGreen,
    },
    description:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
    },
    mapview:{
        width:width,
        height:height*.4,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    iconview:{
        backgroundColor:Colors.green,
        padding:10,
        borderRadius:8,
        marginRight:10
    },
    locationview:{
        padding:15,
        marginVertical:20,
        flexDirection:'row',
        alignItems:'center',
    },
    locationtext:{
        fontFamily:"Poppins-Bold",
        fontSize:18,
        color:Colors.black
    }

});
export default style;