import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'

import OtherFileMain from "../screens/OtherFileMain";
import OtherFileScreen from "../screens/OtherFileScreen";
import color from '../utilities/colors'
import LeftUserCompte from "../components/user/LeftUserCompte";
import CategorieScreen from "../screens/CategorieScreen";
import NewCategorieScreen from "../screens/NewCategorieScreen";
import UserPayementScreen from "../screens/UserPayementScreen";
import NewUserPayementScreen from "../screens/NewUserPayementScreen";
import PlanScreen from "../screens/PlanScreen";
import NewPlanScreen from "../screens/NewPlanScreen";
import LivraisonScreen from "../screens/LivraisonScreen";
import PayementScreen from "../screens/PayementScreen";

const StackOther = createStackNavigator();

function OtherFileNavigator({navigation}) {
    return (
        <StackOther.Navigator screenOptions={{
            headerStyle: {backgroundColor: color.rougeBordeau},
            headerTintColor: color.blanc
        }}>
            <StackOther.Screen name='OtherMain' component={OtherFileMain} options={{
                headerLeft: () => <LeftUserCompte getUserCompteNavigator={() => navigation.openDrawer()}/>,
                title: 'Gestion des autres fichiers'
            }}/>
            <StackOther.Screen name='OtherFileScreen' component={OtherFileScreen}/>
            <StackOther.Screen name='CategorieScreen' component={CategorieScreen} options={{
                title: 'Gestion des categories'
            }}/>
            <StackOther.Screen name='NewCategorieScreen' component={NewCategorieScreen} options={{
                title: 'Nouvelle categorie'
            }}/>
            <StackOther.Screen name='PayementScreen' component={PayementScreen} options={{
                title: 'Gestion des payements'
            }}/>
            <StackOther.Screen name='PlanScreen' component={PlanScreen} options={{
                title: 'Gestion des plans'
            }}/>
            <StackOther.Screen name='NewPlanScreen' component={NewPlanScreen} options={{
                title: 'Nouveau plan'
            }}/>
            <StackOther.Screen name='UserPayementScreen' component={UserPayementScreen} options={{
                title: 'Gestion payements utilisateur'
            }}/>
            <StackOther.Screen name='NewUserPayementScreen' component={NewUserPayementScreen} options={{
                title: 'Nouveau payement utilisateur'
            }}/>

            <StackOther.Screen name='LivraisonScreen' component={LivraisonScreen} options={{
                title: 'Gestion  livraisons'
            }}/>
        </StackOther.Navigator>
    );
}

export default OtherFileNavigator;