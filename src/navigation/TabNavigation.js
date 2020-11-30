import React from 'react';
import {useSelector} from "react-redux";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {FontAwesome5, MaterialCommunityIcons, Entypo} from '@expo/vector-icons'

import AccueilNavigator from "./AccueilNavigator";
import colors from "../utilities/colors";
import AppIconWithBadge from "../components/AppIconWithBadge";
import LocationNavigator from "./LocationNavigator";
import CommerceNavigator from "./CommerceNavigator";
import ServiceNavigator from "./ServiceNavigator";

function TabNavigation(props) {
    const Tab = createBottomTabNavigator();

    const homeCounter = useSelector(state => state.entities.main.homeCounter)


    return (

        <Tab.Navigator tabBarOptions={{
            activeTintColor: colors.blanc,
            activeBackgroundColor: colors.rougeBordeau
        }}
        >
        <Tab.Screen name="AccueilNavigator" component={AccueilNavigator}
                    options={{tabBarIcon: ({size, color}) => <AppIconWithBadge notifStyle={{backgroundColor: colors.bleuFbi}} badgeCount={homeCounter} >
                            <FontAwesome5 name="home" size={size} color={color} />
                        </AppIconWithBadge>,
                    title: 'Accueil'}}/>

        <Tab.Screen name="E-commerce" component={CommerceNavigator}
                    options={{tabBarIcon: ({size, color}) =>
                            <Entypo name="shopping-basket" size={size} color={color} />,
                    title: 'e-commerce'}} />

        <Tab.Screen name="E-location" component = {LocationNavigator}
                    options={{tabBarIcon: ({size, color}) =>
                            <MaterialCommunityIcons name="warehouse" size={size} color={color} />,
                        title:'e-location'}}/>

        <Tab.Screen name="E-service"  component={ServiceNavigator}
                    options={{tabBarIcon: ({size, color}) =>
                            <FontAwesome5 name="hands-helping" size={size} color={color} />,
                    title: 'e-service'}}/>

    </Tab.Navigator>

);
}

export default TabNavigation;