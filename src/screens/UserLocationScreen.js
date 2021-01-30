import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, FlatList} from "react-native";

import routes from "../navigation/routes";
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
import AppActivityIndicator from "../components/AppActivityIndicator";
import UserOrderItem from "../components/list/UserOrderItem";

function UserLocationScreen({navigation}) {
    const dispatch = useDispatch()
    const { saveAccordEdit, createOrderContrat, deleteOrder, moveOrderToHistory} = useManageUserOrder()
    const {getModePayement} = useOrderInfos()

    const userLocations = useSelector(state => state.entities.order.listLocations)
    const isLoading = useSelector(state => state.entities.order.loading)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const localLocationList = userLocations.filter(item => item.Contrats.length === 0 && !item.historique)



    useEffect(()=> {

    }, [localLocationList])

    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour voir vos demandes de locations.'/>
    }


    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
        {!isLoading && localLocationList.length> 0 && error === null && <FlatList data={localLocationList} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                          return (
                              <UserOrderItem numero={item.numero} montant={item.montant}
                                               getDetails={() => {
                                                   dispatch(getItemDetail(item))}} showDetail={item.showDetails}
                                               dateCmde={item.dateCmde}
                                               header='L' livraisonValue={item.statusLivraison}
                                               orderItems={item.CartItems} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                              dateLivraison={item.dateLivraisonFinal} datePrevue={item.dateLivraisonDepart}
                                               moveItemToHistory={() => moveOrderToHistory(item.id)}
                                               leaveItemToContract={() => createOrderContrat(item)} isDemande={true}
                                               modePayement={getModePayement(item.id)}
                                               deleteItem={() => deleteOrder(item)} typeCmde={item.typeCmde}
                                               statusAccordValue={item.statusAccord}
                                               accordInitData={initData.accordData} changeAccordEditValue={(value) => saveAccordEdit({orderId: item.id, statusAccord: value})}
                                               accordStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase() === 'refusé'?'red':'grey', fontWeight: 'bold'}}
                                               goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}
                                             isExpired={item.isExpired} currentOrder={item}/>
                          )

                  }}  />}
            {!isLoading && error === null && localLocationList.length === 0 && <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: 'center'}
            }>
                <AppText>Vous n'avez pas de demandes de location en cours</AppText>
                <AppButton title='Commander maintenant' onPress={() => navigation.navigate('E-location')}/>
            </View>}
                  </>
    );
}

export default UserLocationScreen;