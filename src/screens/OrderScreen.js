import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux'
import {View, Text, StyleSheet, Alert,Modal, FlatList, ScrollView} from 'react-native'

import Color  from '../utilities/colors'
import FinalOrderItem from "../components/order/FinalOrderItem";
import {getInteretValue, getTaux, getTotalPartCaution} from '../store/selectors/orderSelector'
import routes from "../navigation/routes";
import {getFraisLivraison, getTotalFinal} from '../store/selectors/orderSelector';
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import authStorage from '../store/persistStorage'
import {makeOrder, getOrderReset} from '../store/slices/orderSlice'
import {getCartClear} from '../store/slices/shoppingCartSlice'
import {getResetPayement} from '../store/slices/payementSlice'
import {getAdresseReset} from '../store/slices/userAdresseSlice'
import AppActivityIndicator from "../components/AppActivityIndicator";

function OrderScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch();

    const selectedPayemet = useSelector(state => state.entities.payement.selectedPayement)
    const currentPlan = useSelector(state => state.entities.payement.currentPlan);
    const currentOrder = useSelector(state => state.entities.order.currentOrder);
    const selectedAdesse = useSelector(state => state.entities.userAdresse.selectedAdresse)
    const selectedAdesseRelais = useSelector(state => state.entities.userAdresse.adresseRelais)
    const serviceDate = useSelector(state => state.entities.order.servicePayementDate)
    const loading = useSelector(state => state.entities.order.loading)

    const saveOrder = async () => {
        const user = await authStorage.getUser();
        let adresseId = null
        if(selectedAdesse) {
            adresseId = selectedAdesse.id
        }
        let livraisonDate = null
        let dateNow = new Date()
        const dateOfNow = dateNow.getDate()
        dateNow.setDate(dateOfNow+3)
        if(currentOrder.type === 'e-service') {
            livraisonDate = serviceDate
        } else {
            livraisonDate = dateNow.getTime()
        }

        const order = {
            userId: user.id,
            userAdresseId: adresseId,
            planId: currentPlan.id,
            items: currentOrder.items,
            itemsLength: currentOrder.itemsLenght,
            interet: getInteretValue(store.getState()),
            fraisTransport: getFraisLivraison(store.getState()),
            montant: getTotalFinal(store.getState()),
            dateLivraisonDepart:livraisonDate,
            typeCmde: currentOrder.type
        }
         await dispatch(makeOrder(order))
        const success =  store.getState().entities.order.orderSuccess
        if(success) {
            await dispatch(getCartClear())
            await dispatch(getOrderReset())
            await dispatch(getResetPayement())
            await dispatch(getAdresseReset())
            navigation.navigate(routes.ORDER_SUCCESS)
        } else {
            Alert.alert('Echec!!', 'Impossible de faire la commande maintenant', [
                {text: 'ok', onPress: () => navigation.navigate(routes.ACCUEIL)}
            ], {cancelable: false})
        }
    }


    useEffect(() => {
    }, [dispatch, currentOrder])




    if (!currentOrder) {
        return (
            <View style={styles.emptyStyle}>
                <Text>Aucune commande encours. Vous pouvez faire des achats</Text>
            </View>
        )
    } else {
    return (
        <>
            <AppActivityIndicator visible={loading}/>
        <View style={styles.container}>
                <View style={styles.header}>
                    <AppText style={{color: Color.blanc}}>Verifiez les details de votre commande puis finaliser</AppText>
                </View>
            <ScrollView>
               {currentOrder.type === 'e-location' && <FinalOrderItem  header="Location" label1='Quantité reservée: ' label1Value={currentOrder.itemsLenght}
                label2='Montant: ' label2Value={currentOrder.amount}
               label4='Part total caution: ' label4Value={getTotalPartCaution(store.getState()).totalPartCaution}/>}

                {currentOrder.type === 'e-service' && <FinalOrderItem header="Service" label1={currentOrder.items[0].libelle}
                label2='Montant: ' label2Value={currentOrder.amount}/>}

               {currentOrder.type === 'e-commerce' && <FinalOrderItem header='Commande' label1= "Nombre d'articles: " label1Value={currentOrder.itemsLenght}
                label2='Montant: ' label2Value={currentOrder.amount}/>}

                <FinalOrderItem  header='Payement' label1='Mode: ' label1Value={selectedPayemet.mode}
                label2={`Taux d'interet (${getTaux(store.getState())}%): `} label2Value={getInteretValue(store.getState())} label3='Plan: '
                                label3Value={currentPlan.libelle} changeLabel3={() => navigation.navigate(routes.ORDER_PAYEMENT)} label4='Description:' label4Value={currentPlan.descripPlan}/>

             { currentOrder.type === 'e-commerce' && <FinalOrderItem header='Livraison' label1='Agence de retrait: ' label1Value={selectedAdesseRelais.nom}
                            label2='Coût: ' label2Value={getFraisLivraison(store.getState())}
                            label3='Votre contact: ' label3Value={selectedAdesse.nom} changeLabel3={() => navigation.navigate(routes.ORDER_LIVRAISON)} label4='Telephone: ' label4Value={selectedAdesse.tel}/>}
                <View style={styles.totalFinal}>
                    <AppText style={{fontSize: 24, fontWeight: 'bold'}}>Montant total TTC: </AppText>
                    <AppText style={{color: Color.rougeBordeau, fontSize: 15, fontWeight: 'bold'}}>{getTotalFinal(store.getState())} FCFA</AppText>
                </View>
                 <AppButton onPress={saveOrder} textStyle={{fontWeight: 'bold', fontSize: 15}} style={styles.finalButton}
                            title='Finaliser votre demande'/>
            </ScrollView>
             </View>
            </>
        );
    }
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
    },
    commandeModal: {
        flexDirection: 'row',
        marginBottom: 20
    },
    factureModal: {
        flexDirection: 'row',
        marginBottom: 20
    },
    modalButton: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    modalContainer: {
        flex:1,
        justifyContent: 'space-around',
    },
    modalHeader: {
        alignSelf: 'flex-start'
    },
    modalMainContainer: {

    }
})
export default OrderScreen;