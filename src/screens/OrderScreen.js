import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux'
import {View, Text, StyleSheet, Alert, FlatList, ScrollView} from 'react-native'

import Color  from '../utilities/colors'
import FinalOrderItem from "../components/order/FinalOrderItem";
import {getInteretValue, getTaux} from '../store/selectors/orderSelector'
import routes from "../navigation/routes";
import {getFraisLivraison, getTotalFinal} from '../store/selectors/orderSelector';
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import authStorage from '../store/persistStorage'
import {makeOrder} from '../store/slices/orderSlice'
import {getCartClear} from '../store/slices/shoppingCartSlice'

function OrderScreen({navigation}) {
    const store = useStore()

    const dispatch = useDispatch();
    const orders = useSelector(state => state.entities.order.list);
    const selectedPayemet = useSelector(state => state.entities.payement.selectedPayement)
    const currentPlan = useSelector(state => state.entities.payement.currentPlan);
    const currentOrder = useSelector(state => state.entities.order.currentOrder);
    const selectedAdesse = useSelector(state => state.entities.userAdresse.selectedAdresse)

    const saveOrder = async () => {
        const user = await authStorage.getUser();
        const order = {
            userId: user.id,
            userAdresseId: selectedAdesse.id,
            planId: currentPlan.id,
            items: currentOrder.items,
            itemsLength: currentOrder.itemsLenght,
            interet: getInteretValue(store.getState()),
            fraisTransport: getFraisLivraison(store.getState()),
            montant: getTotalFinal(store.getState())
        }
        await dispatch(makeOrder(order))
        store.subscribe(() => {
            const success = store.getState().entities.order.orderSuccess
            if(success) {
                dispatch(getCartClear())
                navigation.navigate(routes.ACCUEIL)
            }
            return;
        })
    }


    useEffect(() => {
    }, [dispatch, currentOrder])




    if (orders.length === 0) {
        return (
            <View style={styles.emptyStyle}>
                <Text>Aucune commande encours. Vous pouvez faire des achats</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <AppText style={{color: Color.blanc}}>Verifiez les details de votre commande puis finaliser</AppText>
                </View>
            <ScrollView>
                <FinalOrderItem header='Commande' label1='total articles: ' label1Value={currentOrder.itemsLenght}
                label2='Montant: ' label2Value={currentOrder.amount}/>

                <FinalOrderItem  header='Payement' label1='Mode: ' label1Value={selectedPayemet.mode}
                label2={`Taux d'interet (${getTaux(store.getState())}%): `} label2Value={getInteretValue(store.getState())} label3='Plan: '
                                label3Value={currentPlan.libelle} changeLabel3={() => navigation.navigate(routes.ORDER_PAYEMENT)} label4='Description:' label4Value={currentPlan.descripPlan}/>

                <FinalOrderItem header='Livraison' label1='Agence de retrait: ' label1Value={selectedAdesse.pointRelai.nom}
                            label2='Coût: ' label2Value={getFraisLivraison(store.getState())}
                            label3='Votre contact: ' label3Value={selectedAdesse.nom} changeLabel3={() => navigation.navigate(routes.ORDER_LIVRAISON)} label4='Telephone: ' label4Value={selectedAdesse.tel}/>
                <View style={styles.totalFinal}>
                    <AppText style={{fontSize: 24, fontWeight: 'bold'}}>Montant total TTC: </AppText>
                    <AppText style={{color: Color.rougeBordeau, fontSize: 24, fontWeight: 'bold'}}>{getTotalFinal(store.getState())} FCFA</AppText>
                </View>
                 <AppButton onPress={saveOrder} textStyle={{fontWeight: 'bold', fontSize: 18}} style={styles.finalButton} title='Finaliser la commande'/>
            </ScrollView>

        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 20,
        marginBottom: 40,
    },
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listFooterStyle: {
        backgroundColor: Color.rougeBordeau,
        padding: 10,
        marginTop: 30,
        marginBottom: 50,
        left: '25%'

    },
    header: {
        backgroundColor: Color.rougeBordeau
    },
    finalButton: {
        backgroundColor: Color.rougeBordeau,
        width: '50%',
        height: 40,
        alignSelf: 'center',
        margin: 40
    },
    totalFinal: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        margin: 30,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Color.blanc
    }
})
export default OrderScreen;