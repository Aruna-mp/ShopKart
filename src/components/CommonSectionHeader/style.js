import { StyleSheet } from "react-native";
import Colors from "../common/Colors";


const style=(width,height)=>StyleSheet.create({
    container:{
       padding:15,
       backgroundColor:Colors.white,
    },
    headview:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    headtext:{
        fontFamily:'Poppins-Bold',
        fontSize:22,
        color:Colors.black
    },
    contenttext:{
        fontFamily:'Poppins-Regular',
        fontSize:18,
        color:Colors.black
    },
    seetext:{
        fontFamily:'Poppins-Regular',
        fontSize:18,
        color:Colors.black
    },
    
    }
)
export default style;