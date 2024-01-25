import { StyleSheet } from "react-native";
const style=(width,height)=>StyleSheet.create({
    Container:{
        margin:15,
        },
    text:{
        fontFamily:'Poppins-Bold',
        fontSize:18,
        textAlign:'center',

    },
    flatlist:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:15
    },
innerview:{
    marginRight:15,
    marginBottom:15,
    justifyContent:'center',
    alignItems:'center',
},
category:{
    fontFamily:'Poppins-Regular',
    fontSize:16,
},
image:{
    height:width*.1,
    width:width*.1,
    resizeMode:'contain',
},
imageview:{
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    padding:10,
    marginBottom:10,
},

})
export default style;