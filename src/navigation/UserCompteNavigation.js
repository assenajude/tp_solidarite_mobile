import React, {useState} from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";

import Color from '../utilities/colors';

import DrawerContent from '../components/user/DrawerContent';
import TabNavigation from "./TabNavigation";

import OtherFileNavigator from '../navigation/OtherFileNavigator'
import OrderSuccessScreen from "../screens/OrderSuccessScreen";
import LocationNavigator from "./LocationNavigator";
import ServiceNavigator from "./ServiceNavigator";
import CommerceNavigator from "./CommerceNavigator";
import {useDispatch} from "react-redux";
import authStorage from '../store/persistStorage'
import {AppLoading} from "expo";
import {getAutoLogin, getUserProfileAvatar} from "../store/slices/authSlice";
import {getAllMainData} from "../store/slices/mainSlice";

const Drawer = createDrawerNavigator();



function UserCompteNavigation(props) {
    const dispatch = useDispatch()

    const [isReady, setIsReady] = useState(false)

    const getStarted = async () => {
        const user = await authStorage.getUser();
        if (user) {
            await dispatch(getAutoLogin(user))
            await dispatch(getUserProfileAvatar())
        }
            await dispatch(getAllMainData())
    }
    if(!isReady) {
        return <AppLoading startAsync={getStarted}  onFinish={() => setIsReady(true)} />
    }

    return (
                <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>}
                                  drawerContentOptions={{
                                      activeTintColor:Color.blanc,
                                      activeBackgroundColor:Color.rougeBordeau
                                  }
                                  }>
                    <Drawer.Screen name='AccueilScreen' component={TabNavigation}/>
                    <Drawer.Screen name='OtherMain' component={OtherFileNavigator}/>
                    <Drawer.Screen name='OrderSuccessScreen' component={OrderSuccessScreen}/>
                    <Drawer.Screen name='Location' component={LocationNavigator}/>
                    <Drawer.Screen name='Service' component={ServiceNavigator}/>
                    <Drawer.Screen name='Commerce' component={CommerceNavigator}/>
                </Drawer.Navigator>

    );

}

export default UserCompteNavigation;