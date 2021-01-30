import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import EcommerceScreen from "../screens/EcommerceScreen";
import colors from "../utilities/colors";
import NewArticleScreen from "../screens/NewArticleScreen";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import routes from "./routes";
import AppSearchBar from "../components/AppSearchBar";
import Avatar from "../components/user/Avatar";
import {getSearchArticle} from "../store/slices/articleSlice";

const CommerceStackNav = createStackNavigator()

function CommerceNavigator({navigation}) {
    const dispatch = useDispatch()
    const cartItemsLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    const [searchValue, setSearchValue] = useState('')

    const handleCommerceSearch = () => {
        dispatch(getSearchArticle(searchValue))
    }

    return (
        <CommerceStackNav.Navigator screenOptions={{
            headerStyle: {backgroundColor: colors.rougeBordeau},
            headerTintColor: colors.blanc,
            headerTitleAlign: 'center',
            headerRight: () => <CartIconRight cartLenght={cartItemsLenght} getToCartScreen={() => navigation.navigate('AccueilNavigator', {screen: routes.CART})}/>
        }}>
            <CommerceStackNav.Screen name='CommerceScreen' component={EcommerceScreen} options={{
                headerTitle: () => <AppSearchBar searchValue={searchValue} changeSearchValue={(val) => setSearchValue(val)}
                                                 handleSearch={handleCommerceSearch} />,
                headerLeft: () => <Avatar otherImageStyle={{height: 40, width: 40}} onPress={() =>navigation.openDrawer()}/>
            }}/>
            <CommerceStackNav.Screen name='NewArticleScreen' component={NewArticleScreen} options={{
                title: 'Ajout nouvel article'
            }}/>

        </CommerceStackNav.Navigator>
    );
}

export default CommerceNavigator;