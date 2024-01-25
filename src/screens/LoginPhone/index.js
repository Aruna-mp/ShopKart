import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CustumTextInput from "../../components/CustumTextInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import style from "./style";
import Snackbar from "react-native-snackbar";
import Colors from "../../components/common/Colors";
import { validateOTP, validatePhone } from "./controller";
import { useDimensionContext } from "../../context";
const LoginPhone=()=>{
    const [phone,setPhone]=useState('');
    const [error,setError]=useState(null);
    const[otp,setOtp]=useState('');
    const [showotp,setShowOtp]=useState(false);
    const [confirm, setConfirm] = useState(null);
    const navigation=useNavigation();
    const dimensions=useDimensionContext();
    const responsivestyle=style(dimensions.windowWidth,dimensions.windowHeight)
    const handleButtonPress=async()=>{
        try {
            setError(null);
            if(validatePhone(phone.trim())){
                const confirmation = await auth().signInWithPhoneNumber(phone);
            
                 if(confirmation){
                    Snackbar.show({
                     text: 'Verification code is send to your mobile,please verify',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor:Colors.green,
                    textColor:Colors.black
                 });
                setConfirm(confirmation);
                setShowOtp(true);
                }
            }
            else{
                setError('Given phone number is incorrect');
            }
            
        } catch (error) {
          setError('Given phone number is incorrect');
        }
        ;
    }
  
    const handleGoToSignup=()=>{
        navigation.navigate('LoginPhone');
    }
    const handleGoTologin=()=>{
        navigation.goBack();
    }
    const handleVerifyOtp=async()=>{
        if(otp.trim()!=='' && validateOTP(otp.trim())){
           const res= await confirm.confirm(otp.trim());
         if(res){
            Snackbar.show({
                text: 'your Phone Number is verified, Login successful',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:Colors.green,
                textColor:Colors.black

            });
            navigation.navigate('AppDrawer');
         }
        }
        else{ setError('OTP is not Valid');}
    }
    return(
        <View style={responsivestyle.container}>
            <Image source={require('../../assets/image/green.png')} style={responsivestyle.greenstyle}/>
        <ScrollView style={responsivestyle.scrollview}>
            <Image source={require('../../assets/image/name.jpeg')} style={responsivestyle.name}/> 
            <Text style={responsivestyle.login}>SignUp with Phone</Text>
            {error!==null?<Text style={responsivestyle.errortext}>{error}</Text>:null}
           <CustumTextInput  handleText={text=> setPhone(text)} placeholder="Phone Number     "
           type='phone'/>
           
           {showotp? <CustumTextInput  
           handleText={text=> setOtp(text)} 
           placeholder="Enter OTP"
           type='phone'/>:null}

           <CustomButton type='primary' 
           handleButtonPress={showotp?handleVerifyOtp:handleButtonPress} 
           buttonText={showotp?'Verify OTP':'Sign In with Phone number'}/>
           <Text onPress={handleGoTologin} style={responsivestyle.createnew}>Go Back</Text>
           

           
          
         
       </ScrollView> 
            
        </View>
    );
};
export default LoginPhone;