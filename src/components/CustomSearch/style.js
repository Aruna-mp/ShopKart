import { StyleSheet } from "react-native";
import Colors from "../common/Colors";
// const {width,height}=Dimensions.get('screen');

const style=(width,height)=>StyleSheet.create({
    container:{
       
       alignItems:'center',
       justifyContent:'center',
       marginVertical:15
    
    },
    newcontainer:{
        alignItems:'center',
       justifyContent:'space-around',
       marginVertical:15,
       flexDirection:'row'

    },
    search:{
        backgroundColor:Colors.LightGreen,
        borderColor:Colors.green,
        borderWidth:1,
        width:width*0.9,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:1,
        alignSelf:'center'
    
    },
    Newstyle:{
        backgroundColor:Colors.LightGreen,
        borderColor:Colors.green,
        borderWidth:1,
        width:width*0.75,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        padding:1,
        alignSelf:'center'
    },
    innerview:{
        flexDirection:'row',
        alignItems:'center',
    },
    searchicon:{
        height:18,
        width:18,
        resizeMode:'center'
    },
    textinput:{
        fontFamily:'Poppins-Regular',
        fontSize:16,
        marginLeft:15,
        color:Colors.green,
        flex:1,
    },
    filter:{
        fontFamily:'Poppins-Regular',
        fontSize:18,
        color:Colors.green

    }
    
    }
)
export default style;