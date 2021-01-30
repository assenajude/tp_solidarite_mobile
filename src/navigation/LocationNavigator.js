import React, {useState} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import ElocationScreen from "../screens/ElocationScreen";
import colors from "../utilities/colors";
import UserLocationScreen from "../screens/UserLocationScreen";
import NewLocationScreen from "../screens/NewLocationScreen";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import {useDispatch, useSelector} from "react-redux";
import routes from "./routes";
import AppSearchBar from "../components/AppSearchBar";
import Avatar from "../components/user/Avatar";
import {getLocationSearch} from "../store/slices/locationSlice";

const LocationStackNav = createStackNavigator()

function LocationNavigator({navigation}) {
    const dispatch = useDispatch()
    const cartItemLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    const [searchValue, setSearchValue] = useState('')

    const handleLocationSearch = () => {
        dispatch(getLocationSearch(searchValue))
    }

    return (
        <LocationStackNav.Navigator screenOptions={{
            headerStyle: {backgroundColor: colors.rougeBordeau},
            headerTintColor: colors.blanc,
            headerTitleAlign: 'center',
        }}>
            <LocationStackNav.Screen name='LocationScreen' component={ElocationScreen} options={{
                headerLeft: () => <Avatar otherImageStyle={{height: 40,width: 40}} onPress={() =>navigation.openDrawer()}/>,
                headerTitle: () => <AppSearchBar searchValue={searchValue} changeSearchValue={(val) => setSearchValue(val)} handleSearch={handleLocationSearch}/>,
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