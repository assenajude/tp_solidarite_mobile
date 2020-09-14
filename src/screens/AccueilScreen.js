import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector, store} from "react-redux";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {View, Text, FlatList, StyleSheet, Image, ActivityIndicator, StatusBar, Alert, Modal} from "react-native";

import AppInfo from "../components/AppInfo";
import AppButton from "../components/AppButton";
import AppCard from "../components/AppCard";
import Color from '../utilities/colors';
import routes from '../navigation/routes';
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {loadArticles} from '../store/slices/articleSlice'
import {addToCart} from '../store/actionsCreators/shoppingCartActionCreator'
import {loadPayements} from "../store/slices/payementSlice";
import authStorage from '../store/persistStorage'
import {getAllOrders} from '../store/slices/orderSlice'

function AccueilScreen({navigation, route}) {
    const isLoading = useSelector(state => state.entities.article.loading)
    const authToken = useSelector(state => state.auth.token)
    const articles = useSelector(state => state.entities.article.availableArticles)
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const [itemCartModal, setItemCartModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})

    const getAllArticles = useCallback(async () => {
                await dispatch(loadArticles());
    }, [dispatch]);

    const getPayements =  useCallback(async () => {
        await dispatch(loadPayements())
    }, [dispatch])

    const getUser = async () => {
        const user = await authStorage.getUser();
    }

    const getOrders = async () => {
        await dispatch(getAllOrders())
    }

    useEffect(() => {
        getAllArticles()
        getPayements();
        getOrders()
        getUser()
    }, [getAllArticles, getPayements]);


    /*
        useEffect(() => {
            const refreshPage = props.navigation.addListener('willFocus', getAllArticles);
            return () => {
                refreshPage.remove();
            }
        }, [getAllArticles])
    */
    if (isLoading) {
        return <>
            <StatusBar barStyle='light-content'/>
            <AppInfo>
                <ActivityIndicator size='large' color={Color.rougeBordeau}/>
            </AppInfo>
        </>

    }

    if (error) {
        return <AppInfo buttonTitle='essayer encore..'>
            <Text>une erreur est apparue... {error.message}</Text>
            <AppButton title='recharger'/>
        </AppInfo>
    }

    if (!isLoading && articles.length === 0) {
        return <>
            <StatusBar barStyle='light-content'/>
            <AppInfo>
                <Text>Aucune donnée trouvée...</Text>
                <AppButton title='Ajouter'/>
            </AppInfo>
        </>
    };

    if (itemCartModal) {
        return <AddToCartModal itemModalVisible={itemCartModal} source={{uri: selectedItem.imageArticle}} designation={selectedItem.designArticle}
                               goToHomeScreen={() => setItemCartModal(false)}
                               goToShoppingCart={() => {
                                   setItemCartModal(false)
                                   navigation.navigate(routes.CART)
                               }
                               }/>
    }

    return (
        <>
            <StatusBar barStyle='light-content'/>
            <View style={styles.container}>

                <FlatList data={articles}
                          onRefresh={getAllArticles}
                          refreshing={refresh}
                keyExtractor={item => item.id.toString()}
                          renderItem={({item}) =>
                          <AppCard  addToCart={() => {
                              {dispatch(addToCart(item))};
                              setSelectedItem(item);
                              setItemCartModal(true)
                          }
                          } button2='Acheter' title={item.designArticle} subtitle1={+item.prixPromo} subtitle2={item.prixReel}
                          dispo={item.qteStock} image={{uri: item.imageArticle}}
                          aideInfo={item.aide ?(<MaterialCommunityIcons name="help-circle-outline" size={24} color={Color.bleuFbi}/>):''}
                                                           onPress={() => navigation.navigate(routes.ARTICLE_DETAIL, item)}>
                              <AppButton onPress={() => navigation.navigate(routes.ARTICLE_DETAIL, item)} title='Détails' style={{padding: 10, backgroundColor: Color.rougeBordeau, fontWeight: 'bold'}} />
                          </AppCard>
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
        paddingBottom: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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