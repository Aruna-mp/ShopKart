import React, { useEffect, useState } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Index from "../login";
import SignUp from "../SignUp";
import LoginPhone from "../LoginPhone";
import Home from "../Home";
import { DimensionContextProvider } from "../../context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Categories from "../Categories";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from "../Cart";
import CustomDrawer from "../../components/CustomDrawer";
import CustomFooter from "../../components/CustomFooter";
import Search from "../Search";
import Offers from "../Offers";
import Orders from "../Orders";
import Wishlist from "../Wishlist";
import Account from "../Account";
const Appstk=createNativeStackNavigator();
const drawer=createDrawerNavigator();
const footer=createBottomTabNavigator();
import styles from "./styles";
import { Provider, useSelector } from "react-redux";
import { store } from "../../storage/store";
import Splash from "../Splash";
import Shop from "../Shop";
import ProductDetails from "../ProductDetails";
import Review from "../Review";
import AddAddress from "../AddAddress";
import { enableLatestRenderer } from "react-native-maps";
import OrderDetails from "../OrderDetails";
const AppDrawer=()=>{
    const navigation=useNavigation();
    return(
    <drawer.Navigator initialRouteName="MyFooter"
    drawerContent={props=><CustomDrawer {...props}/>}
    screenOptions={{
        headerTitleAlign:'left',
        headerTitleStyle:styles.title,
        headerStyle:{
            height:80,
        }
    }}>
        <drawer.Screen name="MyFooter" 
        component={AppFooter}
        options={{headerShown:false}}/>
        <drawer.Screen name="Categories" component={Categories}/>
        <drawer.Screen name="Orders" component={Orders}/>
        <drawer.Screen name="OrderDetails" component={OrderDetails}/>
        <drawer.Screen name="Wishlist" component={Wishlist}/>
        <drawer.Screen name="Account" component={Account}/>
        <drawer.Screen name="Shop" component={Shop}/>
        <drawer.Screen name="ProductDetails" component={ProductDetails}/>
        <drawer.Screen name="Review" component={Review}/>
        <drawer.Screen name="AddAddress" component={AddAddress}/>
    </drawer.Navigator>
    );
}
const AppFooter=()=>{
    const navigation=useNavigation();
    return(
    <footer.Navigator 
    tabBar={props=><CustomFooter {...props}/>}
    screenOptions={{
        headerTitleAlign:'left',
        headerTitleStyle:styles.title,
        headerStyle:{
            height:80,
        }

}}>
        <footer.Screen name="Home" component={Home}
         options={{headerShown:false}} />
        <footer.Screen name="Categories" component={Categories}/>
        <footer.Screen name="Search" component={Search}/>
        <footer.Screen name="Offers" component={Offers}/>
        <footer.Screen name="Cart" component={Cart}/>
    </footer.Navigator>
    );
}


const AppNavigation=()=>
{
    const [loading,setLoading]=useState(true);
    const isLoggedIn=useSelector(state=>state.isLoggedIn);
    useEffect(() => {
        setTimeout(()=>{
            setLoading(false);
        },1000);
   
    }, [isLoggedIn]);
    return(
        <DimensionContextProvider>
        <NavigationContainer>
            <Appstk.Navigator screenOptions={{headerShown:false}}>
                {loading?<Appstk.Screen name="Slash" component={Splash}/>:
                <>
                    {isLoggedIn?  <Appstk.Screen name="MyDrawer" component={AppDrawer}/>
                :<>
                <Appstk.Screen name="Index" component={Index}/>
                <Appstk.Screen name="SignUp" component={SignUp}/>
                <Appstk.Screen name="LoginPhone" component={LoginPhone}/>

                </>} 
                
                </>}
                
              
            </Appstk.Navigator>
        </NavigationContainer>
        </DimensionContextProvider>
       
    );

}
const App=()=>{
    useEffect(() => {
    enableLatestRenderer();
    }, []);
    return(
        <Provider store={store}>
            <AppNavigation/>
        </Provider>
    );
}
export default App;