import React, {useState} from 'react';
import {useSelector} from 'react-redux'
import {createStackNavigator} from "@react-navigation/stack";
import {StyleSheet, TextInput,View, TouchableOpacity, Image, Keyboard} from 'react-native';


import AccueilScreen from "../screens/AccueilScreen";
import Color from "../utilities/colors";
import DetailScreen from '../screens/DetailScreen';
import AppAvatar from "../components/AppAvatar";
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import AppSearchBar from "../components/AppSearchBar";
import OrderScreen from "../screens/OrderScreen";
import AppIconWithBadge from '../components/AppIconWithBadge'
import DropDownPicker from '../components/picker/DropdownPickerWithSearch'
import routes from "./routes";
import CategorieScreen from "../screens/CategorieScreen";
import NewCategorieScreen from "../screens/NewCategorieScreen";
import LeftUserCompte from "../components/user/LeftUserCompte";
import configureStore from "../store/configureStore";
import PlanScreen from "../screens/PlanScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderPayementScreen from "../screens/OrderPayementScreen";
import OrderLivraisonScreen from "../screens/OrderLivraisonScreen";



const ArticleStackNavigator = createStackNavigator();

const AccueilNavigator = ({navigation}) => {

    const [product, setProduct] = useState('Tous');
    const cartItemLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    const badgeCompte = 5;
    const pickerItems = [
        {
            label: 'Tous',
            value:1,
            selected: true
        },
        {
            label: 'Article',
            value: 2
        },
        {
            label: 'Location',
            value: 3
        }
    ]
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(pickerItems[0].label);
    const [showPicker, setShowPicker] = useState(true)
    return (
        <ArticleStackNavigator.Navigator screenOptions={{
            headerStyle: {backgroundColor: Color.rougeBordeau},
            headerTintColor: Color.blanc,
            headerRight: ({size, color}) => (
                <TouchableOpacity onPress={() => navigation.navigate(routes.CART)}>
                <AppIconWithBadge notifStyle={{backgroundColor: Color.bleuFbi}} style={{marginRight: 10}} color={Color.blanc} name='shoppingcart' size={24} badgeCount={cartItemLenght}
                                  />
                </TouchableOpacity>
            )
        }}>
            <ArticleStackNavigator.Screen name='AccueilScreen' component={AccueilScreen}
               options={{
                   headerTitleAlign: 'center',
                   headerLeft: () => <LeftUserCompte getUserCompteNavigator={() =>navigation.openDrawer()}/>,
                   headerTitle: 'Accueil',
        /*           headerTitle: () => {
                       if (showPicker) {
                           return (

                        <DropDownPicker getInput={() => setShowPicker(false)}
                            pickerStyle={{color: Color.blanc}} selected={product}
                            changeSelectedValue={(itemValue, itemIndex) => setProduct(itemValue)}/>
                               )
                       } else {
                           return (<AppSearchBar leaveInput={() => {
                               setShowPicker(true)
                           }}></AppSearchBar>)
                       }
                   }*/
               }}/>
            <ArticleStackNavigator.Screen name='DetailScreen' component={DetailScreen}
             options={
               ({route}) =>
              ({title: 'Detail '+route.params.designArticle })}/>
              <ArticleStackNavigator.Screen name='ShoppingCartScreen' component={ShoppingCartScreen}
              options={{title: 'Panier' }}/>
              <ArticleStackNavigator.Screen name='OrderScreen' component={OrderScreen}
              options={{title: 'Resumé de votre commande'}}/>
            <ArticleStackNavigator.Screen name='PlanScreen' component={PlanScreen} options={{title: 'Choisir un Plan'}}/>

            <ArticleStackNavigator.Screen name='RegisterScreen' component={RegisterScreen} options={{title: 'Compte utilisateur'}}/>
            <ArticleStackNavigator.Screen name='LoginScreen' component={LoginScreen} options={{title: 'Compte utilisateur'}}/>
            <ArticleStackNavigator.Screen name='OrderPayementScreen' component={OrderPayementScreen} options={{title: 'Payement de la commande'}}/>
            <ArticleStackNavigator.Screen name='OrderLivraisonScreen' component={OrderLivraisonScreen} options={{title: 'Livraison de la commande'}}/>

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