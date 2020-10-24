import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, FlatList, StyleSheet, ActivityIndicator,ScrollView, Alert} from "react-native";
import dayjs from "dayjs";

import {
    getItemDetail, getStatusEditing,
    saveStatusEditing,
    updateHistory
} from '../store/slices/orderSlice'
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import useCreateOrderContrat from "../hooks/useCreateOrderContrat";

function UserOrderScreen({navigation}) {
    const store = useStore();
    const dispatch  = useDispatch()
    const {createContrat} = useCreateOrderContrat()

    const userOrders = useSelector(state => state.entities.order.currentUserOrders)
    const isLoading = useSelector(state => state.entities.order.loading)
    const user = useSelector(state => state.auth.user)
    const [editLivraisonStatus, setEditLivraisonStatus] = useState(false)
    const [statusLivraison, setStatusLivraison] = useState('editer le status..')
    const [accordEditValue, setAccordEditValue] = useState('Editer le status')


    const  startEditingAccord = (item) => {
        const data = {
            id: item.id,
            libelle: 'editAccord'
        }
        dispatch(getStatusEditing(data))
    }

    const handleAccordEditSave = (currentItem) => {
        const data = {
            orderId: currentItem.id,
            statusAccord: accordEditValue
        }
        dispatch(saveStatusEditing(data))
        const editData = {
            id: currentItem.id,
            libelle: 'editAccord'
        }
        dispatch(getStatusEditing(editData))
    }


    const setItemHistory = (item) => {
        const itemData = {
            orderId: item.id,
            history: true
        }
        dispatch(updateHistory(itemData))
    }

    const createItemContrat = (value) => {
        Alert.alert('Info...', 'Voulez-vous passer en contrat pour cette commande?', [
            {text: 'oui', onPress: async () => {
                  await createContrat(value)
                }},
            {
                text: 'non', onPress: () => {return;}
            }
        ], {cancelable: false})

    }


    useEffect(() => {
    }, [])



    return (
            <ScrollView>
                {userOrders.map((item, index) => {
                    if(item.contrats && item.contrats.length === 0 && !item.historique) {
                        return (
                            <FactureListItem key={index.toString()} numero={item.numero} montant={item.montant} label='commande'
                                             getDetails={() => dispatch(getItemDetail(item.id))} showDetail={item.showDetails} getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                             debut={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}  header='CMD N°:'
                                             linkTitle='Voir la facrture' orderItems={item.cartItems} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                             labelDate1='Commandé le' labelDate2='Livré le ' fin={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                                             labelDatePrevue='Date livraison prevue' labelAccord='Status accord' statusAccordValue={item.statusAccord}
                                             editStatusAccord={item.editAccord} getAccordStatusEdit={() => startEditingAccord(item)} undoAccordEdit={() => startEditingAccord(item)}
                                             accordEditingValue={accordEditValue} changeAccordEditValue={(value, item) => setAccordEditValue(value)}
                                             saveAccordEditing={() => handleAccordEditSave(item)}
                                             orderEspace='demande' moveItemToHistory={() => setItemHistory(item)}
                                             leaveItemToContract={() => createItemContrat(item)} isDemande={true} />
                        )
                    }
                })}
            </ScrollView>
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