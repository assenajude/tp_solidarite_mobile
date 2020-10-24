import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import UserFactureScreen from "../screens/UserFactureScreen";
import UserFactureOkScreen from "../screens/UserFactureOkScreen";
import UserFactureEncoursScreen from "../screens/UserFactureEncoursScreen";

const UserFactTopNavigator = createMaterialTopTabNavigator()

function UserFactureNavigator(props) {
    return (
        <UserFactTopNavigator.Navigator>
            <UserFactTopNavigator.Screen name='UserFactureScreen' component={UserFactureScreen} options={{
                title: 'Tous'
            }}/>
            <UserFactTopNavigator.Screen name='UserFactureEncoursScreen' component={UserFactureEncoursScreen} options={{
                title: 'En cours'
            }}/>
            <UserFactTopNavigator.Screen name='UserFactureOkScreen' component={UserFactureOkScreen} options={{
                title: 'Déjà soldées'
            }}/>
        </UserFactTopNavigator.Navigator>
    );
}

export default UserFactureNavigator;