
import { StyleSheet} from "react-native";
import Colors from "../../components/common/Colors";


const style=(width,height)=>StyleSheet.create({
    main:{  flex:1,
     },
    container:{
        backgroundColor:Colors.WhiteSmoke,
    },
    flatlist:{
        alignSelf:'center',
        marginVertical:height*.015,
    },
    outerview: {
        flexDirection:'row',
        alignItems:'center',
        width:width,
        alignSelf:'center',
        justifyContent:'center',
        marginBottom:height*.015
    },
    bview:{marginRight:height*-.025/2,zIndex:99},
    innerview:{
        width:25,
        height:25,
        borderRadius:25/2,
        backgroundColor:Colors.flashwhite,
    },
    leftview:{ 
        height:100,
        width:'65%',
        backgroundColor:Colors.secondayGreen,
        padding:20,
         },
         insideleft:{
            flexDirection:'row',
            alignItems:'center'
        },
        offertext:{
            fontFamily:'Poppins-Bold',
            color:Colors.green,
            fontSize:40
        },
        off:{
            fontFamily:'Poppins-Regular',
            color:Colors.green,
            fontSize:12
        },
        head:{
            fontFamily:'Poppins-Bold',
            color:Colors.black,
            fontSize:16
        },
        content:{
            fontFamily:'Poppins-Regular',
            color:Colors.black,
            fontSize:12
        },
        bg:{
            justifyContent:'space-between',
            height:100,
            backgroundColor:Colors.secondayGreen
          },
          sideview:{
            height:25,
            width:25,
            borderRadius:12.5,
           backgroundColor:Colors.flashwhite,
           marginTop:-25/2
          },
          sideview2:{
          height:25,
          width:25,
          borderRadius:12.5,
         backgroundColor:Colors.flashwhite,
         marginBottom:-25/2
          },

          right:{ height:100,width:'25%',
          backgroundColor:Colors.secondayGreen,
          paddingRight:15,
          paddingVertical:15,
          justifyContent:'center',
          alignItems:'center'
           },
           codehead:{
            fontFamily:'Poppins-Regular',
            color:Colors.black,
            fontSize:14
        },
        codeview:{
            marginVertical:10,
            paddingHorizontal:10,
            paddingVertical:5,
            justifyContent:'center',
            borderRadius:20,
            backgroundColor:Colors.green,
            overflow:'hidden',
        },
        codetext:{
            fontFamily:'Poppins-Regular',
            color:Colors.white,
            fontSize:12,
            textAlign:'center'
        }

    }
)
export default style;