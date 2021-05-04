import React from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux'
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native'

import Color  from '../utilities/colors'
import FinalOrderItem from "../components/order/FinalOrderItem";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import {makeOrder, getFinalOrderDetails, getOrderReset} from '../store/slices/orderSlice'
import {getCurrentPlanDetail, getResetPayement} from '../store/slices/payementSlice'
import {getAdresseReset, getOrderAdresseDetails} from '../store/slices/userAdresseSlice'
import AppActivityIndicator from "../components/AppActivityIndicator";
import OrderItemDetails from "../components/order/OrderItemDetails";
import AppLabelWithValue from "../components/AppLabelWithValue";
import {getCartClear} from "../store/slices/shoppingCartSlice";
import {getUserVilleReset} from "../store/slices/villeSlice";
import usePlaceOrder from "../hooks/usePlaceOrder";
import AppModePayement from "../components/AppModePayement";
import ParrainageHeader from "../components/parrainage/ParrainageHeader";
import useAuth from "../hooks/useAuth";
import {getConnectedUserData} from "../store/slices/userProfileSlice";

function OrderScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch();
    const {formatPrice} = useAuth()
    const {getTotal,getShippingRate, getPayementRate, getTauxPercent} = usePlaceOrder()

    const selectedPayemet = useSelector(state => state.entities.payement.selectedPayement)
    const currentPlan = useSelector(state => state.entities.payement.currentPlan);
    const currentOrder = useSelector(state => state.entities.order.currentOrder);
    const selectedAdesse = useSelector(state => state.entities.userAdresse.selectedAdresse)
    const selectedAdesseRelais = useSelector(state => state.entities.userAdresse.adresseRelais)
    const serviceDate = useSelector(state => state.entities.order.servicePayementDate)
    const loading = useSelector(state => state.entities.order.loading)
    const selectedParrains = useSelector(state => state.entities.order.currentOrderParrains)

    const saveOrder = async () => {
        let adresseId;
        if(selectedAdesse) {
            adresseId = selectedAdesse.id
        }
        let livraisonDate;
        let dateNow = new Date()
        const dateOfNow = dateNow.getDate()
        dateNow.setDate(dateOfNow+3)
        if(currentOrder.type === 'service') {
            livraisonDate = serviceDate
        } else {
            livraisonDate = dateNow.getTime()
        }

        const order = {
            userAdresseId: adresseId,
            planId: currentPlan.id,
            items: currentOrder.items,
            itemsLength: currentOrder.itemsLenght,
            interet: getPayementRate(),
            fraisTransport: getShippingRate(),
            montant: getTotal(),
            dateLivraisonDepart:livraisonDate,
            typeCmde: currentOrder.type
        }
         await dispatch(makeOrder({order, parrains:selectedParrains}))
        const error =  store.getState().entities.order.error
        if(error !== null) {
            Alert.alert('Echec!!', 'Impossible de faire la commande maintenant', [
                {text: 'ok', onPress: () => navigation.navigate(routes.ACCUEIL)}
            ], {cancelable: false})

        } else {
                dispatch(getCartClear())
                dispatch(getOrderReset())
                dispatch(getAdresseReset())
                dispatch(getResetPayement())
                dispatch(getUserVilleReset())
                dispatch(getConnectedUserData())
            navigation.navigate(routes.ORDER_SUCCESS)
        }
    }

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
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 20}}>
                        <AppModePayement modePayement={selectedPayemet.mode}/>
                    </View>
                    {selectedPayemet.mode.toLowerCase() === 'credit' && <View>
                        <View style={{backgroundColor: Color.rougeBordeau, alignSelf: 'center'}}>
                            <AppText style={{color: Color.blanc}}>Option de couverture</AppText>
                        </View>
                        <AppText style={{color: Color.or, fontWeight: 'bold'}}>{selectedParrains.length>0?'Parrainage':'Seuil de fidelité'}</AppText>
                        {selectedParrains.length>0 && <View>
                            {selectedParrains.map((item, index) => <View key={item.id.toString()} style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10
                            }}>
                                <ParrainageHeader ownerUserAvatar={item.User.avatar} avatarUrl={{uri: item.User.avatar}}
                                                  ownerUsername={item.User.username} ownerEmail={item.User.email}/>
                                   <AppText style={{color: Color.rougeBordeau, fontWeight: 'bold'}}>{formatPrice(item.parrainAction)}</AppText>
                            </View>)}
                        </View>}
                    </View>}
                </View>
               {currentOrder.type === 'location' &&
               <FinalOrderItem  header="Location" label1={currentOrder.items[0].libelle}
                                label2='Montant: ' label2Value={currentOrder.amount}
                                label4='Part total caution: ' detailsInfo={currentOrder.showDetails}
                                getOrderItemDetails={() => dispatch(getFinalOrderDetails())}>
                   <OrderItemDetails quantite={currentOrder.items[0].quantite} montant={currentOrder.items[0].montant}
                                     imageSource={{uri: currentOrder.items[0].image}} libelle={currentOrder.items[0].libelle}/>
                                     <View>
                                         <AppLabelWithValue label={`Coût ${currentOrder.items[0].frequence}`} labelValue={currentOrder.items[0].prix} secondLabel='fcfa'/>
                                         <AppLabelWithValue label='Caution' labelValue={currentOrder.items[0].caution} secondLabel={currentOrder.items[0].frequence.toLowerCase() === 'mensuelle'?'Mois':'Jour(s)'}/>
                                     </View>
               </FinalOrderItem>}

                {currentOrder.type === 'service' &&
                <FinalOrderItem header="Service" label1={currentOrder.items[0].libelle}
                                label2='Montant: ' label2Value={currentOrder.amount} detailsInfo={currentOrder.showDetails}
                                getOrderItemDetails={() => dispatch(getFinalOrderDetails())}>

                    <View>
                        <OrderItemDetails imageSource={{uri: currentOrder.items[0].image}} quantite={currentOrder.items[0].quantite}
                                          montant={currentOrder.items[0].montant} libelle={currentOrder.items[0].libelle}/>
                    </View>
                </FinalOrderItem>}

               {currentOrder.type === 'article' &&
                         <FinalOrderItem header='Commande' label1= "Nombre d'articles: " label1Value={currentOrder.itemsLenght}
                                          label2='Montant: ' label2Value={currentOrder.amount}
                                         detailsInfo={currentOrder.showDetails} getOrderItemDetails={() => dispatch(getFinalOrderDetails())
                                         }>
                             <View>
                                {currentOrder.items.map(item => <OrderItemDetails key={item.id.toString()} libelle={item.libelle} imageSource={{uri: item.image}}
                                                                                  quantite={item.quantite} montant={item.montant}/>)}
                             </View>

                        </FinalOrderItem>}

                <FinalOrderItem  header='Payement' label1='Mode: ' label1Value={selectedPayemet.mode}
                label2={`Taux d'interet (${getTauxPercent()}%): `} label2Value={getPayementRate()} label3='Plan: '
                                label3Value={currentPlan.libelle} changeLabel3={() => navigation.navigate(routes.ORDER_PAYEMENT)} label4='Description:' label4Value={currentPlan.descripPlan}
                                 detailsInfo={currentPlan.CurrentPlanDetail} isPayement={true} getOrderItemDetails={() => dispatch(getCurrentPlanDetail())}>
                    <View>
                        <AppText>{currentPlan.descripPlan}</AppText>
                    </View>
                </FinalOrderItem>

             { currentOrder.type === 'article' && <FinalOrderItem header='Livraison' label1='Agence de retrait: ' label1Value={selectedAdesseRelais.nom}
                            label2='Coût: ' label2Value={getShippingRate()}
                            label3='Votre contact: ' label3Value={selectedAdesse.nom} changeLabel3={() => navigation.navigate(routes.ORDER_LIVRAISON)} label4="Plus d'infos: "
                             label4Value={selectedAdesse.tel} detailsInfo={selectedAdesse.showDetails} getOrderItemDetails={() => dispatch(getOrderAdresseDetails())}>
                 <View>
                     <AppLabelWithValue label='Tel: ' labelValue={selectedAdesse.tel}/>
                     <AppLabelWithValue label='E-mail: ' labelValue={selectedAdesse.email}/>
                     <AppLabelWithValue label='Autres adresses: ' labelValue={selectedAdesse.adresse}/>
                 </View>
             </FinalOrderItem>}

                <View style={styles.totalFinal}>
                    <AppText style={{fontSize: 20, fontWeight: 'bold'}}>Montant total TTC: </AppText>
                    <AppText style={{color: Color.rougeBordeau, fontSize: 20, fontWeight: 'bold'}}>{formatPrice(getTotal())}</AppText>
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
        margin: 40,
        elevation: 20
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