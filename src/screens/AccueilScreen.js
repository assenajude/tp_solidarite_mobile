import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Text, FlatList} from "react-native";
import * as Updates from 'expo-updates'
import AppInfo from "../components/AppInfo";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import Color from '../utilities/colors';
import routes from '../navigation/routes';
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {loadPayements} from "../store/slices/payementSlice";
import {getTranches} from '../store/slices/trancheSlice'
import {loadCategories} from '../store/slices/categorieSlice'
import {getModalDismiss} from "../store/slices/shoppingCartSlice";
import useAddToCart from "../hooks/useAddToCart";
import {loadPlans} from "../store/slices/planSlice";
import {getItemDeleted, getRefreshing, getSelectedOptions} from "../store/slices/mainSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getAllVilles} from "../store/slices/villeSlice";
import {loadArticles} from "../store/slices/articleSlice";
import {getAllLocation} from "../store/slices/locationSlice";
import {getToggleFavorite, getUserFavoris} from "../store/slices/userFavoriteSlice";
import {loadRelais} from "../store/slices/pointRelaisSlice";
import {getAllPropositions} from "../store/slices/propositionSlice";
import {getServices} from "../store/slices/serviceSlice";
import useItemReductionPercent from "../hooks/useItemReductionPercent";
import useAuth from "../hooks/useAuth";
import {getAllEspaces} from "../store/slices/espaceSlice";

function AccueilScreen({navigation}) {
    const dispatch = useDispatch();
    const {getReductionPercent} = useItemReductionPercent()
    const {addItemToCart} = useAddToCart()
    const {initUserDatas} = useAuth()

    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.entities.main.loading)
    const error = useSelector(state => state.entities.main.error)
    const refresh =  useSelector(state => state.entities.main.refresh)
    const selectedItem = useSelector(state => state.entities.shoppingCart.newAdded)
    const mainDatas = useSelector(state => state.entities.main.searchList)
    const articleFavorites = useSelector(state => state.entities.userFavorite.articleFavoris)
    const locationFavorites = useSelector(state => state.entities.userFavorite.locationFavoris)
    const showCartModal = useSelector(state => state.entities.shoppingCart.showModal)
    const cartLoading = useSelector(state => state.entities.shoppingCart.loading)

    const getStarted = useCallback(() => {
        dispatch(getAllEspaces())
        dispatch(loadCategories())
        dispatch(loadPayements())
        dispatch(loadPlans())
        dispatch(loadArticles())
        dispatch(getAllLocation())
        dispatch(loadRelais())
        dispatch(getAllPropositions())
        dispatch(getAllVilles())
        dispatch(getTranches())
        dispatch(getServices())
        dispatch(getServices())
    }, [])


    useEffect(() => {
        if (Object.keys(user).length>0) {
            initUserDatas()
        }
        getStarted()
    }, []);


    if (error) {
        return <AppInfo buttonTitle='essayer encore..'>
            <Text>une erreur est apparue... {error}</Text>
            <AppButton title='recharger' onPress={() => Updates.reloadAsync()}/>
        </AppInfo>
    }

    if (!isLoading && !error && mainDatas.length === 0) {
        return <>
            <AppInfo>
                <Text>Aucune donnée trouvée...</Text>
                <AppButton title='recharger' onPress={() => Updates.reloadAsync()}/>
            </AppInfo>
        </>
    };

    if (showCartModal) {
        if (selectedItem && selectedItem.CartItem.itemType ==='location') {
            return (
                <AddToCartModal itemModalVisible={showCartModal} source={{uri: selectedItem.imagesLocation[0]}} designation={selectedItem.libelleLocation}
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
            <AddToCartModal itemModalVisible={showCartModal} source={{uri: selectedItem.imagesArticle[0]}} designation={selectedItem.designArticle}
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
            <AppActivityIndicator visible={isLoading || cartLoading}/>

                <FlatList onRefresh={() => dispatch(getRefreshing())} refreshing={refresh} data={mainDatas}
                keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => {
                              if(item.Categorie && item.Categorie.typeCateg == 'article') {
                                  return (
                                      <AppCard deleteItem={() => dispatch(getItemDeleted(item))} itemReductionPercent={getReductionPercent(item)}  notInStock={item.qteStock === 0} addToCart={() => {
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
                              } else if(item.Categorie && item.Categorie.typeCateg === 'location') {
                                  return (
                                      <AppCard deleteItem={() => dispatch(getItemDeleted(item))} itemReductionPercent={getReductionPercent(item)} notInStock={item.qteDispo === 0} title={item.libelleLocation} image={{uri: item.imagesLocation[0]}} button2='Louer' addToCart={() =>{
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


export default AccueilScreen;