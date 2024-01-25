import { StyleSheet,Dimensions } from "react-native";
import Colors from "../../components/common/Colors";
const style=(width,height,isPortrait)=>StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.flashwhite,
        padding:15
    },
    name:{
        fontSize:20,
        fontFamily:'Poppins-Bold',
        color:Colors.black,
        textAlign:'center'
    },
    imageview:{
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        marginTop:10,

    },
    image:{
        height:width*.3,
        width:width*.3,
        resizeMode:'contain',
        borderRadius:width*.2
    },
    bigimage:{
        height:width*.8,
        width:width*.8,
    },
    modalview:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FF000000'
    },
    
    touchedit:{
        position:'absolute',
        right:0,
        bottom:0,
    },
    edit:{
        height:width*.07,
        width:width*.07,
        resizeMode:'contain',
    },
    closeview:{
        backgroundColor:Colors.white,
        borderRadius:25,
        position:'absolute',
        zIndex:9,
        top:width*.50,
        right:50
    },
    selectbox:{
        backgroundColor:Colors.WhiteSmoke,
        padding:25,
        borderRadius:15,
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row'
    },
    touch:{
        padding:10,
        justifyContent:'center',
        borderRadius:15,
        backgroundColor:Colors.green,
        marginHorizontal:10
    },
    pick:{
        fontSize:18,
        fontFamily:'Poppins-Regular',
        color:Colors.white,
        textAlign:'center'
    },
    

    }
)
export default style;