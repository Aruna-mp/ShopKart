import React,{createContext, useContext, useState,useEffect} from "react";
import { useWindowDimensions,Dimensions as dim, Dimensions } from "react-native";
export const DimensionContext=createContext();
export const useDimensionContext=()=>useContext(DimensionContext);
export const DimensionContextProvider=({children})=>{
    const dimensions=useWindowDimensions();
    const initHeight=dim.get('window').height;
    const initWidth=dim.get('window').width;
    const [windowHeight,setwindowHeight]=useState(initHeight);
    const [windowWidth,setwindowWidth]=useState(initWidth);
    const [isPortrait,setisPortrait]=useState(false);
    const checkIsPortrait = () => {
       
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
      };
      
    useEffect(()=>{
        setisPortrait(checkIsPortrait());
        Dimensions.addEventListener('change', () => {
            setisPortrait(checkIsPortrait());
        })
    },[])
    useEffect(()=>{
        setItem();
    },[dimensions]);
const setItem=()=>{
    const {width,height}=dimensions;
    setwindowHeight(height);
    setwindowWidth(width);
}

    return(
        <DimensionContext.Provider value={{
            windowHeight,
            windowWidth,
            isPortrait
        }}>{children}</DimensionContext.Provider>
    );
}