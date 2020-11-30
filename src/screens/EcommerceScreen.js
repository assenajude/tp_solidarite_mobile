import React, {useEffect} from 'react';
import {View, FlatList} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector, useStore} from "react-redux";
import colors from "../utilities/colors";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";
import ListFooter from "../components/list/ListFooter";
import {getRoleAdmin} from '../store/selectors/authSelector'
import {getModalDismiss, getProvenanceSet} from '../store/slices/shoppingCartSlice'
import routes from "../navigation/routes";
import useAddToCart from "../hooks/useAddToCart";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getSelectedOptions} from "../store/slices/mainSlice";
import {getToggleFavorite} from "../store/slices/userFavoriteSlice";

function EcommerceScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const {addItemToCart} = useAddToCart()
    const selectedItem = useSelector(state => state.entities.shoppingCart.newAdded)
    const articles = useSelector(state => state.entities.article.availableArticles)
    const loading = useSelector(state => state.entities.article.loading)
    const cartLoading = useSelector(state => state.entities.shoppingCart.loading)
    const  showItemModal = useSelector(state => state.entities.shoppingCart.ecommerceModal)
    const userFavorites = useSelector(state => state.entities.userFavorite.articleFavoris)

    useEffect(() => {
    }, [])



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
            <AddToCartModal source={{uri: selectedItem.image}}
                            designation={selectedItem.libelle} itemModalVisible={showItemModal}
                            goToHomeScreen={() => {
                                dispatch(getModalDismiss())
                            }} goToShoppingCart={() => {
                                dispatch(getModalDismiss())
                                navigation.navigate(routes.CART)
            }}/>
        )
    }

    return (
        <>
            <AppActivityIndicator visible={loading || cartLoading}/>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <FlatList data={articles} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) =><AppCard image={{uri: item.imagesArticle[0]}} button2='Acheter'   addToCart={() => {
                      if(item.ProductOptions.length >= 1) {
                          dispatch(getSelectedOptions(item))
                          navigation.navigate('AccueilNavigator', {screen: routes.ARTICLE_DETAIL, params: item})
                      } else {
                      dispatch(getProvenanceSet('ecommerce'))
                      addItemToCart(item)
                      }
                  }} aideInfo={item.aide} dispo={item.qteStock} title={item.designArticle} subtitle1={item.prixPromo} subtitle2={item.prixReel}
                    onPress={() => {
                        dispatch(getSelectedOptions(item))
                        navigation.navigate('AccueilNavigator', {screen: routes.ARTICLE_DETAIL, params: item})
                    }} isFavorite={userFavorites.some(fav => fav.id === item.id)} toggleFavorite={() => dispatch(getToggleFavorite(item))}>
                      <AppButton onPress={() => {
                          dispatch(getSelectedOptions(item))
                          navigation.navigate('AccueilNavigator', {screen: routes.ARTICLE_DETAIL, params: item})
                      }} textStyle={{fontSize: 10}} title='Detail' style={{backgroundColor: colors.rougeBordeau, width: '20%', padding: 5}}/>
                  </AppCard>}/>
                 {getRoleAdmin(store.getState()) && <View style={{position: 'absolute', bottom:80, right: 20}}>
                  <ListFooter onPress={() => navigation.navigate(routes.NEW_ARTICLE)}/>
                  </View>}
        </View>
            </>
           );

}

export default EcommerceScreen;