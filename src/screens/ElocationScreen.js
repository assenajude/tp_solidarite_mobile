import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, Text,FlatList, ActivityIndicator} from 'react-native'
import {getAllLocation} from "../store/slices/locationSlice";
import colors from "../utilities/colors";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ListFooter from "../components/list/ListFooter";
import {getRoleAdmin} from "../store/selectors/authSelector";
import routes from "../navigation/routes";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {getModalDismiss} from "../store/slices/shoppingCartSlice";
import useAddToCart from "../hooks/useAddToCart";


function ElocationScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const {addItemToCart} = useAddToCart()
    const loading = useSelector(state => state.entities.location.loading)
    const locations = useSelector(state => state.entities.location.list)
    const [showItemModal, setShowItemModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState()

    const getLocations = useCallback(async () => {
        await dispatch(getAllLocation())
    }, [])


    useEffect(() => {
        getLocations()
    }, [])

        if (loading) {
        return <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color={colors.rougeBordeau}/>
        </View>
    }
    if (!loading && locations.length === 0) {
        return <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <AppText>Aucune donnée trouvée</AppText>
        </View>
            {getRoleAdmin(store.getState()) && <ListFooter onPress={() => navigation.navigate(routes.NEW_LOCATION)} otherStyle={{alignSelf: 'flex-end', margin: 60}}/>}
            </>
    }

    if(showItemModal) {
        return (
            <AddToCartModal itemModalVisible={showItemModal} designation={selectedItem.libelleLocation}
                            goToShoppingCart={() => {
                                dispatch(getModalDismiss())
                                setShowItemModal(false)
                                navigation.navigate(routes.CART)
                            }}
                            goToHomeScreen={() => {
                                dispatch(getModalDismiss())
                                setShowItemModal(false)
                            }} source={{uri: selectedItem.imageLocation}}
            />
        )
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <FlatList data={locations} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) =><AppCard title={item.libelleLocation} image={{uri: item.imageLocation}} button2='Reserver'
                   addToCart={() => {
                       addItemToCart(item)
                       const success = store.getState().entities.shoppingCart.addToCartSuccess
                       if(success) {
                           setShowItemModal(true)
                           setSelectedItem(item)
                       }
                  }} aideInfo={item.aide} subtitle1={item.coutPromo} subtitle2={item.coutReel} dispo={item.qteDispo}
                  frequence={item.frequenceLocation.toLowerCase() == 'mensuelle'?' / mois':' / jour'} itemType={item.category.typeCateg}>
                      <AppButton textStyle={{fontSize: 10}} style={{backgroundColor: colors.rougeBordeau, width: '20%', padding: 5}} title='Visiter'/>
                  </AppCard>}/>
     {getRoleAdmin(store.getState()) &&  <View style={{
                position: 'absolute',
                right: 20,
                bottom: 80
            }}>

                <ListFooter onPress={() => navigation.navigate(routes.NEW_LOCATION)}/>
            </View>}
        </View>
    );
}

export default ElocationScreen;