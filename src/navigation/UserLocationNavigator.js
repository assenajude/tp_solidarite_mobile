import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import UserLocationScreen from "../screens/UserLocationScreen";
import UserLocationValideScreen from "../screens/UserLocationValideScreen";
import UserLocationContratScreeen from "../screens/UserLocationContratScreeen";
import UserLocationHistoryScreen from "../screens/UserLocationHistoryScreen";

const LocationTopTab = createMaterialTopTabNavigator()

function UserLocationNavigator(props) {
    return (
        <LocationTopTab.Navigator>
            <LocationTopTab.Screen name='UserLocationContratScreen' component={UserLocationContratScreeen} options={{
                title: 'Contrats'
            }}/>

            <LocationTopTab.Screen name='UserLocationScreen' component={UserLocationScreen} options={{
                title: 'Demandes'
            }}/>

            <LocationTopTab.Screen name='UserLocationHistoryScreen' component={UserLocationHistoryScreen} options={{
                title: 'historique'
            }}/>

        </LocationTopTab.Navigator>
    );
}

export default UserLocationNavigator;