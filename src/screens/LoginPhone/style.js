import { StyleSheet} from "react-native";
// const {width,height}=Dimensions.get('screen');
import Colors from "../../components/common/Colors";

const style=(width,height)=>StyleSheet.create({
    container:{
        
        height:height*.94,
        backgroundColor: Colors.WhiteSmoke,
        resizeMode:'cover',
        width:width,
    },
    greenstyle:{
        height:height*0.1,
        width:width,
        resizeMode:'cover',
    },
    scrollview:{
        flex:1,
        padding:width*.05,
        backgroundColor: Colors.WhiteSmoke,
        borderTopLeftRadius:width*.04,
        borderTopRightRadius:width*.04,
        overflow:'hidden',
        marginTop:width*0.04,
    },
    createnew:{
        marginVertical:width*.04,
        fontFamily:"Poppins-Regular",
        fontSize:14,
        textAlign:'center'

    },
    name:{
        height:height*.07,
        width:width*.40,
        resizeMode:'contain'
        
    },
    login:{
        fontFamily:'Poppins-Regular',
        fontSize:20,
        color:'grey'
    },
    errortext:{
        color:Colors.red,
        fontFamily:'Poppins-Regular',
        fontSize:14,
        marginTop:30,
    },
    
    


    }
)
export default style;