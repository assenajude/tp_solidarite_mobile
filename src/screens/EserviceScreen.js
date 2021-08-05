import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";

import AppText from "../components/AppText";
import {getServiceRefreshed} from '../store/slices/serviceSlice'
import ListFooter from "../components/list/ListFooter";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import useAddToCart from "../hooks/useAddToCart";
import AppActivityIndicator from "../components/AppActivityIndicator";
import useAuth from "../hooks/useAuth";
import AppCardNew from "../components/AppCardNew";

function EserviceScreen({navigation}) {
    const dispatch = useDispatch()
    const {userRoleAdmin} = useAuth()
    const {addItemToCart} = useAddToCart()
    const loading = useSelector(state =>state.entities.service.loading)
    const refreshLoading = useSelector(state => state.entities.service.refreshLoading)
    const addToCartLoading = useSelector(state => state.entities.shoppingCart.loading)
    const serviceData = useSelector(state => state.entities.service.searchList)
    const serviceError = useSelector(state => state.entities.service.error)
    const [showItemModal, setShowItemModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    const handleAddToCart = async (item) => {
        const result = await addItemToCart(item)
        if(!result) return;
        setSelectedItem(item)
        setShowItemModal(true)
    }

    if (!loading && serviceError !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Une erreur est apparue...Veuillez recharger la page</AppText>
            <AppButton title='Recharger' onPress={() => dispatch(getServiceRefreshed())}/>
        </View>
    }

    if (showItemModal) {
        return (
            <AddToCartModal
                source={{uri: selectedItem.imagesService[0]}}
                designation={selectedItem.libelle}
            goToHomeScreen={() => setShowItemModal(false)}
            itemModalVisible={showItemModal}
            goToShoppingCart={() => {
                setShowItemModal(false)
                navigation.navigate(routes.CART)
            }}/>
        )
    }

    return (
        <>
            <AppActivityIndicator visible={loading || addToCartLoading}/>

        {!loading && serviceData.length> 0 && serviceError === null &&
        <FlatList
            refreshing={refreshLoading}
            onRefresh={() => dispatch(getServiceRefreshed())}
            data={serviceData} keyExtractor={item =>item.id.toString()}
                  renderItem={({item})=>
                      <AppCardNew
                          minAmount={item.montantMin}
                          maxAmount={item.montantMax}
                          viewDetails={() =>navigation.navigate(routes.SERVICE_DETAIL, item)}
                          addToCart={() => handleAddToCart(item)}
                          description={item.libelle}
                          source={{uri: item.imagesService[0]}}
                          itemType={item.Categorie.typeCateg || 'e-service'}
                          notInStock={!item.isDispo}/>
                  }/>}
            {!loading && serviceData.length === 0 && serviceError === null && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Aucune donnée trouvée..</AppText>
            </View>}
                 {userRoleAdmin() && <View style={{position: 'absolute', bottom: 10, right: 10}}>
                      <ListFooter onPress={() => navigation.navigate(routes.NEW_SERVICE)}/>
                  </View>}

            </>
    );
}

export default EserviceScreen;