import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CustumTextInput from "../../components/CustumTextInput";
import CustomButton from "../../components/CustomButton";
import Colors from "../../components/common/Colors";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { validateEmail } from "./controller";
import { useDimensionContext } from "../../context";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { login } from "../../storage/action";

const Login=()=>{
    const dimensions=useDimensionContext();
    // console.warn(dimensions);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const responsivestyle=styles(dimensions.windowWidth,dimensions.windowHeight);
    const dispatch=useDispatch();
    function onAuthStateChanged(user) {
        // console.warn(user);
      }
    
      useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
      }, []);
    const handleLogin=async()=>{
        if(email.trim()!=='' && password.trim!==''){
            if(validateEmail(email.trim())){ 
            await firestore()
            .collection('users')
            .where('email','==',email.trim())
            
            .get()
            .then(async snapshot=>
                {
                    if(snapshot.empty)
                    {
                        Snackbar.show({
                            text: 'This user is not registered,try creating a new account',
                            duration: Snackbar.LENGTH_SHORT,
                            backgroundColor:Colors.red,
                            textColor:Colors.WhiteSmoke
            
                        });
                    }
                    else{
                        snapshot.forEach(documentSnapshot=>{
                           
                            const respData=documentSnapshot.data();

                            if(password.trim()===respData.password){
                                Snackbar.show({
                                    text: 'Login Successful.!',
                                    duration: Snackbar.LENGTH_SHORT,
                                    backgroundColor:Colors.green,
                                    textColor:Colors.WhiteSmoke
                    
                                });
                                dispatch(login
                                    ({
                                        userId:documentSnapshot.id,
                                        firstName:respData.firstName,
                                        lastName: respData.lastName,
                                        email:respData.email,
                                        mobileNumber:respData.mobilenumber,
                                        profileImage:respData.profileimage
                                    }));
                                // navigation.navigate('AppDrawer');
                            }
                            else{
                                Snackbar.show({
                                    text: 'The password you entered is wrong.!',
                                    duration: Snackbar.LENGTH_SHORT,
                                    backgroundColor:Colors.red,
                                    textColor:Colors.WhiteSmoke
                    
                                });
                            }
                        })
                    }
                })
            .catch(err=>console.warn(err));

        }else{
            Snackbar.show({
                text: 'Enter a valid Email',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:Colors.red,
                textColor:Colors.WhiteSmoke

            });

        }
            }else{
            Snackbar.show({
                text: 'Fill up the User name and Password to continue.!',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor:Colors.red,
                textColor:Colors.WhiteSmoke

            });
        }
    }
    const navigation=useNavigation();
    const handleGoToSignup=()=>{
        navigation.navigate('SignUp');
    }
    const handlePhone=()=>{
        navigation.navigate('LoginPhone');
    }
    const handleButtonPress=()=>{

    }
    return(
        <View style={responsivestyle.container}>
            <Image source={require('../../assets/image/green.png')} style={responsivestyle.greenstyle}/>
        <ScrollView style={responsivestyle.scrollview}>
            <Image source={require('../../assets/image/name.jpeg')} style={responsivestyle.name}/> 
            <Text style={responsivestyle.login}>Login Account</Text>
           <CustumTextInput type={"email"} handleText={text=> setEmail(text)}
            placeholder="Email Address         "/>
           <CustumTextInput type={"password"}handleText={text=> setPassword(text)} placeholder="Password"/>
           <CustomButton type='primary' handleButtonPress={handleLogin} buttonText={'Sign In'}/>
           <Text onPress={handleGoToSignup} style={responsivestyle.createnew}>If you are new ,create Now</Text>
           

           <View>
                <View style={{ overflow:'hidden'}}>
                <View style={{borderStyle:'dashed',
                                borderWidth:1.5,
                                margin:-2,
                                 marginBottom:0,
                                // backgroundColor:Colors.PaleGreen 
                            }}/>

                </View>
                <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    alignSelf:'center',
                    marginTop:-10,
                    width:120,
                    backgroundColor:Colors.WhiteSmoke

                }}>
                    <Text style={{
                        fontFamily:'Poppins-Regular',
                        fontSize:14,
                        textAlign:'center',
                    }}>
                        Or Login With
                    </Text>

                </View>
           </View>
          
         <CustomButton type='secondary' 
                handleButtonPress={handlePhone} buttonText={'Login With Phone'}
                icon=
                {require('../../assets/image/smartphone.png')}  />
           <CustomButton type='secondary' 
                handleButtonPress={handleButtonPress} buttonText={'Login as a google'} icon=
                {require('../../assets/image/google.png')}
                />
       </ScrollView> 
            <View style={responsivestyle.footer}>
                <Text style={responsivestyle.footerfont}>Login as a guest</Text>
            </View>
            
        </View>
    );
};
export default Login;