import React from 'react';
import {useSelector} from "react-redux";
import {createStackNavigator} from "@react-navigation/stack";
import EcommerceScreen from "../screens/EcommerceScreen";
import colors from "../utilities/colors";
import LeftUserCompte from "../components/user/LeftUserCompte";
import NewArticleScreen from "../screens/NewArticleScreen";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import routes from "./routes";
import AppSearchBar from "../components/AppSearchBar";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";

const CommerceStackNav = createStackNavigator()

function CommerceNavigator({navigation}) {
    const cartItemsLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)

    return (
        <CommerceStackNav.Navigator screenOptions={{
            headerStyle: {backgroundColor: colors.rougeBordeau},
            headerTintColor: colors.blanc,
            headerTitleAlign: 'center',
            headerRight: () => <CartIconRight cartLenght={cartItemsLenght} getToCartScreen={() => navigation.navigate('AccueilNavigator', {screen: routes.CART})}/>
        }}>
            <CommerceStackNav.Screen name='CommerceScreen' component={EcommerceScreen} options={{
                headerTitle: () => <AppSearchBar/>,
                headerLeft: () => <LeftUserCompte getUserCompteNavigator={() =>navigation.openDrawer()}/>
            }}/>
            <CommerceStackNav.Screen name='NewArticleScreen' component={NewArticleScreen} options={{
                title: 'Ajout nouvel article'
            }}/>

        </CommerceStackNav.Navigator>
    );
}

export default CommerceNavigator;