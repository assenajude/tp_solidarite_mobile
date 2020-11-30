import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import {
    getCurrentOrders,
    getItemDetail, getOrdersByUser,
} from "../store/slices/orderSlice";
import FactureListItem from "../components/list/FactureListItem";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";
import useManageUserOrder from "../hooks/useManageUserOrder";
import colors from "../utilities/colors";
import GetLogin from "../components/user/GetLogin";
import initData from "../utilities/initData";

function UserLocationContratScreeen({navigation}) {
    const dispatch = useDispatch()
    const { saveLivraisonEdit, moveOrderToHistory, deleteOrder} = useManageUserOrder()

    const compter = useSelector(state => state.entities.order.contratCompter)
    const isLoading = useSelector(state => state.entities.order.loading)
    const locationDatas = useSelector(state => state.entities.order.currentUserOrders)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const refreshCompter = useSelector(state => state.entities.order.locationRefreshCompter)


    const getStarted = useCallback(async () => {
        await dispatch(getOrdersByUser())
    }, [])


    useEffect(() => {
      if(refreshCompter > 0) {
          getStarted()
      }

      dispatch(getCurrentOrders('e-location'))

    }, [])



    if (!user) {
        return <GetLogin message='Vous devez vous connecter pour consulter vos locations'/>
    }

    if(error === null && compter === 0 && !isLoading) {
        return <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'}
        }>
            <AppText>Vous n'avez pas de contrat de location en cours...</AppText>
        </View>
    }

    if(error !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Impossible de consulter vos locations.Une erreur est apparue..</AppText>
        </View>
    }



    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <FlatList data={locationDatas} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => {
                          if (item.Contrats && item.Contrats.length >=1 && !item.historique) {
                              return (
                                  <FactureListItem label='commande' isContrat={true} orderItems={item.CartItems} header='L'
                                                   dateCmde={item.dateCmde} dateLivraison={item.dateLivraisonFinal} contrats={item.Contrats} labelDateCmde='commandé le'
                                                   labelDateLivraison='Clef remis le ' montant={item.montant} numero={item.numero} showDetail={item.showDetails}
                                                   getDetails={() => dispatch(getItemDetail(item.id))} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                                   labelDatePrevue='Date remise clef prevue' datePrevue={item.dateLivraisonDepart}
                                                   linkTitle='Voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                                   contratLabel='Status contrat' contratStatus={item.Contrats[0].status}
                                                   contratStatusStyle={{fontSize: 15, color: item.Contrats[0].status.toLowerCase() === 'en cours'?'grey':item.Contrats[0].status.toLowerCase() === 'terminé'?colors.vert:'orange', fontWeight: 'bold'}}
                                                   loopItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'}
                                                   playItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'}
                                                   deleteItem={() => deleteOrder(item)} moveItemToHistory={() => moveOrderToHistory(item.id)}
                                                   endFacture={item.Contrats[0].status.toLowerCase() === 'terminé'}
                                                   livraisonLabel='Status livraison' livraisonValue={item.statusLivraison} livraisonInitData={initData.livraisonData}
                                                   changeLivraisonValue={(value) => saveLivraisonEdit({orderId: item.id, statusLivraison: value})}
                                                   livraisonStyle={{color: item.statusLivraison.toLowerCase() === 'livré'?colors.vert:item.statusLivraison.toLowerCase()=== 'partiel'?'orannge':'grey', fontWeight: 'bold'}}
                                                   goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}
                                                    solde={item.Facture.solde}/>
                              )
                          }
                      }}/>
           </>
    )
}

export default UserLocationContratScreeen;