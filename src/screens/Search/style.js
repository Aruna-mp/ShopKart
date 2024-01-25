import { StyleSheet,Dimensions } from "react-native";
import Colors from "../../components/common/Colors";
const {width,height}=Dimensions.get('screen');

const style=StyleSheet.create({
    main:{  flex:1  },
    container:{
        backgroundColor:Colors.WhiteSmoke,
    },
    
    }
)
export default style;