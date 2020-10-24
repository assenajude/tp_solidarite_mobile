import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, FlatList, ScrollView, ActivityIndicator, Alert} from "react-native";

import routes from "../navigation/routes";
import FactureListItem from "../components/list/FactureListItem";
import {
    getAccordEditing,
    getItemDetail,
    saveStatusEditing,
    updateHistory
} from "../store/slices/orderSlice";
import dayjs from "dayjs";
import useCreateOrderContrat from "../hooks/useCreateOrderContrat";

function UserLocationScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()

    const {createContrat} = useCreateOrderContrat()

    const userLocations = useSelector(state => state.entities.order.currentUserOrders)
    const [accordEdit, setAccordEdit] = useState('editer le status...')

    const saveAccordEditing = (item) => {
        const data = {
            orderId: item.id,
            statusAccord: accordEdit
        }
        dispatch(saveStatusEditing(data))
        dispatch(getAccordEditing(item))
    }

    const moveLocationToHistory = (order) => {
        const data = {
            orderId: order.id,
            history: true
        }
        dispatch(updateHistory(data))
    }


    const createLocationContrat = (item) => {
        Alert.alert('Info!!!', 'Voulez-vous passez en contrat pour cette demande?', [
            {text: 'oui', onPress: async () => {
                await createContrat(item)
                }},
            {text: 'non', onPress: () => {
                return;
                }}
        ])
    }

    useEffect(() => {
    }, [])

    return (
        <ScrollView>
            {
                userLocations.map((item, index) => {
                    if (!item.contrats || item.contrats.length === 0 && !item.historique) {
                        return (
                            <FactureListItem key={index.toString()} numero={item.numero} montant={item.montant} label='commande'
                                             getDetails={() => {
                                                 dispatch(getItemDetail(item.id))}} showDetail={item.showDetails}
                                             getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                             debut={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}
                                             header='CMD N°:'
                                             linkTitle='Voir la facrture' orderItems={item.cartItems} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                             labelDate1='Commandé le' labelDate2='Livré le ' fin={dayjs(item.dateLivraisonFinal).format('DD/MM/YYYY HH:mm:ss')}
                                             orderEspace='demande' labelAccord='Status accord' statusAccordValue={item.statusAccord}
                                             labelDatePrevue='Date remise des clefs:' datePrevue={item.dateLivraisonDepart}
                                             editStatusAccord={item.editAccord} accordEditingValue={accordEdit} changeAccordEditValue={(value, item) => setAccordEdit(value)}
                                             getAccordStatusEdit={() => dispatch(getAccordEditing(item))} undoAccordEdit={() => dispatch(getAccordEditing(item))}
                                             saveAccordEditing={() => saveAccordEditing(item)} moveItemToHistory={() => moveLocationToHistory(item)}
                                             leaveItemToContract={() => createLocationContrat(item)} isDemande={true}/>
                        )
                    }
                })
            }
        </ScrollView>
    );
}

export default UserLocationScreen;