import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {View, ActivityIndicator, FlatList, ScrollView} from "react-native";
import dayjs from "dayjs";


import {
    getCurrentOrders,
    getItemDetail, getOrdersByUser,
    updateHistory
} from "../store/slices/orderSlice";
import colors from "../utilities/colors";
import UserServiceItem from "../components/order/UserServiceItem";
import AppText from "../components/AppText";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getUserServices} from "../store/slices/userServiceSlice";
import useManageUserOrder from "../hooks/useManageUserOrder";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import GetLogin from "../components/user/GetLogin";

function UserServiceContratScreen(props) {
    const store = useStore()
    const dispatch = useDispatch()
    const {saveLivraisonEdit, startEditingLivraison, moveOrderToHistory, deleteOrder} = useManageUserOrder()

    const isLoading = useSelector(state => state.entities.order.loading)
    const error = useSelector(state => state.entities.order.error)
    const user  = useSelector(state => state.auth.user)
    const userServicesData = useSelector(state => state.entities.order.currentUserOrders)
    const [editLivraisonValue, setEditLivraisonValue] = useState('editer...')

    const getStarted = useCallback(async () => {
        if(user) {
        await dispatch(getOrdersByUser())
        dispatch(getCurrentOrders('e-service'))
        }
        return;
    }, [dispatch])


    useEffect(() => {
        getStarted()
    }, [])

    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour consulter vos services..'/>
    }

    if(error === null && userServicesData.length === 0) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Vous n'avez aucun contrat de service en cours...</AppText>
            </View>
        )
    }

    if(error !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Impossible de consulter vos services.Une erreur est apparue...</AppText>
        </View>
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <FlatList data={userServicesData} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => {
                          if (item.contrats && item.contrats.length>= 1 && !item.historique) {
                              return (
                                  <UserServiceItem isHistorique={false} header='S' headerValue={item.numero}
                                                   moveItemToHistorique={() => moveOrderToHistory(item.id)} contrats={item.contrats} itemMontant={item.montant} itemImage={item.cartItems[0].image}
                                                   showOrderDetail={() => dispatch(getItemDetail(item.id))} showDetail={item.showDetails}
                                                   statusContratValue={item.contrats[0].montant > item.facture.solde?'En cours':'Terminé'}
                                                   dateDemande={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}
                                                   dateFourniture={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')} playItemWatch={item.contrats[0].status.toLowerCase() === 'en cours'}
                                                   loopItemWatch={item.contrats[0].status.toLowerCase() === 'en cours'} isContrat={true}
                                                  payement={getOrderPayementMode(store.getState())[item.id].payementMode}
                                                contratValueStyle={{color:item.contrats[0].montant === item.facture.solde?colors.vert:'grey', fontWeight: 'bold'}}
                                               statusLivraisonLabel='Status livraison' statusLivraisonValue={item.statusLivraison}
                                                editLivraison={item.editLivraison} getLivraisonEdit={() => startEditingLivraison(item.id)}
                                               undoLivraisonEdit={() => startEditingLivraison(item.id)} editingLivraisonValue={editLivraisonValue}
                                               changeLivraisonEditValue={(value) => setEditLivraisonValue(value)} saveLivraisonEdit={() => saveLivraisonEdit({orderId: item.id, statusLivraison: editLivraisonValue})}
                                               statusLivraisonStyle={{color:item.statusLivraison.toLowerCase() === 'livré'?colors.vert:'grey', fontWeight: 'bold'}}
                                               deleteItem={() => deleteOrder(item)}/>
                              )
                          }
                      }}/>
        </>
    );
}

export default UserServiceContratScreen;