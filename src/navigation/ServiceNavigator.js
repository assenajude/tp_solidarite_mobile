import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import EserviceScreen from "../screens/EserviceScreen";
import colors from "../utilities/colors";
import NewServiceScreen from "../screens/NewServiceScreen";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import routes from "./routes";
import AppSearchBar from "../components/AppSearchBar";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import Avatar from "../components/user/Avatar";
import {getSearchService} from "../store/slices/serviceSlice";

const ServiceStackNav = createStackNavigator()

function ServiceNavigator({navigation}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const itemsLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    const [search, setSearch] = useState('')

    const handleSearch = () => {
        dispatch(getSearchService(search))
    }

    return (
        <ServiceStackNav.Navigator screenOptions={{
            headerStyle: {backgroundColor: colors.rougeBordeau},
            headerTintColor: colors.blanc,
            headerTitleAlign: 'center',
            headerRight: () => <CartIconRight cartLenght={itemsLenght} getToCartScreen={() => navigation.navigate('AccueilNavigator', {screen: routes.CART})} />
        }}>
            <ServiceStackNav.Screen name='ServiceScreen' component={EserviceScreen} options={{
                headerTitle: () => <AppSearchBar searchValue={search} changeSearchValue={(value) => setSearch(value)} handleSearch={handleSearch}/>,
                headerLeft: () => <Avatar userAvatar={{uri: user.avatar}} otherImageStyle={{width: 40,height: 40}} onPress={() =>navigation.openDrawer()}/>
            }}/>
            <ServiceStackNav.Screen name='NewServiceScreen' component={NewServiceScreen} options={{
                title: 'Ajout nouveau service',
            }}/>
           {/* <ServiceStackNav.Screen name='ServiceDetailScreen' component={ServiceDetailScreen} options={({route}) => ({
                title: 'Detail '+route.params.libelle
            })}/>
*/}
        </ServiceStackNav.Navigator>
    );
}

export default ServiceNavigator;