import React, {useCallback, useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector, useStore} from "react-redux";
import {loadArticles} from "../store/slices/articleSlice";
import colors from "../utilities/colors";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";
import ListFooter from "../components/list/ListFooter";
import {getRoleAdmin} from '../store/selectors/authSelector'
import {getModalDismiss} from '../store/slices/shoppingCartSlice'
import routes from "../navigation/routes";
import useAddToCart from "../hooks/useAddToCart";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";

function EcommerceScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const {addItemToCart} = useAddToCart()
    const [selectedItem, setSelectedItem] = useState()
    const articles = useSelector(state => state.entities.article.availableArticles)
    const loading = useSelector(state => state.entities.article.loading)
    const  [showItemModal, setShowItemModal] = useState(false)
    const user = useSelector(state => state.auth.user)

    const getArticles = useCallback(async () => {
        await dispatch(loadArticles())
    }, [dispatch])

    useEffect(() => {
        getArticles()
    }, [])

    if (loading) {
        return <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color={colors.rougeBordeau}/>
        </View>
    }

    if (!loading && articles.length === 0) {
        return(
            <>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <AppText>Aucune donnée trouvée</AppText>
                </View>
                {getRoleAdmin(store.getState()) && <ListFooter onPress={() => navigation.navigate(routes.NEW_ARTICLE)} otherStyle={{alignSelf: 'flex-end', margin: 60}}/>}
            </>
            )

    }

    if (showItemModal) {
        return (
            <AddToCartModal source={{uri: selectedItem.imageArticle}}
                            designation={selectedItem.designArticle} itemModalVisible={showItemModal}
                            goToHomeScreen={() => {
                                dispatch(getModalDismiss())
                                setShowItemModal(false)
                            }} goToShoppingCart={() => {
                                dispatch(getModalDismiss())
                                setShowItemModal(false)
                                navigation.navigate(routes.CART)
            }}/>
        )
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <FlatList data={articles} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) =><AppCard image={{uri: item.imageArticle}} button2='Acheter'   addToCart={() => {
                      addItemToCart(item)
                      const success = store.getState().entities.shoppingCart.addToCartSuccess
                      if(success) {
                          setSelectedItem(item)
                          setShowItemModal(true)
                      }
                  }} aideInfo={item.aide} dispo={item.qteStock} title={item.designArticle} subtitle1={item.prixPromo} subtitle2={item.prixReel}>
                      <AppButton textStyle={{fontSize: 10}} title='Detail' style={{backgroundColor: colors.rougeBordeau, width: '20%', padding: 5}}/>
                  </AppCard>}/>
                 {getRoleAdmin(store.getState()) && <View style={{position: 'absolute', bottom:80, right: 20}}>
                  <ListFooter onPress={() => navigation.navigate(routes.NEW_ARTICLE)}/>
                  </View>}
        </View>
           );

}

export default EcommerceScreen;