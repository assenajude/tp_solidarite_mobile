import React, {useEffect, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, FlatList} from "react-native";

import {getItemDetail, getOrdersByUser} from '../store/slices/orderSlice'
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import colors from "../utilities/colors";
import initData from "../utilities/initData";
import useOrderInfos from "../hooks/useOrderInfos";
import AppActivityIndicator from "../components/AppActivityIndicator";
import UserOrderItem from "../components/list/UserOrderItem";
import {getUserCompterReset} from "../store/slices/userProfileSlice";

function UserOrderScreen({navigation}) {
    const dispatch  = useDispatch()
    const store = useStore()
    const {saveAccordEdit, createOrderContrat, moveOrderToHistory, deleteOrder} = useManageUserOrder()
    const {getModePayement} = useOrderInfos()

    const connectedUser = useSelector(state => state.profile.connectedUser)
    const userArticleDemande = useSelector(state => state.entities.order.listArticles)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.entities.order.loading)
    const localDemandeList = userArticleDemande.filter(item => item.Contrats.length === 0 && !item.historique)

    const getOrderStarted = useCallback(async () => {
        if(connectedUser.articleCompter > 0) {
            await dispatch(getOrdersByUser())
            const error = store.getState().entities.order.error
            if(error !== null) return;
            dispatch(getUserCompterReset({userId: user.id, articleCompter: true}))
        }
    }, [])



    useEffect(() => {
        getOrderStarted()
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



    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
           {localDemandeList.length > 0 && error === null && !isLoading && <FlatList data={localDemandeList} keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
           <UserOrderItem header='A' numero={item.numero} isDemande={true} montant={item.montant} orderItems={item.CartItems}
                          modePayement={getModePayement(item.id)} statusAccordValue={item.statusAccord} accordInitData={initData.accordData}
                          changeAccordEditValue={(value) => {
                              saveAccordEdit({orderId: item.id, statusAccord: value})
                          }}
                          accordStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase() === 'refusé'?'red':'grey', fontWeight: 'bold'}}
                          goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}
                          getDetails={() => dispatch(getItemDetail(item))} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                          dateCmde={item.dateCmde} showDetail={item.showDetails} datePrevue={item.dateLivraisonDepart} dateLivraison={item.dateLivraisonFinal}
                          moveItemToHistory={() =>{moveOrderToHistory(item.id)}} leaveItemToContract={() => {
                              createOrderContrat(item)
                          }}
                          deleteItem={() => deleteOrder(item)} isExpired={item.isExpired} expireIn={item.expireIn}/>
       }/>}
            {localDemandeList.length === 0 && !isLoading && error === null && <View style={{
                flex: 1, justifyContent: 'center', alignItems: 'center',
            }}>
                <AppText>Vous n'avez aucune demande en cours..</AppText>
                <AppButton title='Commander maintenant' onPress={() => navigation.navigate('E-commerce')}/>
            </View>}
       </>
    );
}

export default UserOrderScreen;