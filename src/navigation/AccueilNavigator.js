import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";
import {StyleSheet, TextInput,View, TouchableOpacity, Image, Keyboard} from 'react-native';


import AccueilScreen from "../screens/AccueilScreen";
import Color from "../utilities/colors";
import DetailScreen from '../screens/DetailScreen';
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import OrderScreen from "../screens/OrderScreen";
import LeftUserCompte from "../components/user/LeftUserCompte";
import PlanScreen from "../screens/PlanScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderPayementScreen from "../screens/OrderPayementScreen";
import OrderLivraisonScreen from "../screens/OrderLivraisonScreen";
import UserFavorisScreen from "../screens/UserFavorisScreen";
import CompteScreen from "../screens/CompteScreen";
import UserMessageScreen from "../screens/UserMessageScreen";
import ElocationScreen from "../screens/ElocationScreen";
import ArticleScreen from "../screens/ArticleScreen";
import ParametreScreen from "../screens/ParametreScreen";
import NotificationScreen from "../screens/NotificationScreen";
import UserAdresseScreen from "../screens/UserAdresseScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import FactureDetailsScreen from "../screens/FactureDetailsScreen";
import ReserveLocationScreen from "../screens/ReserveLocationScreen";
import NewUserAdresseScreen from "../screens/NewUserAdresseScreen";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import UserLocationNavigator from "./UserLocationNavigator";
import UserServiceNavigator from "./UserServiceNavigator";
import UserOrderNavigator from "./UserOrderNavigator";
import UserFactureNavigator from "./UserFactureNavigator";
import routes from "./routes";
import OrderItemEditScreen from "../screens/OrderItemEditScreen";



const ArticleStackNavigator = createStackNavigator();

const AccueilNavigator = () => {
const navigation = useNavigation()
    const cartItemLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    return (
        <ArticleStackNavigator.Navigator screenOptions={{
            headerStyle: {backgroundColor: Color.rougeBordeau},
            headerTintColor: Color.blanc,
            headerRight: ({size, color}) => (
                <CartIconRight cartLenght={cartItemLenght} getToCartScreen={() => navigation.navigate('AccueilNavigator', {screen: 'ShoppingCartScreen'})}/>
                )
        }}>
            <ArticleStackNavigator.Screen name='AccueilScreen' component={AccueilScreen}
               options={{
                   headerTitleAlign: 'center',
                   headerLeft: () => <LeftUserCompte getUserCompteNavigator={() =>navigation.openDrawer()}/>,
                   headerTitle: 'Accueil',
               }}/>
            <ArticleStackNavigator.Screen name='DetailScreen' component={DetailScreen}
             options={
               ({route}) =>
              ({title: 'Detail '+route.params.designArticle })}/>
              <ArticleStackNavigator.Screen name='ShoppingCartScreen' component={ShoppingCartScreen}
              options={{title: 'Panier' }}/>

            <ArticleStackNavigator.Screen name='PlanScreen' component={PlanScreen} options={{title: 'Choisir un Plan'}}/>

            <ArticleStackNavigator.Screen name='RegisterScreen' component={RegisterScreen} options={{title: 'Compte utilisateur'}}/>
            <ArticleStackNavigator.Screen name='LoginScreen' component={LoginScreen} options={{title: 'Compte utilisateur'}}/>
            <ArticleStackNavigator.Screen name='OrderPayementScreen' component={OrderPayementScreen} options={{title: 'Payement de la commande'}}/>
            <ArticleStackNavigator.Screen name='OrderLivraisonScreen' component={OrderLivraisonScreen} options={{title: 'Livraison de la commande'}}/>
            <ArticleStackNavigator.Screen name='UserOrderScreen' component={UserOrderNavigator} options={{
                title: 'Vos commandes',
                headerLeft:(props) => <HeaderBackButton {...props} onPress={() => {
                    navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})}
                }/>}}/>
            <ArticleStackNavigator.Screen name='UserFavorisScreen' component={UserFavorisScreen} options={{title: 'Vos Favoris'}}/>
            <ArticleStackNavigator.Screen name='UserFactureScreen' component={UserFactureNavigator} options={{title: 'Vos Factures'}}/>
            <ArticleStackNavigator.Screen name='CompteScreen' component={CompteScreen} options={{title: 'Gerez votre compte'}}/>
            <ArticleStackNavigator.Screen name='UserMessageScreen' component={UserMessageScreen} options={{title: 'Vos messages'}}/>
            <ArticleStackNavigator.Screen name='LocationScreen' component={ElocationScreen} options={{title: 'Vos Locations'}}/>
            <ArticleStackNavigator.Screen name='ArticleScreen' component={ArticleScreen} options={{title: 'Gestion de vos article'}}/>
            <ArticleStackNavigator.Screen name='ParametreScreen' component={ParametreScreen} options={{title: 'Gerez vos parametres'}}/>
            <ArticleStackNavigator.Screen name='NotificationScreen' component={NotificationScreen} options={{title: 'Vos Notifications'}}/>
            <ArticleStackNavigator.Screen name='OrderScreen' component={OrderScreen} options={{title: 'Resumé de votre commande'}}/>
            <ArticleStackNavigator.Screen name='OrderDetailsScreen' component={OrderDetailsScreen} options={({route}) =>
                ({title: 'Detail Commande'+' '+ route.params.numero })
            }/>
            <ArticleStackNavigator.Screen name='FactureDetailsScreen' component={FactureDetailsScreen} options={({route}) =>
                ({title: 'Detail Facture'+' '+ route.params.numero })
            }/>
            <ArticleStackNavigator.Screen name='ReserveLocationScreen' component={ReserveLocationScreen} options={{
                title: 'Vos Reserves location'
            }}/>
            <ArticleStackNavigator.Screen name='UserAdresseScreen' component={UserAdresseScreen} options={{
                title: 'Vos adresses'
            }}/>
            <ArticleStackNavigator.Screen name='NewUserAdresseScreen' component={NewUserAdresseScreen} options={{
                title: 'Ajout nouvelle adresse'
            }}/>


            <ArticleStackNavigator.Screen name='UserServiceScreen' component={UserServiceNavigator} options={{
                title: 'Vos services',
                headerLeft:(props) => <HeaderBackButton {...props} onPress={() => {
                navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})}
                }/>
            }}/>
            <ArticleStackNavigator.Screen name='UserLocation' component={UserLocationNavigator} options={{
                title: 'Vos Locations',
                headerLeft:(props) => <HeaderBackButton {...props} onPress={() => {
                    navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})}
                }/>
            }}/>
            <ArticleStackNavigator.Screen name='OrderItemEditScreen' component={OrderItemEditScreen} options={{
                title: 'Edition'
            }}/>
        </ArticleStackNavigator.Navigator>
)};

const styles = StyleSheet.create({
     shopCardStyle: {
         marginRight: 10
     },
    headerTitleStyle:{
         flexDirection: 'row'
    },
    avatarStyle: {
         width: 40,
        height: 40,
        borderRadius: 20
    }
})

export default AccueilNavigator;