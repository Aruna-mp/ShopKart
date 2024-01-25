import { StyleSheet} from "react-native";
import Colors from "../../../../components/common/Colors";
const style=(width,height,isPortrait)=>StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:15,
        borderBottomColor:Colors.jetblack,
        borderBottomWidth:1
    },
    head:{
        fontFamily:'Poppins-Black',
        fontSize:20,
        lineHeight:50,
        color:Colors.black
    },
    content:{
        fontFamily:'Poppins-Regular',
        fontSize:18,
        lineHeight:30,
        color:Colors.black
    },
    total:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        },
    totaltext:{
        fontFamily:'Poppins-Bold',
        fontSize:20,
        lineHeight:50,
        color:Colors.black
    },

})
export default style;