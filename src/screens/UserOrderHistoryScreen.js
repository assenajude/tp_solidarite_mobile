import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {View, FlatList, Alert, ScrollView} from "react-native";
import dayjs from "dayjs";
import FactureListItem from "../components/list/FactureListItem";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import {getItemDetail, getOrderDeleted} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import order from "../models/order";

function UserOrderHistoryScreen(props) {
    const dispatch = useDispatch()
    const store = useStore()
    const orderHistory = useSelector(state => state.entities.order.currentUserOrders)

    const handleDeleteOrder = (order) => {
        Alert.alert('Attention!', 'Voulez-vous supprimer definitivement cette commande?', [
            {text: 'oui', onPress: () => {
                dispatch(getOrderDeleted(order))
                }},
            {text: 'non', onPress: () => {return;}}
        ])
    }


    return (
        <>
            <ScrollView>
                {orderHistory.map((item, index) => {
                    if(item.historique) {
                        return (
                            <FactureListItem key={index.toString()} label='commande' header='CMD N°' numero={item.numero} montant={item.montant} orderItems={item.cartItems} tauxInteret={item.interet} fraisLivraison={item.fraisTransport}
                                             showDetail={item.showDetails}
                                             getDetails={() => dispatch(getItemDetail(item.id))} debut={item.dateCmde} datePrevue={item.dateLivraisonDepart}
                                             linkTitle='voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                             labelDatePrevue='Date livraison prevue' fin={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                                             labelDate1='Commandé le' labelDate2='Livré le' labelStatusLivr='Status livraison' statusLivraison={item.statusLivraison}
                                             orderEspace='historique' labelAccord='Status accord' statusAccordValue={item.statusAccord}
                                             contrats={item.contrats} statusLivraisonValue={item.statusLivraison}
                                             deleteItem={() => handleDeleteOrder(item)}/>
                        )
                    }
                })}
            </ScrollView>
            </>
       /* <FlatList data={orderHistory} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                      if(item.historique) {
                          return (
                           <FactureListItem label='commande' header='CMD N°' numero={item.numero} montant={item.montant} orderItems={item.cartItems} tauxInteret={item.interet} fraisLivraison={item.fraisTransport}
                              showDetail={item.showDetails}
                              getDetails={() => dispatch(getItemDetail(item.id))} debut={item.dateCmde} datePrevue={item.dateLivraisonDepart}
                               linkTitle='voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                              labelDatePrevue='Date livraison prevue' fin={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                              labelDate1='Commandé le' labelDate2='Livré le' labelStatusLivr='Status livraison' statusLivraison={item.statusLivraison}
                              orderEspace='historique' labelAccord='Status accord' statusAccordValue={item.statusAccord}
                              contrats={item.contrats} statusLivraisonValue={item.statusLivraison}
                              deleteItem={() => handleDeleteOrder(item)}/>
                          )
                      }
                  }}/>*/
    );
}

export default UserOrderHistoryScreen;