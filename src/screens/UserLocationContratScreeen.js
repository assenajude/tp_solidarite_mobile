import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useStore, useSelector} from "react-redux";
import {View, ActivityIndicator, FlatList, ScrollView} from "react-native";
import {
    getCurrentOrders,
    getItemDetail, getOrdersByUser,
} from "../store/slices/orderSlice";
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";
import useManageUserOrder from "../hooks/useManageUserOrder";
import colors from "../utilities/colors";
import AppButton from "../components/AppButton";
import GetLogin from "../components/user/GetLogin";

function UserLocationContratScreeen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const {startEditingLivraison, saveLivraisonEdit, moveOrderToHistory, deleteOrder} = useManageUserOrder()

    const compter = useSelector(state => state.entities.order.contratCompter)
    const isLoading = useSelector(state => state.entities.order.loading)
    const locationDatas = useSelector(state => state.entities.order.currentUserOrders)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const [editLivraison, setEditLivraison] = useState('editer..')



    const getStarted = useCallback(async () => {
        if(user) {
        await dispatch(getOrdersByUser())
        dispatch(getCurrentOrders('e-location'))
        }
        return;
    }, [dispatch])

    useEffect(() => {
      getStarted()
    }, [])

    if (!user) {
        return <GetLogin message='Vous devez vous connecter pour consulter vos locations'/>
    }

    if(error === null && compter === 0) {
        return <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'}
        }>
            <AppText>Vous n'avez pas de contrat de location en cours...</AppText>
        </View>
    }

    if(error !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Impossible de consulter vos locations.Une erreur est apparue..</AppText>
        </View>
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <FlatList data={locationDatas} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => {
                          if (item.contrats && item.contrats.length >=1 && !item.historique) {
                              return (
                                  <FactureListItem label='commande' isContrat={true} orderItems={item.cartItems} header='L'
                                                   debut={item.dateCmde} fin={item.dateEcheance} contrats={item.contrats} labelDate1='commandé le'
                                                   labelDate2='Clef remis le '
                                                   montant={item.montant} numero={item.numero} showDetail={item.showDetails}
                                                   getDetails={() => dispatch(getItemDetail(item.id))}
                                                   fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                                   labelDatePrevue='Date remise clef prevue' datePrevue={item.dateLivraisonDepart}
                                                   labelStatusLivr='Status livraison' statusLivraison={item.statusLivraison} statusLivraisonValue={editLivraison}
                                                   getStatusLivraisonEdit={() => startEditingLivraison(item.id)} editStatusLivraison={item.editLivraison}
                                                   linkTitle='Voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)} changeStatusText={(value) => setEditLivraison(value)}
                                                   undoEdit={() => startEditingLivraison(item.id)} saveEdit={() => saveLivraisonEdit({orderId: item.id, statusLivraison: editLivraison })}
                                                   contratLabel='Status contrat' contratStatus={item.facture.solde < item.contrats[0].montant?'En cours':'Terminé'}
                                                   contratStatusStyle={{fontSize: 15, color:item.facture.solde < item.contrats[0].montant?'grey':colors.vert, fontWeight: 'bold'}}
                                                   loopItemWatch={item.contrats[0].status.toLowerCase() === 'en cours'} playItemWatch={item.contrats[0].status.toLowerCase() === 'en cours'}
                                                   deleteItem={() => deleteOrder(item)} moveItemToHistory={() => moveOrderToHistory(item.id)}
                                  />
                              )
                          }
                      }}/>
           </>
    )
}

export default UserLocationContratScreeen;