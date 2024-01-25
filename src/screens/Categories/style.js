import { StyleSheet} from "react-native";
import Colors from "../../components/common/Colors";


const style=(width,height)=>StyleSheet.create({
    main:{  flex:1  },
    container:{
        backgroundColor:Colors.WhiteSmoke,
    },
    image:{
        height:width*.2,
        width:width*.2,
        resizeMode:'contain',
        margin:10,
    },
    catflatstyle:{
        padding:10,
        backgroundColor:Colors.secondayGreen,
        width:width*.3,
        justifyContent:'center',
        alignItems:'center',
    },
    cattouch:{
        borderBottomColor:Colors.jetblack,
        borderBottomWidth:1,
    },
    rowview:{
        justifyContent:'space-between',
        flexDirection:'row',
    },
    backimage:{
        width:width*.65,
        height:height*.175,
        resizeMode:'contain',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:20,
        overflow:'hidden',
        padding:15,
    },
    name:{
        fontFamily:'Poppins-Bold',
        fontSize:22,
        color:Colors.black,

    },
    desc:{
        fontFamily:'Poppins-Regular',
        fontSize:18,
        color:Colors.black,

    },
    prostyle:{
        justifyContent:'center',
        padding:10,
    },
    procontainer:{
        alignItems:'center',
        justifyContent:'center',
        padding:5,
    },
    imagebg:{
        backgroundColor:Colors.secondayGreen,
        padding:10,
        borderRadius:20,
        justifyContent:'center',
        marginBottom:5,
    },
    proimage:{
        height:width*.1,
        width:width*.1,
        resizeMode:'contain',
        alignSelf:'center',
    },
    proname:{
        fontFamily:'Poppins-Bold',
        fontSize:18,
        color:Colors.black,

    },
    prodesc:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        color:Colors.black,

    },
    
    }
)
export default style;