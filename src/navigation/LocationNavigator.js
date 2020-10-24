import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ElocationScreen from "../screens/ElocationScreen";
import colors from "../utilities/colors";
import UserLocationScreen from "../screens/UserLocationScreen";
import NewLocationScreen from "../screens/NewLocationScreen";
import LeftUserCompte from "../components/user/LeftUserCompte";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import {useSelector} from "react-redux";
import routes from "./routes";

const LocationStackNav = createStackNavigator()

function LocationNavigator({navigation}) {
    const cartItemLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    return (
        <LocationStackNav.Navigator screenOptions={{
            headerStyle: {backgroundColor: colors.rougeBordeau},
            headerTintColor: colors.blanc,
            headerTitleAlign: 'center',
        }}>
            <LocationStackNav.Screen name='LocationScreen' component={ElocationScreen} options={{
                headerLeft: () => <LeftUserCompte getUserCompteNavigator={() =>navigation.openDrawer()}/>,
                title: 'e-location',
                headerRight: () => <CartIconRight cartLenght={cartItemLenght} getToCartScreen={() =>navigation.navigate('AccueilNavigator', {screen: routes.CART})}/>
            }}/>
            <LocationStackNav.Screen name='UserLocationScreen' component={UserLocationScreen} options={{
                title: 'Vos location',
            }}/>
            <LocationStackNav.Screen name='NewLocationScreen' component={NewLocationScreen} options={{
                title: 'Nouvelle location',
            }}/>

        </LocationStackNav.Navigator>
    );
}

export default LocationNavigator;