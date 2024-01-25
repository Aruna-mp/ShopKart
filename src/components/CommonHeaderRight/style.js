import { StyleSheet} from "react-native";
import Colors from "../common/Colors";


const style=(width,height,isPortrait)=>StyleSheet.create({
    flexview:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
   touch:{paddingRight:10},
   image:{
    height:35,
    width:35,
    resizeMode:'contain'},
    cartcount:{
        position:'absolute',
        right:1,
        top:-1,
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
    }
)
export default style;