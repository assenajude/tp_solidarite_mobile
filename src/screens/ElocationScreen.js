import React, {useEffect, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View,FlatList} from 'react-native'
import {getAllLocation} from "../store/slices/locationSlice";
import colors from "../utilities/colors";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ListFooter from "../components/list/ListFooter";
import {getRoleAdmin} from "../store/selectors/authSelector";
import routes from "../navigation/routes";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {getModalDismiss, getProvenanceSet} from "../store/slices/shoppingCartSlice";
import useAddToCart from "../hooks/useAddToCart";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getSelectedOptions} from "../store/slices/mainSlice";
import {getToggleFavorite} from "../store/slices/userFavoriteSlice";


function ElocationScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const {addItemToCart} = useAddToCart()
    const loading = useSelector(state => state.entities.location.loading)
    const cartLoading = useSelector(state => state.entities.shoppingCart.loading)
    const locations = useSelector(state => state.entities.location.list)
    const elocationItemModal = useSelector(state => state.entities.shoppingCart.elocationModal)
    const selectedItem = useSelector(state => state.entities.shoppingCart.newAdded)
    const userFavorites = useSelector(state => state.entities.userFavorite.locationFavoris)

    const getLocations = useCallback(async () => {
        await dispatch(getAllLocation())
    }, [])


    useEffect(() => {
        // getLocations()
    }, [])


    if (!loading && locations.length === 0) {
        return <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <AppText>Aucune donnée trouvée</AppText>
        </View>
            {getRoleAdmin(store.getState()) && <ListFooter onPress={() => navigation.navigate(routes.NEW_LOCATION)} otherStyle={{alignSelf: 'flex-end', margin: 60}}/>}
            </>
    }

    if(elocationItemModal) {
        return (
            <AddToCartModal itemModalVisible={elocationItemModal}  source={{uri: selectedItem.image}}  designation={selectedItem.libelle}
                            goToShoppingCart={() => {
                                dispatch(getModalDismiss())
                                navigation.navigate(routes.CART)
                            }}
                            goToHomeScreen={() => {
                                dispatch(getModalDismiss())
                            }}
            />
        )
    }

    return (
        <>
            <AppActivityIndicator visible={loading || cartLoading}/>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <FlatList data={locations} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) =><AppCard title={item.libelleLocation} image={{uri: item.imagesLocation[0]}} button2='Reserver'
                   addToCart={() => {
                       if(item.ProductOptions.length >= 1) {
                           dispatch(getSelectedOptions(item))
                           navigation.navigate('AccueilNavigator', {screen: routes.LOCATION_DETAIL, params: item})
                       } else {
                       dispatch(getProvenanceSet('elocation'))
                       addItemToCart(item)
                       }

                  }} aideInfo={item.aide} subtitle1={item.coutPromo} subtitle2={item.coutReel} dispo={item.qteDispo}
                  frequence={item.frequenceLocation.toLowerCase() == 'mensuelle'?' / mois':' / jour'} itemType={item.Categorie?item.Categorie.typeCateg : 'e-location'}
                  onPress={() => {
                      dispatch(getSelectedOptions(item))
                      navigation.navigate('AccueilNavigator', {screen: routes.LOCATION_DETAIL, params: item})}}
                      isFavorite={userFavorites.some(fav => fav.id === item.id)} toggleFavorite={() => dispatch(getToggleFavorite(item))}>
                      <AppButton onPress={() => {
                          dispatch(getSelectedOptions(item))
                          navigation.navigate('AccueilNavigator', {screen: routes.LOCATION_DETAIL, params: item})
                      }} textStyle={{fontSize: 10}} style={{backgroundColor: colors.rougeBordeau, width: '20%', padding: 5}} title='Visiter'/>
                  </AppCard>}/>
     {getRoleAdmin(store.getState()) &&  <View style={{
                position: 'absolute',
                right: 20,
                bottom: 80
            }} >

                <ListFooter onPress={() => navigation.navigate(routes.NEW_LOCATION)}/>
            </View>}
        </View>
            </>
    );
}

export default ElocationScreen;