import { StyleSheet} from "react-native";
import Colors from "../../../../components/common/Colors";
const style=(height,width)=>StyleSheet.create({
    main:{  
        flex:1 ,
        padding:15 
    },
    title:{
        fontFamily:"Poppins-Bold",
        fontSize:25,
        color:Colors.black,
    },
    flatlist:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:20
    },
    imgview:{
        // alignItems:'center',
        // justifyContent:'center',
        borderRadius:15,
        padding:15,
        overflow:'hidden',
         marginRight:15,
    },
    image:{
        height:width*.07,
        width:width*.1,
        resizeMode:'contain',
    },

    }
)
export default style;