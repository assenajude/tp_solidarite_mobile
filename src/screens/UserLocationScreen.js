import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, FlatList, ScrollView, ActivityIndicator, Alert} from "react-native";

import routes from "../navigation/routes";
import FactureListItem from "../components/list/FactureListItem";
import {
    getItemDetail,
} from "../store/slices/orderSlice";
import dayjs from "dayjs";
import useManageUserOrder from "../hooks/useManageUserOrder";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import AppText from "../components/AppText";
import {Appbar} from "react-native-paper";
import AppButton from "../components/AppButton";
import GetLogin from "../components/user/GetLogin";

function UserLocationScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const {startEditingAccord, saveAccordEdit, createOrderContrat, deleteOrder, moveOrderToHistory} = useManageUserOrder()


    const userLocations = useSelector(state => state.entities.order.currentUserOrders)
    const compter = useSelector(state => state.entities.order.demandeCompter)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const [accordEdit, setAccordEdit] = useState('editer le status...')



    useEffect(() => {
    }, [])


    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour voir vos demandes de locations.'/>
    }

    if (error === null && compter === 0) {
        return <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'}
        }>
            <AppText>Vous n'avez pas de demandes de location en cours</AppText>
            <AppButton title='Commander maintenant' onPress={() => navigation.navigate('E-location')}/>
        </View>
    }

    return (
        <FlatList data={userLocations} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                      if (!item.contrats || item.contrats.length === 0 && !item.historique) {
                          return (
                              <FactureListItem numero={item.numero} montant={item.montant} label='commande'
                                               getDetails={() => {
                                                   dispatch(getItemDetail(item.id))}} showDetail={item.showDetails}
                                               getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                               debut={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}
                                               header='L'
                                               linkTitle='Voir la facrture' orderItems={item.cartItems} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                               labelDate1='Commandé le' labelDate2='Livré le ' fin={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                                               orderEspace='demande' labelAccord='Status accord' statusAccordValue={item.statusAccord}
                                               labelDatePrevue='Date remise des clefs:' datePrevue={dayjs(item.dateLivraisonDepart).format('DD/MM/YYYY HH:mm:ss')}
                                               editStatusAccord={item.editAccord} accordEditingValue={accordEdit} changeAccordEditValue={(value, item) => setAccordEdit(value)}
                                               getAccordStatusEdit={() => startEditingAccord(item.id)} undoAccordEdit={() => startEditingAccord(item.id)}
                                               saveAccordEditing={() => saveAccordEdit({orderId: item.id, statusAccord: accordEdit})} moveItemToHistory={() => moveOrderToHistory(item.id)}
                                               leaveItemToContract={() => createOrderContrat(item)} isDemande={true}
                                               modePayement={getOrderPayementMode(store.getState())[item.id].payementMode}
                                               deleteItem={() => deleteOrder(item)}/>
                          )
                      }
                  }}  />
    );
}

export default UserLocationScreen;