import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistStore,persistReducer} from "redux-persist";
import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import { shopKartReducer } from "./reducer";

// redux persist config
const persistConfig={
    key:'ShopKart',
    storage:AsyncStorage,
};
// middleware: Redux persist persisted reduce
const persistedReducer=persistReducer(persistConfig,shopKartReducer);

// redux: store
const store =configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware=>
    getDefaultMiddleware({
        immutableCheck:false,
        serializableCheck:false,
    }),
})
// middleware: Redux persist persister
let persister=persistStore(store);
// export
export {store,persister};