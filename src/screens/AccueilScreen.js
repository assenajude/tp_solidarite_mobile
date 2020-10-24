import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {View, Text, FlatList, StyleSheet, Image, ActivityIndicator, StatusBar, Alert, Modal} from "react-native";

import AppInfo from "../components/AppInfo";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import Color from '../utilities/colors';
import routes from '../navigation/routes';
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {loadArticles} from '../store/slices/articleSlice'
import {loadPayements} from "../store/slices/payementSlice";
import authStorage from '../store/persistStorage'
import { getOrdersByUser} from '../store/slices/orderSlice'
import {getFactures, getFacturesByUser} from '../store/slices/factureSlice'
import {getTranches} from '../store/slices/trancheSlice'
import {autoLogin} from "../store/slices/authSlice";
import {getAllLocation} from '../store/slices/locationSlice'
import {loadCategories} from '../store/slices/categorieSlice'
import {getModalDismiss} from "../store/slices/shoppingCartSlice";
import useAddToCart from "../hooks/useAddToCart";
import {loadPlans} from "../store/slices/planSlice";
import {getAllMainData, getRefreshing} from "../store/slices/mainSlice";

function AccueilScreen({navigation, route}) {
    const store = useStore()
    const isLoading = useSelector(state => state.entities.main.loading)
    const error = useSelector(state => state.entities.main.error)
    const refresh =  useSelector(state => state.entities.main.refresh)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})
    const {addItemToCart} = useAddToCart()
    const mainDatas = useSelector(state => state.entities.main.list)


    const getAllCategories = useCallback(async () => {
                await dispatch(loadCategories());
    }, []);

    const getPayements =  useCallback(async () => {
        await dispatch(loadPayements())
    }, [])

    const getAllTranches = () => {
         dispatch(getTranches())
    }

    const restoreUser = async () => {
        const user = await authStorage.getUser();
        if (user) dispatch(autoLogin(user))
    }


    const getMainDatas = useCallback(async () => {
        await dispatch(getAllMainData())
    }, [dispatch])


    useEffect(() => {
        restoreUser()
        getMainDatas()
        getPayements();
        dispatch(getTranches())
        dispatch(getOrdersByUser())
        getAllCategories()
        dispatch(getFactures())
        dispatch(loadPlans())
    }, []);

    if (isLoading) {
        return <>
            <StatusBar barStyle='light-content'/>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size='large' color={Color.rougeBordeau}/>
            </View>
            {/*<AppActivityIndicator visible={isLoading}/>*/}
        </>

    }

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

    if (showModal) {
        if (selectedItem && selectedItem.category.typeCateg==='e-location') {
            return (
                <AddToCartModal itemModalVisible={showModal} source={{uri: selectedItem.imageLocation}} designation={selectedItem.libelleLocation}
                                goToHomeScreen={() => {
                                    dispatch(getModalDismiss())
                                    setShowModal(false)
                                }}
                                goToShoppingCart={() => {
                                    dispatch(getModalDismiss())
                                    setShowModal(false)
                                    navigation.navigate(routes.CART)
                                }
                                }/>
            )
        }
        return (
            <AddToCartModal itemModalVisible={showModal} source={{uri: selectedItem.imageArticle}} designation={selectedItem.designArticle}
                            goToHomeScreen={() => {
                                dispatch(getModalDismiss())
                                setShowModal(false)
                            }}
                            goToShoppingCart={() => {
                                dispatch(getModalDismiss())
                                setShowModal(false)
                                navigation.navigate(routes.CART)
                            }
                            }/>
        )

    }

    return (
        <>
            <View style={styles.container}>
                <FlatList onRefresh={() => dispatch(getRefreshing())} refreshing={refresh} data={mainDatas}
                keyExtractor={(item, index) => index.toString()}
                          renderItem={({item}) => {
                              if(item.category && item.category.typeCateg == 'e-commerce') {
                                  return (
                                      <AppCard  addToCart={() => {
                                          addItemToCart(item)
                                          const success = store.getState().entities.shoppingCart.addToCartSuccess
                                          if(success) {
                                              setSelectedItem(item)
                                              setShowModal(true)
                                          }
                                      }} button2='Acheter' title={item.designArticle} subtitle1={+item.prixPromo} subtitle2={item.prixReel}

                                                dispo={item.qteStock} image={{uri: item.imageArticle}}
                                                aideInfo={item.aide ?(<MaterialCommunityIcons name="help-circle-outline" size={24} color={Color.bleuFbi}/>):''}
                                                onPress={() => navigation.navigate(routes.ARTICLE_DETAIL, item)}>
                                          <AppButton onPress={() => navigation.navigate(routes.ARTICLE_DETAIL, item)} textStyle={{fontSize: 10}} title='Détails' style={{padding: 5,width: '20%', backgroundColor: Color.rougeBordeau, fontWeight: 'bold'}} />
                                      </AppCard>
                                  )
                              } else if(item.category && item.category.typeCateg === 'e-location') {
                                  return (
                                      <AppCard title={item.libelleLocation} image={{uri: item.imageLocation}} button2='Louer' addToCart={() =>{
                                          addItemToCart(item)
                                          const success = store.getState().entities.shoppingCart.addToCartSuccess
                                          if(success) {
                                              setSelectedItem(item)
                                              setShowModal(true)
                                          }
                                      }}>
                                          <AppButton textStyle={{fontSize: 10}} style={{backgroundColor: Color.rougeBordeau, padding: 5,width: '20%'}} title='Visiter'/>
                                      </AppCard>
                                  )
                              }
                          }

                          }
                />
            </View>
                </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        overflow: 'hidden'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 5,
        bottom: 5
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