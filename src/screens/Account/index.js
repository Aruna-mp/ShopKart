import React, { useEffect, useState } from "react";
import {Image, Text, TouchableOpacity, View, Modal, ScrollView } from "react-native";
import { useDimensionContext } from "../../context";
import { useNavigation } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import style from "./style";
import ImagePicker from 'react-native-image-crop-picker';
import Colors from "../../components/common/Colors";
import CustumTextInput from "../../components/CustumTextInput";
import CustomButton from "../../components/CustomButton";
import Snackbar from "react-native-snackbar";
import { validateEmail, validatePhoneNumber } from "../../components/common/validations";
import { useDispatch, useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';
import { updateProfile } from "../../storage/action";
import { updateProfileImage } from "./controller";


const Account=()=>{
    const dimensions=useDimensionContext();
    const navigation=useNavigation();
    const responsivestyle=style(
        dimensions.windowWidth,
        dimensions.windowHeight,
        dimensions.isPortrait);
    const userId=useSelector(state=>state.userId);
    const firstName=useSelector(state=>state.firstName);
    const lastName=useSelector(state=>state.lastName);
    const email=useSelector(state=>state.email);
    const mobileNumber=useSelector(state=>state.mobileNumber);
    const profileImage=useSelector(state=>state.profileImage);
    const dispatch=useDispatch();

    const [fname,setFname]=useState(firstName);
    const [lname,setLname]=useState(lastName);
    const [modal,setModal]=useState(false);
    const [modalChoose,setModalChoose]=useState(false);
    const [userImage,setUserImage]=useState('');
    const [phone,setPhone]=useState(mobileNumber);
    const [stateEmail, setEmail] = useState(email);
    
    useEffect(() => {
        navigation.setOptions({
        headerLeft:()=><CommonHeaderLeft/>,
        });
     }, []);

     const handleOpenimage=()=>{
        setModal(!modal);
     }

     const handleEditimage=()=>{
       setModalChoose(true);
     }
     const handlePickfromGallery=()=>{
        
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          })
          .then(image => {
        setUserImage(image.sourceURL?? '');
        setModalChoose(false);

          }).catch(err=>{
            console.warn(err);
          });
     }
     const handlefromCamera=()=>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
          })
          .catch(err=>{
            console.warn(err);
          });;
     }
     const handleUpdateProfile=async()=>{
            if(validatePhoneNumber(phone.trim())){
                if(validateEmail(stateEmail.trim())){
                    if(fname !=='' && lname!==''){
                      let newUrl=profileImage;
                      if(userImage!==''){
                        newUrl=await updateProfileImage(userImage);
                      }
              await firestore()
              .collection('users')
              .doc(userId)
              .update({
                firstName:fname,
                lastName:lname,
                email:stateEmail,
                mobilenumber:phone,
                profileimage:newUrl,
              }).then(()=>{

                dispatch(updateProfile({
                  firstName:fname,
                  lastName:lname,
                  email: stateEmail,
                  mobileNumber:phone,
                  profileImage:newUrl,
                }))
                  setUserImage('');
                Snackbar.show({
                  text: 'Profile is updated.!',
                 duration: Snackbar.LENGTH_SHORT,
                 backgroundColor:Colors.green,
                 textColor:Colors.white
              });
              });

                    }
                    else{
                        Snackbar.show({
                            text: 'Fill up all the fields to continue',
                           duration: Snackbar.LENGTH_SHORT,
                           backgroundColor:Colors.red,
                           textColor:Colors.white
                        });
                    }
                }
                else{
                    Snackbar.show({
                        text: 'Given Email is not valid',
                       duration: Snackbar.LENGTH_SHORT,
                       backgroundColor:Colors.red,
                       textColor:Colors.white
                    });
                }

            }
            else{
                Snackbar.show({
                    text: 'Given phone number is not valid',
                   duration: Snackbar.LENGTH_SHORT,
                   backgroundColor:Colors.red,
                   textColor:Colors.white
                });
            }
        
        
     }

    return(
        <ScrollView showsVerticalScrollIndicator={false}
        style={responsivestyle.container}> 
         <Text style={responsivestyle.name}>
            {firstName}  {lastName}
            </Text>
    <View style={responsivestyle.imageview}>
        <TouchableOpacity onPress={handleOpenimage}>
        <Image source={userImage===''
                     ?profileImage===''
                     ?require('../../assets/image/profile.png')
                     :{uri:profileImage}
                    :{uri:userImage} }
         style={responsivestyle.image}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEditimage}
        style={responsivestyle.touchedit}>
        <Image source={require('../../assets/image/edit-black.png')}
         style={responsivestyle.edit}/>
      </TouchableOpacity>
    </View> 
    <CustumTextInput value={fname}
     handleText={text=> setFname(text)}
      placeholder=" First Name  "/> 
      <CustumTextInput value={lname}
     handleText={text=> setLname(text)}
      placeholder=" Last Name  "/> 
      <CustumTextInput type={'email'}
      value={stateEmail}
     handleText={text=> setEmail(text)}
      placeholder=" Email Address  "/>  
      <CustumTextInput type={'phone'}
      value={phone}
     handleText={text=> setPhone(text)}
      placeholder=" Mobile Number   "/> 
     <CustomButton type='primary'
      handleButtonPress={handleUpdateProfile} buttonText={'Update Profile'}/>    
    <Modal visible={modal} onRequestClose={()=>setModal(false)}
     transparent>
 <View style={responsivestyle.modalview}> 
 <View> 
 <TouchableOpacity onPress={()=>setModal(false)}
 style={responsivestyle.closeview}>
 <Image source={require('../../assets/image/close.png')}
         style={responsivestyle.edit}/>
 </TouchableOpacity>
 <Image source={userImage===''
                     ?require('../../assets/image/profile.png')
                    :{uri:userImage}}
         style={responsivestyle.bigimage}/>
 </View>
 </View>
 </Modal>

 <Modal visible={modalChoose} onRequestClose={()=>setModalChoose(false)}
     transparent>
 <View style={responsivestyle.modalview}> 
 <TouchableOpacity onPress={()=>setModalChoose(false)}
 style={responsivestyle.closeview}>
 <Image source={require('../../assets/image/close.png')}
         style={responsivestyle.edit}/>
 </TouchableOpacity>
 <View style={responsivestyle.selectbox}>
    <TouchableOpacity  style={responsivestyle.touch}
    onPress={handlePickfromGallery}>
    <Text style={responsivestyle.pick}>Gallery</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handlefromCamera}
    style={responsivestyle.touch}>
    <Text style={responsivestyle.pick}>Camera</Text>
    </TouchableOpacity>
 </View>
 </View>
 </Modal>
 </ScrollView>
    );
};
export default Account;