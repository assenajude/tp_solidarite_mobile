import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import AppText from "../components/AppText";
import {getItemDetail} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import colors from "../utilities/colors";
import initData from "../utilities/initData";
import useOrderInfos from "../hooks/useOrderInfos";
import UserOrderItem from "../components/list/UserOrderItem";

function UserLocationHistoryScreen({navigation}) {
    const dispatch = useDispatch()
    const {deleteOrder} = useManageUserOrder()
    const  {getModePayement} = useOrderInfos()

    const locationHistory = useSelector(state => state.entities.order.listLocations)
    const error = useSelector(state => state.entities.order.error)
    const isLoading = useSelector(state => state.entities.order.loading)
    const user = useSelector(state => state.auth.user)
    const localHistoriqueList = locationHistory.filter(item => item.historique === true)

    useEffect(() => {

    }, [localHistoriqueList])

    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour voir votre historique..'/>
    }



    return (
        <>
        {!isLoading && error === null && localHistoriqueList.length> 0 && <FlatList data={localHistoriqueList} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                          return <UserOrderItem header='L' isHistorique={true} orderItems={item.CartItems}
                                     montant={item.montant} contrats={item.Contrats} modePayement={getModePayement(item.id)}
                                     dateCmde={item.dateCmde} dateLivraison={item.dateLivraisonFinal}
                                      datePrevue={item.dateLivraisonDepart} typeCmde={item.typeCmde}
                                     showDetail={item.showDetails} getDetails={() => dispatch(getItemDetail(item))}
                                     numero={item.numero} contratStatus={item.Facture.solde < item.Contrats[0].montant?'En cours':'Terminé'}
                                    statusLivraison={item.statusLivraison} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                    getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item.Facture)} deleteItem={() => deleteOrder(item)}
                                    statusAccordValue={item.statusAccord} permitAccordEdit={false} permitLivraisonEdit={false}
                                    contratStatusStyle={{color: item.Contrats[0].montant === item.Facture.solde?colors.vert:"grey", fontWeight: 'bold'}}
                                    accordInitData={initData.accordData} livraisonInitData={initData.livraisonData} livraisonValue={item.statusLivraison}
                                   goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}
                                    solde={item.Facture.solde}/>
                  }}/>}
            {!isLoading && error === null && localHistoriqueList.length === 0 && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'}
            }>
                <AppText>Vous n'avez pas de commandes dans votre historique</AppText>
            </View> }
                  </>

    );
}

export default UserLocationHistoryScreen;