import { StyleSheet } from "react-native";
import Colors from "../common/Colors";
// const {width,height}=Dimensions.get('screen');

const style=(width,height,isPortrait)=>StyleSheet.create({
    container:{
        marginTop:isPortrait?width*.05:width*.001,
       flexDirection:'row',
       alignItems:'center',
       backgroundColor:Colors.white,
       height:isPortrait?width*.15:width*.15,
       justifyContent:'space-between',
    //    padding:10,
        paddingHorizontal:width*.02
    },
    logo:{
        resizeMode:'center',
        height:height*.4,
        width:width*.4,
       
    },
    iconstyle:{
        resizeMode:'center',
        height:isPortrait?height*.1:height*.2,
        width:isPortrait?width*.1:width*.2,
      
    },
    }
)
export default style;