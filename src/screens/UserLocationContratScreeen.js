import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import {
    getItemDetail, getOrdersByUser,
} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";
import useManageUserOrder from "../hooks/useManageUserOrder";
import colors from "../utilities/colors";
import GetLogin from "../components/user/GetLogin";
import initData from "../utilities/initData";
import UserOrderItem from "../components/list/UserOrderItem";
import useOrderInfos from "../hooks/useOrderInfos";

function UserLocationContratScreeen({navigation}) {
    const dispatch = useDispatch()
    const {getModePayement} = useOrderInfos()
    const { saveLivraisonEdit, moveOrderToHistory, deleteOrder} = useManageUserOrder()

    const isLoading = useSelector(state => state.entities.order.loading)
    const locationRefreshCompter = useSelector(state => state.entities.order.locationRefreshCompter)
    const locationDatas = useSelector(state => state.entities.order.listLocations)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const localList = locationDatas.filter(item => item.Contrats.length>0 && !item.historique)



    useEffect(() => {
        if(locationRefreshCompter>0) {
             dispatch(getOrdersByUser())
        }
    }, [localList])



    if (!user) {
        return <GetLogin message='Vous devez vous connecter pour consulter vos locations'/>
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
            {!isLoading && error === null && localList.length> 0 && <FlatList data={localList} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => {
                              return (
                                  <UserOrderItem  isContrat={true} orderItems={item.CartItems} header='L'
                                                   dateCmde={item.dateCmde} dateLivraison={item.dateLivraisonFinal} contrats={item.Contrats}
                                                    montant={item.montant} numero={item.numero} showDetail={item.showDetails}
                                                   getDetails={() => dispatch(getItemDetail(item))} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                                   datePrevue={item.dateLivraisonDepart} getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item.Facture)}
                                                   contratStatus={item.Contrats[0].status} endFacture={item.montant === item.solde}
                                                   contratStatusStyle={{fontSize: 15, color: item.Contrats[0].status.toLowerCase() === 'en cours'?'grey':item.Contrats[0].status.toLowerCase() === 'terminé'?colors.vert:'orange', fontWeight: 'bold'}}
                                                   loopItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'}
                                                   playItemWatch={item.Contrats[0].status.toLowerCase() === 'en cours'}
                                                   deleteItem={() => deleteOrder(item)} moveItemToHistory={() => moveOrderToHistory(item.id)}
                                                    livraisonValue={item.statusLivraison} livraisonInitData={initData.livraisonData}
                                                   changeLivraisonValue={(value) => saveLivraisonEdit({orderId: item.id, statusLivraison: value})}
                                                   livraisonStyle={{color: item.statusLivraison.toLowerCase() === 'livré'?colors.vert:item.statusLivraison.toLowerCase()=== 'partiel'?'orannge':'grey', fontWeight: 'bold'}}
                                                   goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}
                                                    solde={item.Facture.solde} modePayement={getModePayement(item.id)}
                                                  showDeleteIcon={item.montant === item.Facture.solde} typeCmde={item.typeCmde}/>
                              )

                      }}/>}
            {!isLoading && error === null && localList.length === 0 && <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'}
            }>
                <AppText>Vous n'avez pas de contrat de location en cours...</AppText>
            </View>}
           </>
    )
}

export default UserLocationContratScreeen;