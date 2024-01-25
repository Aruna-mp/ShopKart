import { StyleSheet,Dimensions } from "react-native";
const {width,height}=Dimensions.get('screen');
import Colors from "../../components/common/Colors";

const style=StyleSheet.create({
    container:{
        
         height:height*.94,
        backgroundColor: Colors.WhiteSmoke,
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
    signuptext:{
        textAlign:'center',
        fontFamily:'Poppins-Regular',
        fontSize:14,
    }
    
    
    
    


    }
)
export default style;