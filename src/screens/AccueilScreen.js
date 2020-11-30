import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {Text, FlatList, StyleSheet, StatusBar, View} from "react-native";
import Constants from 'expo-constants'

import AppInfo from "../components/AppInfo";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import Color from '../utilities/colors';
import routes from '../navigation/routes';
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {loadPayements} from "../store/slices/payementSlice";
import authStorage from '../store/persistStorage'
import { getOrdersByUser} from '../store/slices/orderSlice'
import {getFacturesByUser} from '../store/slices/factureSlice'
import {getTranches} from '../store/slices/trancheSlice'
import {getAutoLogin} from "../store/slices/authSlice";
import {loadCategories} from '../store/slices/categorieSlice'
import {getCartItems, getModalDismiss} from "../store/slices/shoppingCartSlice";
import useAddToCart from "../hooks/useAddToCart";
import {loadPlans} from "../store/slices/planSlice";
import {getAllMainData, getRefreshing, getSelectedOptions} from "../store/slices/mainSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getAdresse} from "../store/slices/userAdresseSlice";
import {getAllVilles} from "../store/slices/villeSlice";
import {getConnectedUserData, getUserProfileAvatar} from "../store/slices/userProfileSlice";
import {loadArticles} from "../store/slices/articleSlice";
import {getAllLocation} from "../store/slices/locationSlice";
import {getToggleFavorite, getUserFavoris} from "../store/slices/userFavoriteSlice";
import {loadRelais} from "../store/slices/pointRelaisSlice";

