import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, FlatList} from "react-native";

import {getItemDetail} from '../store/slices/orderSlice'
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import colors from "../utilities/colors";
import initData from "../utilities/initData";
import useOrderInfos from "../hooks/useOrderInfos";

function UserOrderScreen({navigation}) {
    const dispatch  = useDispatch()
    const {saveAccordEdit, createOrderContrat, moveOrderToHistory} = useManageUserOrder()
    const {getModePayement} = useOrderInfos()



    const userOrders = useSelector(state => state.entities.order.currentUserOrders)
    const compter = useSelector(state => state.entities.order.demandeCompter)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)


    useEffect(() => {
    }, [])

    if(!user) {
        return <GetLogin message='Connectez vous pour consulter vos demandes'/>
    }


    if(error !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Erreur...Impossible de consulter vos demandes.Veuillez reessayer plutard.</AppText>
        </View>
    }

    if(error === null && compter === 0) {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <AppText>Vous n'avez aucune demande en cours..</AppText>
            <AppButton title='Commander maintenant' onPress={() => navigation.navigate('E-commerce')}/>

        </View>
    }


    return (
       <FlatList data={userOrders} keyExtractor={(item, index) => index.toString()}
       renderItem={({item}) => {
           if(item.Contrats && item.Contrats.length === 0 && !item.historique) {
               return (
                   <FactureListItem numero={item.numero} montant={item.montant} label='commande'
                                    getDetails={() => dispatch(getItemDetail(item.id))} showDetail={item.showDetails} getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                    dateCmde={item.dateCmde}  header='A'
                                    linkTitle='Voir la facrture' orderItems={item.CartItems} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                    labelDateCmde='Commandé le' labelDateLivraison='Livré le ' dateLivraison={item.dateLivraisonFinal}
                                    labelDatePrevue='Date livraison prevue'
                                    orderEspace='demande' moveItemToHistory={() =>{moveOrderToHistory(item.id)}}
                                    leaveItemToContract={() => {createOrderContrat(item)}}
                                    isDemande={true} datePrevue={item.dateLivraisonDepart}
                                    modePayement={getModePayement(item.id)}
                                    labelAccord='Status accord' statusAccordValue={item.statusAccord} accordInitData={initData.accordData}
                                    changeAccordEditValue={(value) => {
                                        saveAccordEdit({orderId: item.id, statusAccord: value})
                                    }} accordStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase() === 'refusé'?'red':'grey', fontWeight: 'bold'}}
                                   goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}/>
               )
           }
       }}/>
    );
}

export default UserOrderScreen;