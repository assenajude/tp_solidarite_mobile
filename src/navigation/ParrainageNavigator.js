import React from 'react';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {Dimensions} from "react-native";
import CompteParrainScreen from "../screens/CompteParrainScreen";
import UserParrainageScreen from "../screens/UserParrainageScreen";
import ListeParrainScreen from "../screens/ListeParrainScreen";

const ParrainTopNavigator = createMaterialTopTabNavigator()

function ParrainageNavigator(props) {
    return (
        <ParrainTopNavigator.Navigator initialLayout={{width: Dimensions.get('window').width}}>
            <ParrainTopNavigator.Screen name='CompteParrainScreen' component={CompteParrainScreen} options={{title:'compte'}}/>
            <ParrainTopNavigator.Screen name='UserParrainageScreen' component={UserParrainageScreen} options={{title:'vos parrainage'}}/>
            <ParrainTopNavigator.Screen name='ListeParrainScreen' component={ListeParrainScreen} options={{title: 'liste parrains'}}/>

        </ParrainTopNavigator.Navigator>
    );
}

export default ParrainageNavigator;