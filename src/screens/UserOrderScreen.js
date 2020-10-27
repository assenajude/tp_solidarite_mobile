import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, FlatList, StyleSheet, ActivityIndicator,ScrollView, Alert} from "react-native";
import dayjs from "dayjs";

import {
    decrementOrderCompter,
    getItemDetail, getStatusEditing, incrementOrderCompter,
    saveStatusEditing,
    updateHistory
} from '../store/slices/orderSlice'
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import useCreateOrderContrat from "../hooks/useCreateOrderContrat";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";

function UserOrderScreen({navigation}) {
    const store = useStore();
    const dispatch  = useDispatch()
    const {startEditingAccord,saveAccordEdit, createOrderContrat, moveOrderToHistory} = useManageUserOrder()



    const userOrders = useSelector(state => state.entities.order.currentUserOrders)
    const compter = useSelector(state => state.entities.order.demandeCompter)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const [accordEditValue, setAccordEditValue] = useState('Editer le status')



    useEffect(() => {
    }, [])

    if(!user) {
        return <GetLogin message='Connectez vous pour consulter vos demandes'/>
    }


    if(error !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Erreur...Impossible de consulter vos demandes.Veuillez reessayer plutard.</AppText>
        </View>
    }

    if(error === null && compter === 0) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <AppText>Vous n'avez aucune demande en cours..</AppText>
            <AppButton title='Commander maintenant' onPress={() => navigation.navigate('E-commerce')}/>

        </View>
    }


    return (
       <FlatList data={userOrders} keyExtractor={(item, index) => index.toString()}
       renderItem={({item}) => {
           if(item.contrats && item.contrats.length === 0 && !item.historique) {
               return (
                   <FactureListItem numero={item.numero} montant={item.montant} label='commande'
                                    getDetails={() => dispatch(getItemDetail(item.id))} showDetail={item.showDetails} getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                    debut={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}  header='A'
                                    linkTitle='Voir la facrture' orderItems={item.cartItems} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                    labelDate1='Commandé le' labelDate2='Livré le ' fin={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                                    labelDatePrevue='Date livraison prevue' labelAccord='Status accord' statusAccordValue={item.statusAccord}
                                    editStatusAccord={item.editAccord} getAccordStatusEdit={() => startEditingAccord(item.id)} undoAccordEdit={() => startEditingAccord(item.id)}
                                    accordEditingValue={accordEditValue} changeAccordEditValue={(value, item) => setAccordEditValue(value)}
                                    saveAccordEditing={() => saveAccordEdit({orderId: item.id, statusAccord:accordEditValue})}
                                    orderEspace='demande' moveItemToHistory={() =>{
                                        moveOrderToHistory(item.id)
                                    }}
                                    leaveItemToContract={() => {
                                        createOrderContrat(item)
                                    }} isDemande={true} datePrevue={dayjs(item.dateLivraisonDepart).format('DD/MM/YYYY HH:mm:ss')}
                                    modePayement={getOrderPayementMode(store.getState())[item.id].payementMode}/>
               )
           }
       }}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UserOrderScreen;