import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDimensionContext } from "../../context";
import style from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommonHeaderLeft from "../../components/CommonHeaderLeft";
import CommonButton from "../../components/CommonButton";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker,PROVIDER_GOOGLE } from "react-native-maps";
navigator.geolocation = require('@react-native-community/geolocation');
import Geolocation from "@react-native-community/geolocation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from "../../components/common/Colors";
import Snackbar from "react-native-snackbar";
import { useDispatch, useSelector } from "react-redux";
import RazorpayCheckout from 'react-native-razorpay';
import firestore from '@react-native-firebase/firestore';
import { updateCartCount } from "../../storage/action";

const AddAddress=()=>{
    
    const dimensions=useDimensionContext();
    const navigation=useNavigation();
    const responsivestyle=style(dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait);
    const [newPosition, setNewPosition] = useState({});
    const [address, setAddress] = useState('');
    const userId=useSelector(state=>state.userId);
    const firstName=useSelector(state=>state.firstName);
    const lastName=useSelector(state=>state.lastName);
    const email=useSelector(state=>state.email);
    const mobileNumber=useSelector(state=>state.mobileNumber);
    
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
    const route=useRoute();
    const { cartProducts,total } = route.params;
    useEffect(() => {
        getCurrentLocation();
        navigation.setOptions({
            headerLeft:()=><CommonHeaderLeft type='back'/>
        })
     }, []);
    const getCurrentLocation=()=>{
        Geolocation.getCurrentPosition(info => {
            setNewPosition({
                latitude:info?.coords?.latitude??0,
                longitude:info?.coords?.longitude??0,
                latitudeDelta:0.001,
                longitudeDelta:0.001,

        });
    });
    Snackbar.show({
        text: 'Current location is fetched.!',
       duration: Snackbar.LENGTH_SHORT,
       backgroundColor:Colors.green,
       textColor:Colors.white
    });

     }
     const handleCreateOrder=async paymentID=>{
        const smallId=paymentID.slice(4,12);
        await firestore().collection('Orders').add({
            orderId:String(smallId).toUpperCase(),
            created:Date.now(),
            updated:Date.now(),
            orderStatus:'Ordered',
            totalAmount:total,
            address:address,
            userId:userId,
            paymentMethod:'online',
            cartItems:cartProducts,
            userName: firstName+' '+lastName,
            userEmail:email,
            userPhone:mobileNumber,
            expDelDate:'',
        }).then(async resp=>{
            await firestore().collection('Cart')
            .where('userId','==',userId).
            get()
            .then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    doc.ref.delete()
                    .then(()=>{
                        setLoading(false);
                        dispatch(updateCartCount(0));
                        Snackbar.show({
                            text: 'Your Order is Successfully placed..!',
                           duration: Snackbar.LENGTH_SHORT,
                           backgroundColor:Colors.green,
                           textColor:Colors.white
                        });                
                        setTimeout(() => {
                            navigation.goBack();
                         }, 2000)

                    }).catch(err=>{
                        console.warn(err);
                    })
                })
            })
        })
        
     }
     const onButtonPress=()=>{
        var options = {
            description: 'Shopkart products parchase',
            // image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_CXo5HbmQ83IYL0', // Your api key
            amount: parseInt(total ,10)*100,
            name: 'Shopkart',
            prefill: {
              email: email,
              contact: mobileNumber,
              name: `${firstName} ${lastName}`
            },
            theme: {color: Colors.green}
          };
          RazorpayCheckout.open(options).then(data => {
            setLoading(true);
            handleCreateOrder(data.razorpay_payment_id);
          }).catch((error) => {
            Snackbar.show({
                text: 'Your order is failed.!',
               duration: Snackbar.LENGTH_SHORT,
               backgroundColor:Colors.red,
               textColor:Colors.white
            });
            navigation.goBack();
        
          });

     }
    return(
        <View style={responsivestyle.container}>
        <Modal animationType='fade' transparent={true} visible={loading}>
            <View style={{
                height:'100%',
                width:'100%',
                backgroundColor:'rgba(0,0,0,0.7)',
                justifyContent:'center',
                alignItems:'center'
            }}>
            <ActivityIndicator size={'large'} color={Colors.white}/>
            </View>
        </Modal>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps='always'
            >
          
            <GooglePlacesAutocomplete placeholder="Search Location"
            currentLocation={true}
            fetchDetails={true}
            currentLocationLabel="Current location"
            query={{
                key:'AIzaSyBxr99617iBz0j-ao6GzTTl_Kq0TuvZwg4',
                language:'en'
            }}
            styles={{textInput:responsivestyle.textInput,
                predefinedPlacesDescription:responsivestyle.description}}
                onPress={(data,details)=>{
                    const location=data?.geometry?.location??details?.geometry?.location;
                    const positionData={
                        latitude:location?.lat??0,
                        longitude:location?.lng??0,
                        latitudeDelta:0.001,
                        longitudeDelta:0.001,
                    }
                    setNewPosition(positionData);
                    setAddress(data?.name??data?.description);
                }}
                />


           <MapView
                style={{height:300,width:'100%'}}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
             }}
            showsUserLocation={true}
           followsUserLocation={true}
           zoomEnabled={true}
           pitchEnabled={true}
           rotateEnabled={true}
           scrollEnabled={true}
           showsMyLocationButton={true}
           onMapReady={res=>console.warn(res)}
           provider={'google'}
        >
        <Marker title={address} 
            description="This is your marker" 
            coordinate={{latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,}}/> 
           </MapView> 
           {address && (
                    <View style={{paddingHorizontal:15,
                    paddingTop:15}}>
                        <Text style={{
                            color:Colors.black,
                            fontFamily:'Poppins-Regular',
                            fontSize:18
                        }}>{address}</Text>
                    </View>
                )}

            {/* {newPosition &&(
           <MapView
           style={responsivestyle.mapview}
           initialRegion={newPosition}
           region={newPosition}
           showsUserLocation={true}
           followsUserLocation={true}
           zoomEnabled={true}
           pitchEnabled={true}
           rotateEnabled={true}
           scrollEnabled={true}
            provider={PROVIDER_GOOGLE}
           showsMyLocationButton={true}
           >
            <Marker title={address} 
            description="This is your marker" 
            coordinate={newPosition}/> 
           </MapView> 
           )} */}
            
           <TouchableOpacity style={responsivestyle.locationview} onPress={getCurrentLocation}>
            <View  style={responsivestyle.iconview}>
            <FontAwesome name="location-arrow" size={20} color={Colors.white} />
            </View>
            <Text style={responsivestyle.locationtext}> Your Current Location</Text>
           </TouchableOpacity>

           
            <CommonButton buttontext='Confirm location & proceed' 
                                onButtonPress={onButtonPress}/> 
            </ScrollView>
        </View>
    );
}
export default AddAddress;