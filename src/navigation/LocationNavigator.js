import React, {useState, useEffect} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {Keyboard} from 'react-native'
import ElocationScreen from "../screens/ElocationScreen";
import colors from "../utilities/colors";
import UserLocationScreen from "../screens/UserLocationScreen";
import NewLocationScreen from "../screens/NewLocationScreen";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import {useDispatch, useSelector} from "react-redux";
import routes from "./routes";
import AppTopBar from "../components/AppTopBar";
import Avatar from "../components/user/Avatar";
import {getLocationsByCategories, getLocationSearch} from "../store/slices/locationSlice";
import {getSelectedCategoryArticles} from "../store/slices/articleSlice";

const LocationStackNav = createStackNavigator()

function LocationNavigator({navigation}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const locationCategories = useSelector(state => {
        const allCategories = state.entities.categorie.list
        const newCategorieTab = allCategories.filter(categ => categ.typeCateg === 'location')
        return newCategorieTab
    })
    const cartItemLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    const [searchValue, setSearchValue] = useState('')
    const [locationModalVisible, setLocationModalVisible] = useState(false)
    const [locationSearching, setLocationSearching] = useState(false)

    const handleLocationSearch = () => {
        dispatch(getLocationSearch(searchValue))
    }

    const hideLocationKeyboard =() => {
        setLocationSearching(false)
    }

    const handleCategorySelection = (category) => {
        dispatch(getLocationsByCategories(category))
        setLocationModalVisible(false)
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidHide', hideLocationKeyboard)
        return () => {
            Keyboard.removeListener('keyboardDidHide', hideLocationKeyboard)
        }
    }, [])

    return (
        <LocationStackNav.Navigator screenOptions={{
            headerStyle: {backgroundColor: colors.rougeBordeau},
            headerTintColor: colors.blanc,
            headerTitleAlign: 'center',
        }}>
            <LocationStackNav.Screen name='LocationScreen' component={ElocationScreen} options={{
                headerLeft: () => <Avatar userAvatar={{uri: user.avatar}} otherImageStyle={{height: 40,width: 40}} onPress={() =>navigation.openDrawer()}/>,
                headerTitle: () => <AppTopBar  getAllCategories={() => {
                    dispatch(getLocationsByCategories('all'))
                    setLocationModalVisible(false)
                }} getSelectedCategory={handleCategorySelection} categoryList={locationCategories} searchValue={searchValue} changeSearchValue={(val) => setSearchValue(val)} handleSearch={handleLocationSearch}
                                              spaceModalVisible={locationModalVisible} showSpaceModal={() => setLocationModalVisible(true)}
                                              searching={locationSearching} startingSearch={() => setLocationSearching(true)}
                                              closeSpaceModal={() => setLocationModalVisible(false)} leaveInput={() => setLocationSearching(false)}/>,
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