import { StyleSheet } from "react-native";
import Colors from "../../../../components/common/Colors";


const style=(width,height)=>StyleSheet.create({
    Container:{
        backgroundColor:Colors.LightGreen,
        borderRadius:15,
        padding:15,
        margin:10,

    },
    head:{
        fontFamily:'Poppins-Bold',
        fontSize:18,
        marginBottom:15
    },
    contentview:{
        backgroundColor:Colors.white,
        padding:15,
        borderRadius:15,
        marginRight:15,
        
    },
    image:{
        width:width*.1,
        height:width*.1,
        resizeMode:'contain'
    },

})
export default style;