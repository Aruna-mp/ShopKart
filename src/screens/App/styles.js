import { StyleSheet,Dimensions } from "react-native";
const {width,height}=Dimensions.get('screen');
import Colors from "../../components/common/Colors";

const styles=StyleSheet.create({
    title:{fontFamily:'Poppins-Bold',fontSize:22,},
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
    footer:{
        backgroundColor:Colors.dimgreen,
        alignItems:'center',
        padding:20,
        justifyContent:'center',

    },
    footerfont:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
    },
    errortext:{
        color:Colors.red,
        fontFamily:'Poppins-Regular',
        fontSize:14,

    },
    
    


    }
)
export default styles;