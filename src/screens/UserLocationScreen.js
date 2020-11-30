import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, FlatList} from "react-native";

import routes from "../navigation/routes";
import FactureListItem from "../components/list/FactureListItem";
import {
    getItemDetail,
} from "../store/slices/orderSlice";
import useManageUserOrder from "../hooks/useManageUserOrder";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import GetLogin from "../components/user/GetLogin";
import colors from "../utilities/colors";
import useOrderInfos from "../hooks/useOrderInfos";
import initData from "../utilities/initData";

function UserLocationScreen({navigation}) {
    const dispatch = useDispatch()
    const { saveAccordEdit, createOrderContrat, deleteOrder, moveOrderToHistory} = useManageUserOrder()
    const {getModePayement} = useOrderInfos()

    const userLocations = useSelector(state => state.entities.order.currentUserOrders)
    const compter = useSelector(state => state.entities.order.demandeCompter)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)



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
                      if (!item.Contrats || item.Contrats.length === 0 && !item.historique) {
                          return (
                              <FactureListItem numero={item.numero} montant={item.montant} label='commande'
                                               getDetails={() => {
                                                   dispatch(getItemDetail(item.id))}} showDetail={item.showDetails}
                                               getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                               dateCmde={item.dateCmde}
                                               header='L' livraisonValue={item.statusLivraison}
                                               linkTitle='Voir la facrture' orderItems={item.CartItems} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                               labelDateCmde='Commandé le' labelDateLivraison='Livré le ' dateLivraison={item.dateLivraisonFinal}
                                               orderEspace='demande'
                                               labelDatePrevue='Date remise des clefs:' datePrevue={item.dateLivraisonDepart}
                                               moveItemToHistory={() => moveOrderToHistory(item.id)}
                                               leaveItemToContract={() => createOrderContrat(item)} isDemande={true}
                                               modePayement={getModePayement(item.id)}
                                               deleteItem={() => deleteOrder(item)}
                                                labelAccord='Status accord' statusAccordValue={item.statusAccord}
                                               accordInitData={initData.accordData} changeAccordEditValue={(value) => saveAccordEdit({orderId: item.id, statusAccord: value})}
                                               accordStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase() === 'refusé'?'red':'grey', fontWeight: 'bold'}}
                                               goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}/>
                          )
                      }
                  }}  />
    );
}

export default UserLocationScreen;