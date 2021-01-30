import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";

import {
    getItemDetail, getOrdersByUser
} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import initData from '../utilities/initData'
import UserOrderItem from "../components/list/UserOrderItem";
import useOrderInfos from "../hooks/useOrderInfos";


function UserOrderContratScreen({navigation}) {
    const dispatch = useDispatch()
    const { saveLivraisonEdit, moveOrderToHistory, deleteOrder} = useManageUserOrder()
    const {getModePayement} = useOrderInfos()

    const isLoading = useSelector(state => state.entities.order.loading)
    const listArticleContrat = useSelector(state => state.entities.order.listArticles)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const orderRefreshCompter = useSelector(state => state.entities.order.articleRefreshCompter)
    const [updateCompter, setUpdateCompter] = useState(0)
    const localContratList = listArticleContrat.filter(item => item.Contrats.length>0 && !item.historique)




    useEffect(() => {
        if(orderRefreshCompter>0) {
            dispatch(getOrdersByUser())
        }
    }, [localContratList])

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


    return (
        <>
        <AppActivityIndicator visible={isLoading}/>
       {localContratList.length > 0 && !isLoading && error === null && <FlatList data={localContratList} keyExtractor={(item, index) => item.id.toString()}
           renderItem={({item}) =>
               <UserOrderItem numero={item.numero}  orderItems={item.CartItems} montant={item.montant}
                                        getDetails={() => {dispatch(getItemDetail(item))}} showDetail={item.showDetails}
                                        getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item.Facture)} dateCmde={item.dateCmde}
                                        modePayement={getModePayement(item.id)} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                        dateLivraison={item.dateLivraisonFinal} datePrevue={item.dateLivraisonDepart}  header='A'
                                        moveItemToHistory={() => {moveOrderToHistory(item.id)}} contrats={item.Contrats}
                                        isContrat={true} playItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'}
                                        loopItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'} contratStatus={item.Contrats[0].status}
                                        contratStatusStyle={{fontSize: 15, color:item.Contrats[0].status.toLowerCase() === 'en cours'?'grey':item.Contrats[0].status.toLowerCase() === 'terminé'? colors.vert:'orange', fontWeight: 'bold'}}
                                        deleteItem={() => deleteOrder(item)} endFacture={item.montant === item.solde}
                                         livraisonValue={item.statusLivraison} showDeleteIcon={item.montant === item.Facture.solde}
                                        livraisonInitData={initData.livraisonData} changeLivraisonValue={(value) => {
                                            setUpdateCompter(updateCompter+1)
                                            saveLivraisonEdit({orderId: item.id, statusLivraison: value})
                                        }}
                                       livraisonStyle={{color: item.statusLivraison.toLowerCase() === 'livré'?colors.vert:item.statusLivraison.toLowerCase() === 'partiel'?'orange':'grey',fontWeight: 'bold'}}
                                       solde={item.Facture.solde} goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}/>
           }/>}
            {localContratList.length === 0 && !isLoading && error === null &&
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Vous n'avez pas de contrats de commande en cours...</AppText>
            </View> }
            </>
    );
}

export default UserOrderContratScreen;