function AccueilScreen({navigation, route}) {
    const store = useStore()
    const isLoading = useSelector(state => state.entities.main.loading)
    const error = useSelector(state => state.entities.main.error)
    const refresh =  useSelector(state => state.entities.main.refresh)
    const dispatch = useDispatch();
    const selectedItem = useSelector(state => state.entities.shoppingCart.newAdded)
    const {addItemToCart} = useAddToCart()
    const mainDatas = useSelector(state => state.entities.main.list)
    const articleFavorites = useSelector(state => state.entities.userFavorite.articleFavoris)
    const locationFavorites = useSelector(state => state.entities.userFavorite.locationFavoris)
    const showCartModal = useSelector(state => state.entities.shoppingCart.showModal)
    const cartLoading = useSelector(state => state.entities.shoppingCart.loading)


    const getAllCategories = useCallback(async () => {
                await dispatch(loadCategories());
    }, []);

    const getUserAdresses = useCallback(async () => {
        dispatch(getAdresse())
        dispatch(getAllVilles())
    }, [])


    const restoreUser = async () => {
        const user = await authStorage.getUser();
        if (user) {
            await dispatch(getAutoLogin(user))
            dispatch(getOrdersByUser())
            dispatch(getFacturesByUser())
            dispatch(getTranches())
            dispatch(getConnectedUserData())
            dispatch(getUserFavoris())
            getUserAdresses()
        }
    }


    const getMainDatas = useCallback(async () => {
        await dispatch(getAllMainData())
    }, [dispatch])


    const getPayements = useCallback(async () => {
        dispatch(loadPayements())
    }, [])



    useEffect(() => {
        restoreUser()
        getMainDatas()
        getPayements();
        getAllCategories()
        dispatch(loadPlans())
        dispatch(loadArticles())
        dispatch(getAllLocation())
        dispatch(loadRelais())
        dispatch(getCartItems())
    }, []);


    if (error) {
        return <AppInfo buttonTitle='essayer encore..'>
            <Text>une erreur est apparue... {error}</Text>
            <AppButton title='recharger'/>
        </AppInfo>
    }

    if (!isLoading && !error && mainDatas.length === 0) {
        return <>
            <AppInfo>
                <Text>Aucune donnée trouvée...</Text>
            </AppInfo>
        </>
    };

    if (showCartModal) {
        if (selectedItem && selectedItem.type==='e-location') {
            return (
                <AddToCartModal itemModalVisible={showCartModal} source={{uri: selectedItem.image}} designation={selectedItem.libelle}
                                goToHomeScreen={() => {
                                    dispatch(getModalDismiss())
                                }}
                                goToShoppingCart={() => {
                                    dispatch(getModalDismiss())
                                    navigation.navigate(routes.CART)
                                }
                                }/>
            )
        }
        return (
            <AddToCartModal itemModalVisible={showCartModal} source={{uri: selectedItem.image}} designation={selectedItem.libelle}
                            goToHomeScreen={() => {
                                dispatch(getModalDismiss())
                            }}
                            goToShoppingCart={() => {
                                dispatch(getModalDismiss())
                                navigation.navigate(routes.CART)
                            }
                            }/>
        )

    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={Color.rougeBordeau}/>
            <AppActivityIndicator visible={isLoading || cartLoading}/>
                <FlatList onRefresh={() => dispatch(getRefreshing())} refreshing={refresh} data={mainDatas}
                keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => {
                              if(item.Categorie && item.Categorie.typeCateg == 'e-commerce') {
                                  return (
                                      <AppCard  addToCart={() => {
                                          if(item.ProductOptions.length > 1) {
                                              dispatch(getSelectedOptions(item))
                                              navigation.navigate('AccueilNavigator',{screen: routes.ARTICLE_DETAIL, params: item})
                                          }else {
                                          addItemToCart(item)
                                          }
                                      }} button2='Acheter'  title={item.designArticle} subtitle1={+item.prixPromo} subtitle2={item.prixReel}

                                                dispo={item.qteStock} image={{uri: item.imagesArticle[0]}}
                                                aideInfo={item.aide}
                                                onPress={() => {
                                                    dispatch(getSelectedOptions(item))
                                                    navigation.navigate('AccueilNavigator',{screen: routes.ARTICLE_DETAIL, params: item})
                                                }}
                                                isFavorite={articleFavorites.some(fav => fav.id === item.id)}
                                                toggleFavorite={() => dispatch(getToggleFavorite(item))}>
                                          <AppButton onPress={() => {
                                              dispatch(getSelectedOptions(item))
                                              navigation.navigate('AccueilNavigator', {screen: routes.ARTICLE_DETAIL, params: item})
                                          }} textStyle={{fontSize: 10}} title='Détails' style={{padding: 5,width: '20%', backgroundColor: Color.rougeBordeau, fontWeight: 'bold'}} />
                                      </AppCard>
                                  )
                              } else if(item.Categorie && item.Categorie.typeCateg === 'e-location') {
                                  return (
                                      <AppCard title={item.libelleLocation} image={{uri: item.imagesLocation[0]}} button2='Louer' addToCart={() =>{
                                          if(item.ProductOptions.length > 1) {
                                              dispatch(getSelectedOptions(item))
                                              navigation.navigate(routes.LOCATION_DETAIL, item)
                                          }else {
                                              addItemToCart(item)
                                          }
                                      }} itemType={item.Categorie.typeCateg} frequence={item.frequenceLocation.toLowerCase() == 'mensuelle'?' / mois':' / jour'}
                                      dispo={item.qteDispo} aideInfo={item.aide} subtitle1={item.coutPromo} subtitle2={item.coutReel}
                                      onPress={() => {
                                          dispatch(getSelectedOptions(item))
                                          navigation.navigate('AccueilNavigator', {screen: routes.LOCATION_DETAIL, params: item})
                                      }} isFavorite={locationFavorites.some(fav => fav.id === item.id)}
                                        toggleFavorite={() => dispatch(getToggleFavorite(item))}>
                                          <AppButton textStyle={{fontSize: 10}} style={{backgroundColor: Color.rougeBordeau, padding: 5,width: '20%'}} title='Visiter'
                                                     onPress={() => {
                                                         dispatch(getSelectedOptions(item))
                                                         navigation.navigate('AccueilNavigator', {screen: routes.LOCATION_DETAIL, params: item})}} />
                                      </AppCard>
                                  )
                              }
                          }

                          }
                />
                </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        overflow: 'hidden'
    },
    container: {
        justifyContent: 'center',
       paddingTop: Constants.statusBarHeight
    },
    isLoadingStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    aide: {
        height: 10,
        width: 10

    }
})

export default AccueilScreen;