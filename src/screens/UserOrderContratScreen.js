import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useStore, useSelector} from "react-redux";
import {View, ScrollView, Alert, FlatList} from "react-native";
import dayjs from "dayjs";

import {
    decrementOrderCompter,
    getCurrentOrders, getDeleteUpdate,
    getItemDetail, getOrderDeleted, getOrdersByUser, getStatusEditing, incrementOrderCompter, saveStatusEditing
} from "../store/slices/orderSlice";
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";


function UserOrderContratScreen({navigattion}) {
    const dispatch = useDispatch()
    const store = useStore()
    const {startEditingLivraison, saveLivraisonEdit, moveOrderToHistory, deleteOrder} = useManageUserOrder()

    const isLoading = useSelector(state => state.entities.order.loading)
    const ordersInContract = useSelector(state => state.entities.order.currentUserOrders)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const compter = useSelector(state => state.entities.order.contratCompter)
    const [editLivraisonValue, setEditLivraisonValue] = useState('editer...')


    const getStarted = useCallback(async () => {
        if(user) {
         await dispatch(getOrdersByUser())
         dispatch(getCurrentOrders('e-commerce'))
        }
        return;
    }, [dispatch])

    useEffect(() => {
        getStarted()
    }, [])

    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour consulter vos articles..'/>
    }

    if (error !== null) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Erreur...Impossible de consulter vos contrats. Veillez reessayer plutard.</AppText>
            </View>
        )
    }

    if(error === null && compter === 0) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Vous n'avez pas de contrats de commande en cours...</AppText>
        </View>
    }

    return (
        <>
        <AppActivityIndicator visible={isLoading}/>
        <FlatList data={ordersInContract} keyExtractor={(item, index) => index.toString()}
           renderItem={({item}) => {
               if (item.contrats.length>=1 && !item.historique) {
                   return (
                       <FactureListItem numero={item.numero}  orderItems={item.cartItems} montant={item.montant}
                                        trancheButtonTitle2='Afficher' labelStatusLivr='Status livraison'
                                        label='commande' orderEspace='contrat' statusLivraison={item.statusLivraison}
                                        getDetails={() => {
                                            dispatch(getItemDetail(item.id))
                                        }} showDetail={item.showDetails}
                                        getLink={() => navigattion.navigate(routes.FACTURE_DETAILS, item)} debut={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}
                                        linkTitle='voir la facture'
                                        fraisLivraison={item.fraisTransport} tauxInteret={item.interet} labelDate1='Commandé le ' labelDate2='Livré le'
                                        fin={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')} labelDatePrevue='Date livraison prevue'
                                        datePrevue={item.dateLivraisonDepart}  header='A'
                                        moveItemToHistory={() => {
                                            moveOrderToHistory(item.id)

                                        }} contrats={item.contrats}
                                        isContrat={true} statusLivraisonValue={editLivraisonValue} getStatusLivraisonEdit={() => startEditingLivraison(item.id)}
                                        editStatusLivraison={item.editLivraison} undoEdit={() => startEditingLivraison(item.id)}
                                        saveEdit={() => saveLivraisonEdit({orderId: item.id, statusLivraison: editLivraisonValue})} changeStatusText={(value) =>setEditLivraisonValue(value)}
                                        playItemWatch={item.facture.solde < item.contrats[0].montant}
                                        loopItemWatch={item.facture.solde < item.contrats[0].montant}
                                        contratLabel='Status contrat' contratStatus={item.facture.solde < item.contrats[0].montant?'En cours':'Terminé'}
                                        contratStatusStyle={{fontSize: 15, color:item.facture.solde < item.contrats[0].montant?'grey':colors.vert, fontWeight: 'bold'}}
                                        deleteItem={() => {
                                            deleteOrder(item)
                                        }}/>
                   )
               }
           }}/>
            </>
    );
}

export default UserOrderContratScreen;