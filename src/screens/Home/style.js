import { StyleSheet,Dimensions } from "react-native";
import Colors from "../../components/common/Colors";
const {width,height}=Dimensions.get('screen');

const style=StyleSheet.create({
    container:{
        backgroundColor:Colors.flashwhite,
    },
    main:{  flex:1  },
    foottext:{
        fontFamily:'Poppins-Bold',
        fontSize:25,
        color:Colors.Gray,
        padding:15,
    },
    footview:{
        padding:10,
        backgroundColor:Colors.green,
        width:'40%',
        marginHorizontal:15,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:50,
        borderRadius:15,
    },
    footbuttontext:{
        fontFamily:'Poppins-Bold',
        fontSize:15,
        color:Colors.white,
       
    },
    }
)
export default style;