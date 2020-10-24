import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useStore, useSelector} from "react-redux";
import {View, ActivityIndicator, FlatList, ScrollView} from "react-native";
import {
     getCurrentOrders,
    getItemDetail,
    updateHistory
} from "../store/slices/orderSlice";
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";

function UserLocationContratScreeen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const compter = useSelector(state => state.entities.order.contratCompter)
    const isLoading = useSelector(state => state.entities.order.loading)
    const locationDatas = useSelector(state => state.entities.order.currentUserOrders)
    const error = useSelector(state => state.entities.order.error)
    const [editLivraison, setEditLivraison] = useState('editer..')
    const [editContrat, setEditContrat] = useState('editer..')


    const moveItemToHistory = (item) => {
        const data = {
            orderId: item.id,
            history: true
        }
        dispatch(updateHistory(data))
    }

    useEffect(() => {
    dispatch(getCurrentOrders('e-location'))
    }, [])

    if(!error && locationDatas.length === 0) {
        return <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'}
        }>
            <AppText>Vous n'avez pas de contrat de location en cours...</AppText>
        </View>
    }


    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <ScrollView>
                {locationDatas.map((item, index) => {
                    if (item.contrats && item.contrats.length >=1 && !item.historique) {
                        return (
                            <FactureListItem key={index.toString()} label='commande' isContrat={true} orderItems={item.cartItems} header='LOC N°:'
                                             debut={item.dateCmde} fin={item.dateEcheance} contrats={item.contrats} labelDate1='commandé le'
                                             labelDate2='Clef remis le '
                                             montant={item.montant} numero={item.numero} showDetail={item.showDetails}
                                             getDetails={() => dispatch(getItemDetail(item.id))}
                                             fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                             labelDatePrevue='Date remise clef prevue' datePrevue={item.dateLivraisonDepart}
                                             labelStatusLivr='Status livraison' statusLivraison={item.statusLivraison} statusLivraisonValue={editLivraison}
                                             linkTitle='Voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                             statusContratValue={item.contrats[0].status}
                                             loopItemWatch={item.contrats[0].status.toLowerCase() === 'en cours'} playItemWatch={item.contrats[0].status.toLowerCase() === 'en cours'}
                            />
                        )
                    }
                })}
            </ScrollView>
           </>
    )
}

export default UserLocationContratScreeen;