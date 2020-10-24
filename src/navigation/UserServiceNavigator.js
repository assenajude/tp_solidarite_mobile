import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import UserServiceScreen from "../screens/UserServiceScreen";
import UserAccordServiceScreen from "../screens/UserAccordServiceScreen";
import UserServiceContratScreen from "../screens/UserServiceContratScreen";
import UserServiceHistoryScreen from "../screens/UserServiceHistoryScreen";

const ServiceTopNavigator = createMaterialTopTabNavigator()
function UserServiceNavigator(props) {
    return (
        <ServiceTopNavigator.Navigator >
            <ServiceTopNavigator.Screen name='UserServiceContratScreen' component={UserServiceContratScreen} options={{
                title: 'Contrats'
            }}/>

            <ServiceTopNavigator.Screen name='UserServiceScreen' component={UserServiceScreen} options={{
                title: 'Demandes'
            }}/>
            <ServiceTopNavigator.Screen name='UserServiceHistoryScreen' component={UserServiceHistoryScreen} options={{
                title: 'Historique'
            }}
            />
        </ServiceTopNavigator.Navigator>
    );
}

export default UserServiceNavigator;