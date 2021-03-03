import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";


import {
    getItemDetail, getOrdersByUser
} from "../store/slices/orderSlice";
import colors from "../utilities/colors";
import UserServiceItem from "../components/order/UserServiceItem";
import AppText from "../components/AppText";
import AppActivityIndicator from "../components/AppActivityIndicator";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import routes from "../navigation/routes";
import useOrderInfos from "../hooks/useOrderInfos";
import initData from "../utilities/initData";

function UserServiceContratScreen({navigation}) {
    const dispatch = useDispatch()
    const {getModePayement} = useOrderInfos()
    const {saveLivraisonEdit, moveOrderToHistory, deleteOrder} = useManageUserOrder()

    const isLoading = useSelector(state => state.entities.order.loading)
    const serviceRefresh = useSelector(state => state.entities.order.serviceRefreshCompter)
    const error = useSelector(state => state.entities.order.error)
    const user  = useSelector(state => state.auth.user)
    const userServicesData = useSelector(state => state.entities.order.listServices)
    const localServices = userServicesData.filter(item => item.Contrats.length>0 && !item.historique)





    useEffect(() => {
        if(serviceRefresh>0) {
            dispatch(getOrdersByUser())
        }
    }, [localServices])

    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour consulter vos services..'/>
    }


    if(error !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Impossible de consulter vos services.Une erreur est apparue...</AppText>
        </View>
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            {!isLoading && error === null && localServices.length > 0 && <FlatList data={localServices} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => {
                              return (
                                  <UserServiceItem serviceDescrip={item.CartItems[0].OrderItem.libelle} isHistorique={false} headerValue={item.numero}
                                                   moveItemToHistorique={() => moveOrderToHistory(item.id)} contrats={item.Contrats} itemMontant={item.montant} itemImage={item.CartItems[0].OrderItem.image}
                                                   getDetails={() => dispatch(getItemDetail(item))} showDetail={item.showDetails}
                                                   statusContratValue={item.Contrats[0].status} serviceLabel={item.CartItems[0].OrderItem.libelle}
                                                   dateDemande={item.dateCmde} dateFournitureFinal={item.dateLivraisonFinal}
                                                   dateFourniture={item.dateLivraisonDepart} solde={item.Facture.solde}
                                                   playItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'}
                                                   loopItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'} isContrat={true}
                                                  payement={getModePayement(item.id)} getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item.Facture)}
                                                    contratValueStyle={{color:item.Contrats[0].status.toLowerCase() === 'en cours'?'grey':item.Contrats[0].status.toLowerCase() === 'terminé'?colors.vert:'orange', fontWeight: 'bold'}}
                                                   deleteItem={() => deleteOrder(item)} endFacture={item.Contrats[0].status.toLowerCase() === 'terminé'}
                                                  livraisonData={initData.livraisonData}  livraisonValue={item.statusLivraison}
                                                  changeLivraisonValue={(value) => saveLivraisonEdit({orderId: item.id, statusLivraison: value})}
                                                 livraisonStyle={{color: item.statusLivraison.toLowerCase()==='livré'?colors.vert: item.statusLivraison.toLowerCase() === 'partiel'?'orange':'grey', fontWeight: 'bold'}}
                                                iconContainerStyle={{marginTop: 20}} goToItemDetails={() => navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}/>
                              )

                      }}/>}
            {!isLoading && error === null && localServices.length === 0 && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Vous n'avez aucun contrat de service en cours...</AppText>
            </View>}
        </>
    );
}

export default UserServiceContratScreen;