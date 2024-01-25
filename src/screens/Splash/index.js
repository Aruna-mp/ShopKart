import {Image, View} from 'react-native';
import Colors from '../../components/common/Colors';
const Splash=()=>{
    return(
        <View style={{
            flex:1,
            justifyContent:'center',
            backgroundColor:Colors.white,
            alignItems:'center'}}>
            <Image source={require('../../assets/image/name.png')} style={{height:150,width:150,resizeMode:'contain'}}/>
        </View>
    );
}
export default Splash;