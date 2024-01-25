import { StyleSheet } from "react-native";
import Colors from "../../../../components/common/Colors";
// const {width,height}=Dimensions.get('screen');

const style=(width,height)=>StyleSheet.create({
    container:{
       
       alignItems:'center',
       justifyContent:'space-between',
       marginVertical:20
    
    },
    banner:{
        width:width*.9,
        height:width*.4,
        resizeMode:'contain',
        borderRadius:15,
        overflow:'hidden',
        margin:15
    },
    innerview:{
        padding:15
    },
    head:{
        fontFamily:'Poppins-Black',
        fontSize:20,

    },
    content:{
        fontFamily:'Poppins-Regular',
        fontSize:16,

    },
    touch:{
        backgroundColor:Colors.green,
        padding:6,
        alignItems:'center',
        justifyContent:'center',
        width:width*.3,
        marginVertical:10,
        borderRadius:15,

    },
    touchtext:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        color:Colors.white,

    },
  
    
    
    }
)
export default style;