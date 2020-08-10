
import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";



import CadeauScreen from "../screens/CadeauScreen";
import AccueilNavigator from "./AccueilNavigator";
import OffreScreen from "../screens/OffreScreen";

import colors from "../utilities/colors";
import NotificationScreen from "../screens/NotificationScreen";
import AppIconWithBadge from "../components/AppIconWithBadge";
import routes from '../navigation/routes'

function TabNavigation(props) {
    const Tab = createBottomTabNavigator();


    return (

        <Tab.Navigator tabBarOptions={{
            activeTintColor: colors.rougeBordeau,
            marginBottom: 20
        }}
        >
        <Tab.Screen name="Accueil" component={AccueilNavigator}
                    options={{tabBarIcon: ({size, color}) => <AppIconWithBadge
                           name='home' notifStyle={{backgroundColor: colors.rougeBordeau}} badgeCount={5} size={size} color={color} />}}/>

        <Tab.Screen name="Offre" component={OffreScreen}
                    options={{tabBarIcon: ({size, color}) => <AppIconWithBadge
                            name='questioncircleo' badgeCount={1} size={size} color={color} notifStyle={{backgroundColor: colors.rougeBordeau}} />}}/>

        <Tab.Screen name="Cadeau" component = {CadeauScreen}
                    options={{tabBarIcon: ({size, color}) => <AppIconWithBadge
                            name='gift' notifStyle={{backgroundColor: colors.rougeBordeau}} color={color} size={size} badgeCount={4} />,
                        title:'Cadeau du jour'}}/>

        <Tab.Screen name="Notification"  component={NotificationScreen}
                    options={{tabBarIcon: ({size, color}) =>  <AppIconWithBadge
                            name='bells' badgeCount={9} size={size} color={color} notifStyle={{backgroundColor: colors.rougeBordeau}}/>}}/>

    </Tab.Navigator>

);
}

export default TabNavigation;