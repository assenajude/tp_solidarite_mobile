import React, {useCallback,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";

import {
    getCurrentOrders,
    getItemDetail, getOrdersByUser
} from "../store/slices/orderSlice";
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import initData from '../utilities/initData'


function UserOrderContratScreen({navigation}) {
    const dispatch = useDispatch()
    const { saveLivraisonEdit, moveOrderToHistory, deleteOrder} = useManageUserOrder()

    const isLoading = useSelector(state => state.entities.order.loading)
    const ordersInContract = useSelector(state => state.entities.order.currentUserOrders)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const compter = useSelector(state => state.entities.order.contratCompter)


    const getStarted = useCallback(async () => {
        if(user) {
         await dispatch(getOrdersByUser())
         dispatch(getCurrentOrders('e-commerce'))
        }
        return;
    }, [dispatch])

    const livraisonData = ['En cours', 'Livré', 'Partiel']

    useEffect(() => {
        getStarted()
    }, [])

    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour consulter vos articles..'/>
    }

    if (error !== null) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Erreur...Impossible de consulter vos contrats. Veillez reessayer plutard.</AppText>
            </View>
        )
    }

    if(error === null && compter === 0) {
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
        <FlatList data={ordersInContract} keyExtractor={(item, index) => index.toString()}
           renderItem={({item}) => {
               if (item.Contrats.length>=1 && !item.historique) {
                   return (
                       <FactureListItem numero={item.numero}  orderItems={item.CartItems} montant={item.montant}
                                        trancheButtonTitle2='Afficher'
                                        label='commande' orderEspace='contrat'
                                        getDetails={() => {
                                            dispatch(getItemDetail(item.id))
                                        }} showDetail={item.showDetails}
                                        getLink={() => navigattion.navigate(routes.FACTURE_DETAILS, item)} dateCmde={item.dateCmde}
                                        linkTitle='voir la facture'
                                        fraisLivraison={item.fraisTransport} tauxInteret={item.interet} labelDateCmde='Commandé le ' labelDateLivraison='Livré le'
                                        dateLivraison={item.dateLivraisonFinal} labelDatePrevue='Date livraison prevue'
                                        datePrevue={item.dateLivraisonDepart}  header='A'
                                        moveItemToHistory={() => {moveOrderToHistory(item.id)}} contrats={item.Contrats}
                                        isContrat={true} playItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'}
                                        loopItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'}
                                        contratLabel='Status contrat' contratStatus={item.Contrats[0].status}
                                        contratStatusStyle={{fontSize: 15, color:item.Contrats[0].status.toLowerCase() === 'en cours'?'grey':item.Contrats[0].status.toLowerCase() === 'terminé'? colors.vert:'orange', fontWeight: 'bold'}}
                                        deleteItem={() => {deleteOrder(item)}} endFacture={item.Contrats[0].status.toLowerCase() === 'terminé'}
                                        livraisonLabel='Status livraison' livraisonValue={item.statusLivraison}
                                        livraisonInitData={initData.livraisonData} changeLivraisonValue={(value) => saveLivraisonEdit({orderId: item.id, statusLivraison: value})}
                                       livraisonStyle={{color: item.statusLivraison.toLowerCase() === 'livré'?colors.vert:item.statusLivraison.toLowerCase() === 'partiel'?'orange':'grey',fontWeight: 'bold'}}
                                       solde={item.Facture.solde} goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}/>
                   )
               }
           }}/>
            </>
    );
}

export default UserOrderContratScreen;