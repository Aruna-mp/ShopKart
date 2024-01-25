import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import style from "./style";
import firestore from '@react-native-firebase/firestore';
import CustumTextInput from "../../components/CustumTextInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import styles from "../App/styles";
import { validateEmail, validatePhoneNumber } from "../../components/common/validations";
import Snackbar from "react-native-snackbar";
import Colors from "../../components/common/Colors";
import { GoogleSignin } from '@react-native-google-signin/google-signin'


const SignUp=()=>{
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [mobile,setMobile]=useState('');
    const [password,setPassword]=useState('');
    const [cpassword,setCpassword]=useState('');
    const [error,setError]=useState(null);
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '189359351234-0gthf1id939rpq9ge6sejas01i5sc5su.apps.googleusercontent.com',
          });
    
    },[]);

    const handleButtonPress=async()=>{
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog:true});
    }
    const navigation=useNavigation();
    const handleGoToLogin=()=>{
        navigation.goBack();
    }
    
    const handleSignUp=async()=>{
        if( 
            username.trim()!==''&&
            email.trim()!==''&&
            mobile.trim()!==''&&
            password.trim()!==''&&
            cpassword.trim()!=='')
            {
                if(validateEmail(email.trim()))
                {
                    if(validatePhoneNumber(mobile.trim())){
                        if ( password.trim()===cpassword.trim()){

                            await firestore()
                            .collection('users')
                            .where('username','==',username.trim())
                            .where('email','==',email.trim())
                            .get()
                            .then(async snapshot=>
                                {
                                    if(snapshot.empty)
                                    {
                                        if(validateEmail(email.trim()))
                                        {
                                            if(validatePhoneNumber(mobile.trim())){
                                    
                                        const userdata={
                                            username:username.trim(),
                                            email:email.trim(),
                                            mobilenumber:mobile.trim(),
                                            password:password.trim(),
                                            created:String(new Date()),
                                            updated:String(new Date())
                                        }
                                        await firestore().collection('users')
                                        .add(userdata)
                                        .then(resp=>{
                                            Snackbar.show({
                                                text: 'Account created successfully.!',
                                                duration: Snackbar.LENGTH_SHORT,
                                                backgroundColor:Colors.green,
                                                textColor:Colors.WhiteSmoke
                    
                                            });
                                            navigation.navigate('Home');
                                        })
                                        .catch(err=>{console.warn(err);})
                                    }
                                    else{ setError("Mobile Number is not valid");}
                                    }
                                    else{setError("email is not valid.!");}
                                } 
                           
                                else
                                {
                                    Snackbar.show({
                                        text: 'This email is already existing in our system ,try using another email or login account',
                                        duration: Snackbar.LENGTH_SHORT,
                                        backgroundColor:Colors.red,
                                        textColor:Colors.WhiteSmoke
            
                                    });
                                
                                    }});
                               
        
                                }
        
                        else{
                            setError("Passwords are not matching.!");
                        }
                }
                else{
                    setError('Given Phone number is not valid');
                }
                    }
                   else{
                         setError('Given Email is not valid');
                     }
                
            }
            else{
                setError("Fill up all the fields");
                 }
        };
    return(
        <View style={style.container}>
            <Image source={require('../../assets/image/green.png')} style={style.greenstyle}/>
        <ScrollView style={style.scrollview}>
            <Image source={require('../../assets/image/name.jpeg')} style={style.name}/> 
            <Text style={style.login}>Sign Up Account</Text>

            {error!==null?
            <View style={{marginTop:10}}>
                <Text style={styles.errortext}>{error}</Text>
            </View>
            :null}
            
            <CustumTextInput type={"username"} 
            handleText={text=> setUsername(text)} 
            placeholder="User Name"/>
           
           <CustumTextInput type={"email"} 
           handleText={text=> setEmail(text)} 
           placeholder="Email Address"/>
           
           <CustumTextInput type={"phone"} 
           handleText={text=> setMobile(text)} 
           placeholder="Mobile Number"/>
           
           <CustumTextInput type={"password"}
           handleText={text=> setPassword(text)} 
           placeholder="Password"/>
           
           <CustumTextInput type={"password"}
           handleText={text=> setCpassword(text)}
            placeholder="Confirm Password"/>
           <CustomButton type='primary' handleButtonPress={handleSignUp} buttonText={'Sign Up'}/>
           <Text style={style.signuptext}>Or SignUp With</Text>

           <CustomButton type='secondary' 
                handleButtonPress={handleButtonPress} buttonText={'SignUp with google'} icon=
                {require('../../assets/image/google.png')}
                />

           
           <Text onPress={handleGoToLogin} style={style.createnew}>Go to Login</Text>
           

           
         
       </ScrollView> 
            
        </View>
    );
}
export default SignUp;