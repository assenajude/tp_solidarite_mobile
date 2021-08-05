import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import OtherFileMain from "../screens/OtherFileMain";
import color from '../utilities/colors'
import CategorieScreen from "../screens/CategorieScreen";
import NewCategorieScreen from "../screens/NewCategorieScreen";
import NewUserPayementScreen from "../screens/NewUserPayementScreen";
import PayementScreen from "../screens/PayementScreen";
import PointRelaisScreen from "../screens/PointRelaisScreen";
import NewPointRelaisScreen from "../screens/NewPointRelaisScreen";
import RegionScreen from "../screens/RegionScreen";
import VilleScreen from "../screens/VilleScreen";
import Avatar from "../components/user/Avatar";
import EspaceScreen from "../screens/EspaceScreen";

const StackOther = createStackNavigator();

function OtherFileNavigator({navigation}) {
    return (
        <StackOther.Navigator screenOptions={{
            headerStyle: {backgroundColor: color.rougeBordeau},
            headerTintColor: color.blanc
        }}>
            <StackOther.Screen name='OtherMain' component={OtherFileMain} options={{
                headerLeft: () => <Avatar onPress={() => navigation.openDrawer()}/>,
                title: 'Gestion des autres fichiers'
            }}/>
            <StackOther.Screen name='EspaceScreen' component={EspaceScreen} options={{
                title: 'Gestion des espaces'
            }}/>
            <StackOther.Screen name='CategorieScreen' component={CategorieScreen} options={{
                title: 'Toutes les categories'
            }}/>
            <StackOther.Screen name='NewCategorieScreen' component={NewCategorieScreen} options={{
                title: 'Nouvelle categorie'
            }}/>
            <StackOther.Screen name='PayementScreen' component={PayementScreen} options={{
                title: 'Gestion des payements'
            }}/>

            <StackOther.Screen name='NewUserPayementScreen' component={NewUserPayementScreen} options={{
                title: 'Nouveau payement utilisateur'
            }}/>



            <StackOther.Screen name='PointRelaisScreen' component={PointRelaisScreen} options={{
                title: 'Les Points relais'
            }}/>
            <StackOther.Screen name='NewPointRelaisScreen' component={NewPointRelaisScreen} options={{
                title: 'Nouveau point relais'
            }}/>

            <StackOther.Screen name='RegionScreen' component={RegionScreen} options={{
                title: 'Gestion des regions'
            }}/>
            <StackOther.Screen name='VilleScreen' component={VilleScreen} options={{
                title: 'Liste des villes'
            }}/>
        </StackOther.Navigator>
    );
}

export default OtherFileNavigator;