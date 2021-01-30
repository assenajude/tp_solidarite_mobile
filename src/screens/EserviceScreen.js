import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import AppCard from "../components/AppCard";
import {getServiceRefreshed} from '../store/slices/serviceSlice'
import ListFooter from "../components/list/ListFooter";
import routes from "../navigation/routes";
import AppButton from "../components/AppButton";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {getModalDismiss, getProvenanceSet} from "../store/slices/shoppingCartSlice";
import useAddToCart from "../hooks/useAddToCart";
import AppActivityIndicator from "../components/AppActivityIndicator";
import useAuth from "../hooks/useAuth";

function EserviceScreen({navigation}) {
    const dispatch = useDispatch()
    const {userRoleAdmin} = useAuth()
    const {addItemToCart} = useAddToCart()
    const loading = useSelector(state =>state.entities.service.loading)
    const refreshLoading = useSelector(state => state.entities.service.refreshLoading)
    const addToCartLoading = useSelector(state => state.entities.shoppingCart.loading)
    const serviceData = useSelector(state => state.entities.service.searchList)
    const serviceError = useSelector(state => state.entities.service.error)
    const showItemModal = useSelector(state => state.entities.shoppingCart.eserviceModal)
    const selectedItem = useSelector(state => state.entities.shoppingCart.newAdded)


    if (!loading && serviceError !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Une erreur est apparue...Veuillez recharger la page</AppText>
            <AppButton title='Recharger' onPress={getServiceData}/>
        </View>
    }

    if (showItemModal) {
        return (
            <AddToCartModal source={{uri: selectedItem.imagesService[0]}} designation={selectedItem.libelle}
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

        {!loading && serviceData.length> 0 && serviceError === null && <FlatList refreshing={refreshLoading} onRefresh={() => dispatch(getServiceRefreshed())}  data={serviceData} keyExtractor={item =>item.id.toString()}
                  renderItem={({item})=><AppCard notInStock={!item.isDispo} itemType={item.Categorie.typeCateg || 'e-service'} image={{uri: item.imagesService[0]}} button2='Utiliser' title={item.libelle}
                    addToCart={() => {
                        dispatch(getProvenanceSet('eservice'))
                        addItemToCart(item)
                    }} dispo={item.isDispo?'oui':'non'} serviceMin={item.montantMin} serviceMax={item.montantMax} otherImgaeStyle={{height: 190}}
                  onPress={() => navigation.navigate(routes.SERVICE_DETAIL, item)}>
                      <AppButton textStyle={{fontSize: 10}} title='+ Infos' style={{backgroundColor: colors.rougeBordeau, padding: 5, width: '20%'}}
                                 onPress={() =>navigation.navigate(routes.SERVICE_DETAIL, item)}/>
                  </AppCard>}/>}
            {!loading && serviceData.length === 0 && serviceError === null && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Aucune donnée trouvée..</AppText>
            </View>}
                 {userRoleAdmin() && <View style={{position: 'absolute', bottom: 80, right: 20}}>
                      <ListFooter onPress={() => navigation.navigate(routes.NEW_SERVICE)}/>
                  </View>}

            </>
    );
}

export default EserviceScreen;