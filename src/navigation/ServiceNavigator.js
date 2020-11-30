import React from 'react';
import {useSelector} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import EserviceScreen from "../screens/EserviceScreen";
import colors from "../utilities/colors";
import LeftUserCompte from "../components/user/LeftUserCompte";
import NewServiceScreen from "../screens/NewServiceScreen";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import routes from "./routes";
import AppSearchBar from "../components/AppSearchBar";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";

const ServiceStackNav = createStackNavigator()

function ServiceNavigator({navigation}) {
    const itemsLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)

    return (
        <ServiceStackNav.Navigator screenOptions={{
            headerStyle: {backgroundColor: colors.rougeBordeau},
            headerTintColor: colors.blanc,
            headerTitleAlign: 'center',
            headerRight: () => <CartIconRight cartLenght={itemsLenght} getToCartScreen={() => navigation.navigate('AccueilNavigator', {screen: routes.CART})} />
        }}>
            <ServiceStackNav.Screen name='ServiceScreen' component={EserviceScreen} options={{
                headerTitle: () => <AppSearchBar/>,
                headerLeft: () => <LeftUserCompte getUserCompteNavigator={() =>navigation.openDrawer()}/>
            }}/>
            <ServiceStackNav.Screen name='NewServiceScreen' component={NewServiceScreen} options={{
                title: 'Ajout nouveau service',
            }}/>
            <ServiceStackNav.Screen name='ServiceDetailScreen' component={ServiceDetailScreen} options={({route}) => ({
                title: 'Detail '+route.params.libelle
            })}/>

        </ServiceStackNav.Navigator>
    );
}

export default ServiceNavigator;