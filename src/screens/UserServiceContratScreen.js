import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {View, ActivityIndicator, FlatList, ScrollView} from "react-native";
import dayjs from "dayjs";


import {
    getCurrentOrders,
    getItemDetail,
    updateHistory
} from "../store/slices/orderSlice";
import colors from "../utilities/colors";
import UserServiceItem from "../components/order/UserServiceItem";
import AppText from "../components/AppText";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getUserServices} from "../store/slices/userServiceSlice";

function UserServiceContratScreen(props) {
    const store = useStore()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.entities.order.loading)
    const error = useSelector(state => state.entities.order.error)
    const userServicesData = useSelector(state => state.entities.order.currentUserOrders)


    useEffect(() => {
        dispatch(getCurrentOrders('e-service'))
    }, [])

    if(!error && userServicesData.length === 0) {
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

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <ScrollView>
                {userServicesData.map((item, index) => {
                    if (item.contrats && item.contrats.length>= 1 && !item.historique) {
                        return (
                            <UserServiceItem key={index.toString()} isHistorique={false} header='SVC N°:' headerValue={item.numero}
                                             moveItemToHistorique={() => {
                                                 const data = {
                                                     orderId: item.id,
                                                     history: true
                                                 }
                                                 dispatch(updateHistory(data))
                                             }} contrats={item.contrats} itemMontant={item.montant} itemImage={item.cartItems[0].image}
                                             showOrderDetail={() => dispatch(getItemDetail(item.id))} showDetail={item.showDetails}
                                             libStatusContrat='Status contrat' statusContratValue={item.contrats[0].status}
                                             statusAccordValue={item.statusAccord} serviceDescrip={item.cartItems[0].libelle}
                                             dateDemande={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}
                                             dateFourniture={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                                             accordValueStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase() === 'refusé'?'red':'grey',
                                                 fontWeight: 'bold'}} isDemande={false} playItemWatch={item.contrats[0].status.toLowerCase() === 'en cours'}
                                             loopItemWatch={item.contrats[0].status.toLowerCase() === 'en cours'}/>
                        )
                    }
                })}
            </ScrollView>

        </>
    );
}

export default UserServiceContratScreen;