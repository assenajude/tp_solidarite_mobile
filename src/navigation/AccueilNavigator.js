import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {createStackNavigator, HeaderBackButton} from "@react-navigation/stack";


import AccueilScreen from "../screens/AccueilScreen";
import Color from "../utilities/colors";
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import ShoppingCartScreen from "../screens/ShoppingCartScreen";
import OrderScreen from "../screens/OrderScreen";
import PlanScreen from "../screens/PlanScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import OrderPayementScreen from "../screens/OrderPayementScreen";
import OrderLivraisonScreen from "../screens/OrderLivraisonScreen";
import UserFavorisScreen from "../screens/UserFavorisScreen";
import CompteScreen from "../screens/CompteScreen";
import UserMessageScreen from "../screens/UserMessageScreen";
import ElocationScreen from "../screens/ElocationScreen";
import UserAdresseScreen from "../screens/UserAdresseScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import FactureDetailsScreen from "../screens/FactureDetailsScreen";
import NewUserAdresseScreen from "../screens/NewUserAdresseScreen";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import UserLocationNavigator from "./UserLocationNavigator";
import UserServiceNavigator from "./UserServiceNavigator";
import UserOrderNavigator from "./UserOrderNavigator";
import UserFactureNavigator from "./UserFactureNavigator";
import routes from "./routes";
import AppSearchBar from "../components/AppSearchBar";
import EditUserInfoScreen from "../screens/EditUserInfoScreen";
import LocationDetailScreen from "../screens/LocationDetailScreen";
import NewOptionScreen from "../screens/NewOptionScreen";
import PlanDetailScreen from "../screens/PlanDetailScreen";
import PropositionScreen from "../screens/PropositionScreen";
import PlanPropositionScreen from "../screens/PlanPropositionScreen";
import NewPropositionScreen from "../screens/NewPropositionScreen";
import NewPlanScreen from "../screens/NewPlanScreen";
import Avatar from "../components/user/Avatar";
import {getSearchProduct} from "../store/slices/mainSlice";
import HelpScreen from "../screens/HelpScreen";
import FaqScreen from "../screens/FaqScreen";
import QuestionScreen from "../screens/QuestionScreen";
import ResponseScreen from "../screens/ResponseScreen";



const ArticleStackNavigator = createStackNavigator();

const AccueilNavigator = () => {
const navigation = useNavigation()
    const dispatch = useDispatch()
    const cartItemLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)

    const [seachValue, setSearchValue] = useState('')

    const handleSearch = () => {
        dispatch(getSearchProduct(seachValue))
    }

    return (
        <ArticleStackNavigator.Navigator screenOptions={({navigation}) => ({
            headerStyle: {backgroundColor: Color.rougeBordeau},
            headerTintColor: Color.blanc,
            headerRight: ({size, color}) => (
                <CartIconRight cartLenght={cartItemLenght} getToCartScreen={() => navigation.navigate('AccueilNavigator', {screen: 'ShoppingCartScreen'})}/>
            )
        })}>
            <ArticleStackNavigator.Screen name='AccueilScreen' component={AccueilScreen}
               options={({navigation}) => ({
                   headerTitleAlign: 'center',
                   headerLeft: () =>
                       <Avatar otherImageStyle={{width:40,height:40}} otherImageContainerStyle={{width:40,height:40}}
                               onPress={() =>navigation.openDrawer()}/>,
                   headerTitle: () => <AppSearchBar searchValue={seachValue} changeSearchValue={(val) => setSearchValue(val)}
                                                    handleSearch={handleSearch}/>,
               })}/>

              <ArticleStackNavigator.Screen name='ShoppingCartScreen' component={ShoppingCartScreen}
              options={{title: 'Panier' }}/>
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
            <ArticleStackNavigator.Screen name='HelpScreen' component={HelpScreen} options={{title: "Besoin d'aide?"}}/>
            <ArticleStackNavigator.Screen name='OrderScreen' component={OrderScreen} options={{title: 'Resumé de votre commande'}}/>
            <ArticleStackNavigator.Screen name='OrderDetailsScreen' component={OrderDetailsScreen} options={({route}) =>
                ({title: 'Detail Commande'+' '+ route.params.numero })
            }/>
            <ArticleStackNavigator.Screen name='FactureDetailsScreen' component={FactureDetailsScreen} options={({route}) =>
                ({title: 'Detail Facture'+' '+ route.params.numero })
            }/>
            <ArticleStackNavigator.Screen name='UserAdresseScreen' component={UserAdresseScreen} options={{
                title: 'Vos adresses'
            }}/>
            <ArticleStackNavigator.Screen name='PropositionScreen' component={PropositionScreen} options={{
                title: 'Liste des propositions'
            }}/>
            <ArticleStackNavigator.Screen name='NewUserAdresseScreen' component={NewUserAdresseScreen} options={{
                title: 'Ajout nouvelle adresse'
            }}/>
            <ArticleStackNavigator.Screen name='EditUserInfoScreen' component={EditUserInfoScreen} options={{
                title: 'Editez votre profile'
            }}/>
            <ArticleStackNavigator.Screen name='PlanPropositionScreen' component={PlanPropositionScreen} options={{
                title: 'Plans & Propositions'
            }}/>
            <ArticleStackNavigator.Screen name='NewPropositionScreen' component={NewPropositionScreen} options={{
                title: 'Nouvelle proposition'
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
            <ArticleStackNavigator.Screen name='ArticleDetailScreen' component={ArticleDetailScreen}
                  options={({route}) =>
                  ({title: 'Detail '+route.params.designArticle })}/>

            <ArticleStackNavigator.Screen name='LocationDetailScreen' component={LocationDetailScreen} options={({route}) => ({
                title: 'Detail '+route.params.libelleLocation
            })}/>
            <ArticleStackNavigator.Screen name='PlanScreen' component={PlanScreen} options={{
                title: 'Liste des plans'
            }}/>
            <ArticleStackNavigator.Screen name='NewPlanScreen' component={NewPlanScreen} options={{
                title: 'Nouveau plan'
            }}/>

            <ArticleStackNavigator.Screen name='PlanDetailScreen' component={PlanDetailScreen} options={({route}) => ({
                title: 'Detail '+route.params.libelle
            })}/>

            <ArticleStackNavigator.Screen name='NewOptionScreen' component={NewOptionScreen} options={{
                title: 'Ajouter un detail'
            }}/>
            <ArticleStackNavigator.Screen name='FaqScreen' component={FaqScreen} options={{
                title: 'FAQ'
            }}/>
            <ArticleStackNavigator.Screen name='QuestionScreen' component={QuestionScreen} options={{
                title: 'Posez votre question'
            }}/>
            <ArticleStackNavigator.Screen name='ResponseScreen' component={ResponseScreen} options={{
                title: 'Ajouter une reponse'
            }}/>


        </ArticleStackNavigator.Navigator>
)};

export default AccueilNavigator;