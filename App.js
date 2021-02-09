
import React, {useState} from "react";
import {Provider} from 'react-redux'

import configureStore from "./src/store/configureStore";

import {NavigationContainer} from "@react-navigation/native";
import UserCompteNavigation from "./src/navigation/UserCompteNavigation";
import {SafeAreaProvider} from "react-native-safe-area-context";
import OfflineNotice from "./src/components/OfflineNotice";
import {AppLoading} from "expo";
import authStorage from "./src/store/persistStorage";
import {getAutoLogin, getUserProfileAvatar} from "./src/store/slices/authSlice";
import {getAllMainData} from "./src/store/slices/mainSlice";
import AppWrapper from "./AppWrapper";


export default function App() {
    const store = configureStore();

    return (
          <SafeAreaProvider>
             <Provider store={store}>
               <AppWrapper/>
               </Provider>
          </SafeAreaProvider>
        )
}
