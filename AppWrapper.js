import React, {useState} from 'react';
import authStorage from "./src/store/persistStorage";
import {getAutoLogin, getLogout, getUserProfileAvatar} from "./src/store/slices/authSlice";
import {getAllMainData} from "./src/store/slices/mainSlice";
import AppLoading from "expo-app-loading";
import {NavigationContainer} from "@react-navigation/native";
import UserCompteNavigation from "./src/navigation/UserCompteNavigation";
import OfflineNotice from "./src/components/OfflineNotice";
import {useDispatch} from "react-redux";
import AppActivityIndicator from "./src/components/AppActivityIndicator";
import useManageUserOrder from "./src/hooks/useManageUserOrder";
import useAuth from "./src/hooks/useAuth";

function AppWrapper(props) {
    const dispatch = useDispatch()
    const {getOrderExpirationState} = useManageUserOrder()
    const {resetConnectedUserData, userRoleAdmin} = useAuth()

    const [isReady, setIsReady] = useState(false)

    const getStarted = async () => {
        const user = await authStorage.getUser();
        if (user !== null) {
            await dispatch(getAutoLogin(user))
            await dispatch(getUserProfileAvatar())
        } else {
            await dispatch(getLogout())
            resetConnectedUserData()
        }
        await dispatch(getAllMainData())
    }


    if(userRoleAdmin()) {
    setInterval(() => {
        getOrderExpirationState()
    }, 3600000)
    }

    const errorOnStarting = (error) => {
        throw new Error('error starting app')
    }

    if(!isReady) {
        return (
        <>
            <AppActivityIndicator visible={isReady === false}/>
        <AppLoading startAsync={getStarted}  onFinish={() => setIsReady(true)} onError={(error) => errorOnStarting(error)}/>
        </>
        )
    }

    return (
            <NavigationContainer>
                <UserCompteNavigation/>
                <OfflineNotice/>
            </NavigationContainer>
    );
}

export default AppWrapper;