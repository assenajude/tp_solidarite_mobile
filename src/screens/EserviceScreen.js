import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {View, FlatList, StyleSheet, ActivityIndicator} from "react-native";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import AppCard from "../components/AppCard";
import {getServices, addService} from '../store/slices/serviceSlice'
import ListFooter from "../components/list/ListFooter";
import {getRoleAdmin} from "../store/selectors/authSelector";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {getModalDismiss, getProvenanceSet} from "../store/slices/shoppingCartSlice";
import useAddToCart from "../hooks/useAddToCart";
import AppActivityIndicator from "../components/AppActivityIndicator";

function EserviceScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const {addItemToCart} = useAddToCart()
    const loading = useSelector(state =>state.entities.service.loading)
    const addToCartLoading = useSelector(state => state.entities.shoppingCart.loading)
    const serviceData = useSelector(state => state.entities.service.list)
    const showItemModal = useSelector(state => state.entities.shoppingCart.eserviceModal)
    const selectedItem = useSelector(state => state.entities.shoppingCart.newAdded)

    const getServiceData = useCallback(() => {
        dispatch(getServices())
    }, [])

    useEffect(() => {
        getServiceData()
    }, [])



    if(!loading && serviceData.length === 0) {
        return <>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Aucune donnée trouvée..</AppText>
        </View>
            {getRoleAdmin(store.getState()) && <ListFooter onPress={() => navigation.navigate(routes.NEW_SERVICE)} otherStyle={{alignSelf: 'flex-end', margin: 60}}/>}
            </>
    }
    if (showItemModal) {
        return (
            <AddToCartModal source={{uri: selectedItem.image}} designation={selectedItem.libelle}
            goToHomeScreen={() => {
                dispatch(getModalDismiss())
            }}
            itemModalVisible={showItemModal}
            goToShoppingCart={() => {
                dispatch(getModalDismiss())
                navigation.navigate(routes.CART)
            }}/>
        )
    }
    return (
        <>
            <AppActivityIndicator visible={loading || addToCartLoading}/>
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <FlatList data={serviceData} keyExtractor={item =>item.id.toString()}
                  renderItem={({item})=><AppCard itemType={item.Categorie.typeCateg || 'e-service'} image={{uri: item.imagesService[0]}} button2='Utiliser' title={item.libelle}
                    addToCart={() => {
                        dispatch(getProvenanceSet('eservice'))
                        addItemToCart(item)
                    }} dispo={item.isDispo?'oui':'non'} serviceMin={item.montantMin} serviceMax={item.montantMax} otherImgaeStyle={{height: 190}}
                  onPress={() => navigation.navigate(routes.SERVICE_DETAIL, item)}>
                      <AppButton textStyle={{fontSize: 10}} title='+ Infos' style={{backgroundColor: colors.rougeBordeau, padding: 5, width: '20%'}}/>
                  </AppCard>}/>
                 {getRoleAdmin(store.getState()) && <View style={{position: 'absolute', bottom: 80, right: 20}}>
                      <ListFooter onPress={() => navigation.navigate(routes.NEW_SERVICE)}/>
                  </View>}
        </View>
            </>
    );
}

export default EserviceScreen;