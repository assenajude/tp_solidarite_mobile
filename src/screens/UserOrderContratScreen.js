import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useStore, useSelector} from "react-redux";
import {View, ActivityIndicator, FlatList, ScrollView} from "react-native";
import dayjs from "dayjs";

import {
    getCurrentOrders,
    getItemDetail, getOrdersByUser, getStatusEditing, saveStatusEditing,
    updateHistory
} from "../store/slices/orderSlice";
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getUserOrders} from "../store/slices/userOrderSlice";
import AppText from "../components/AppText";
import colors from "../utilities/colors";


function UserOrderContratScreen({navigattion}) {
    const dispatch = useDispatch()
    const store = useStore()
    const isLoading = useSelector(state => state.entities.order.loading)
    const ordersInContract = useSelector(state => state.entities.order.currentUserOrders)
    const error = useSelector(state => state.entities.order.error)
    const [editLivraisonValue, setEditLivraisonValue] = useState('editer...')

    const startEditLivraison = (item) => {
        const data = {
            id: item.id,
            libelle: 'editLivraison'
        }
        dispatch(getStatusEditing(data))
    }

    const saveLivraisonEdit = (item) => {
        const data = {
            orderId: item.id,
            statusLivraison: editLivraisonValue
        }
        dispatch(saveStatusEditing(data))
        const editData = {
            id: item.id,
            libelle: 'editLivraison'
        }
        dispatch(getStatusEditing(editData))
    }

    const moveItemToHistory = (item) => {
        const orderData = {
            orderId: item.id,
            history: true
        }
        dispatch(updateHistory(orderData))
    }

    const getStarted = useCallback(async () => {
         dispatch(getOrdersByUser())
         dispatch(getCurrentOrders('e-commerce'))
    }, [])

    useEffect(() => {
        getStarted()
    }, [])


    if(!error && ordersInContract.length === 0) {
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
            <ScrollView>
                {ordersInContract.map((item, index) => {
                    if (item.contrats.length>=1 && !item.historique) {
                        return (
                            <FactureListItem key={index.toString()} numero={item.numero}  orderItems={item.cartItems} montant={item.montant}
                                             trancheButtonTitle2='Afficher' labelStatusLivr='Status livraison'
                                             label='commande' orderEspace='contrat' statusLivraison={item.statusLivraison}
                                             getDetails={() => {
                                                 dispatch(getItemDetail(item.id))
                                             }} showDetail={item.showDetails}
                                             getLink={() => navigattion.navigate(routes.FACTURE_DETAILS, item)} debut={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}
                                             linkTitle='voir la facture'
                                             fraisLivraison={item.fraisTransport} tauxInteret={item.interet} labelDate1='Commandé le ' labelDate2='Livré le'
                                             fin={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')} labelDatePrevue='Date livraison prevue'
                                             datePrevue={item.dateLivraisonDepart}  header='CMD N°'
                                             moveItemToHistory={() => moveItemToHistory(item)} contrats={item.contrats}
                                             isContrat={true} statusLivraisonValue={editLivraisonValue} getStatusLivraisonEdit={() => startEditLivraison(item)}
                                             editStatusLivraison={item.editLivraison} undoEdit={() => startEditLivraison(item)}
                                             saveEdit={() => saveLivraisonEdit(item)} changeStatusText={(value) =>setEditLivraisonValue(value)}
                                             playItemWatch={item.facture.solde < item.contrats[0].montant}
                                             loopItemWatch={item.facture.solde < item.contrats[0].montant}
                                             contratLabel='Status contrat' contratStatus={item.facture.solde < item.contrats[0].montant?'En cours':'Terminé'}
                                             contratStatusStyle={{fontSize: 15, color:item.facture.solde < item.contrats[0].montant?'grey':colors.vert, fontWeight: 'bold'}}/>
                        )
                    }
                })}
            </ScrollView>
            </>
    );
}

export default UserOrderContratScreen;