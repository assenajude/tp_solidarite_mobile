import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {View, FlatList, Alert, ScrollView} from "react-native";
import dayjs from "dayjs";
import FactureListItem from "../components/list/FactureListItem";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import {decrementOrderCompter, getItemDetail, getOrderDeleted} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import order from "../models/order";
import colors from "../utilities/colors";
import AppText from "../components/AppText";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";

function UserOrderHistoryScreen(props) {
    const dispatch = useDispatch()
    const store = useStore()
    const {deleteOrder} = useManageUserOrder()

    const orderHistory = useSelector(state => state.entities.order.currentUserOrders)
    const error = useSelector(state => state.entities.order.error)
    const compter = useSelector(state => state.entities.order.historiqueCompter)
    const user = useSelector(state => state.auth.user)

    if(!user) {
        return <GetLogin message='Connectez vous pour voir votre historique'/>
    }

    if(error !== null) {
        return <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'}
        }>
            <AppText>Erreur...Impossible de consulter vos historiques.Veuilez reessayer plutard</AppText>
        </View>
    }

    if(error === null && compter === 0) {
        return <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Vous n'avez pas de commandes dans votre historique.</AppText>
        </View>
    }

    return (
        <>
            <FlatList data={orderHistory} keyExtractor={(item, index) => index.toString()}
               renderItem={({item}) => {
                   if(item.historique) {
                       return (
                           <FactureListItem label='commande' header='A' numero={item.numero} montant={item.montant} orderItems={item.cartItems} tauxInteret={item.interet} fraisLivraison={item.fraisTransport}
                                            showDetail={item.showDetails} modePayement={getOrderPayementMode(store.getState())[item.id].payementMode}
                                            getDetails={() => dispatch(getItemDetail(item.id))} debut={item.dateCmde} datePrevue={item.dateLivraisonDepart}
                                            linkTitle='voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                            labelDatePrevue='Date livraison prevue' fin={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                                            labelDate1='Commandé le' labelDate2='Livré le' labelStatusLivr='Status livraison' statusLivraison={item.statusLivraison}
                                            orderEspace='historique' labelAccord='Status accord' statusAccordValue={item.statusAccord}
                                            contrats={item.contrats} statusLivraisonValue={item.statusLivraison}
                                            deleteItem={() => {deleteOrder(item)}} isHistorique={true} permitLivraisonEdit={false} permitAccordEdit={false}
                                            contratLabel='Status contrat' contratStatus={item.contrats[0]? item.contrats[0].montant === item.facture.solde?'Terminé':'En cours':'aucun contrat'}
                                            contratStatusStyle={{color: item.contrats[0]? item.contrats[0].montant === item.facture.solde?colors.vert:'grey':'grey', fontSize: 15, fontWeight: 'bold'}}
                           />
                       )
                   }
               }}/>
            </>
    );
}

export default UserOrderHistoryScreen;