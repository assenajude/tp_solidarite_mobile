import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import CompteScreen from "../screens/CompteScreen"
import Color from '../utilities/colors';
import DrawerContent from '../components/user/DrawerContent';
import FavorisScreen from "../screens/FavorisScreen";
import FactureScreen from '../screens/FactureScreen';
import MessageScreen from "../screens/MessageScreen";
import ArticleScreen from "../screens/ArticleScreen";
import LocationScreen from "../screens/LocationScreen";
import ParametreScreen from "../screens/ParametreScreen";
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen'
import TabNavigation from "./TabNavigation";
import UserInfoScreen from "../screens/UserInfoScreen";
import UserNotifScreen from "../screens/UserNotifScreen";
import OtherFileNavigator from '../navigation/OtherFileNavigator'
const Drawer = createDrawerNavigator();



function UserCompteNavigation(props) {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props}/>}
                drawerContentOptions={{
                activeTintColor:Color.blanc,
                activeBackgroundColor:Color.rougeBordeau
            }
            }>
                <Drawer.Screen name='AccueilScreen' component={TabNavigation}/>
                <Drawer.Screen name='CompteScreen' component={CompteScreen}/>
                <Drawer.Screen name='FavorisScreen' component={FavorisScreen} />
                <Drawer.Screen name='FactureScreen' component={FactureScreen}/>
                <Drawer.Screen name='MessageScreen' component={MessageScreen} />
                <Drawer.Screen name='LocationScreen' component={LocationScreen}/>
                <Drawer.Screen name='ArticleScreen' component={ArticleScreen}/>
                <Drawer.Screen name='ParametreScreen' component={ParametreScreen} />
                <Drawer.Screen name='UserInfoScreen' component={UserInfoScreen}/>
                <Drawer.Screen name='UserNotifScreen' component={UserNotifScreen}/>
                <Drawer.Screen name='Other' component={OtherFileNavigator}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default UserCompteNavigation;