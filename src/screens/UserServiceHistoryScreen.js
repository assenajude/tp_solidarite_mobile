import React, {useEffect} from 'react';
import {View, FlatList} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector } from "react-redux";
import UserServiceItem from "../components/order/UserServiceItem";
import {getItemDetail} from "../store/slices/orderSlice";
import colors from "../utilities/colors";
import GetLogin from "../components/user/GetLogin";
import initData from "../utilities/initData";
import routes from "../navigation/routes";
import useOrderInfos from "../hooks/useOrderInfos";
import useManageUserOrder from "../hooks/useManageUserOrder";

function UserServiceHistoryScreen({navigation}) {
    const {getModePayement} = useOrderInfos()
    const {deleteOrder} = useManageUserOrder()
    const dispatch = useDispatch()
    const userServicesData = useSelector(state => state.entities.order.listServices)
    const error = useSelector(state => state.entities.order.error)
    const isLoading = useSelector(state => state.entities.order.loading)
    const user = useSelector(state => state.auth.user)
    const localHistoriqueServices = userServicesData.filter(item => item.historique === true)


    if(!user) {
        return <GetLogin message='Connectez vous pour voir votre historique..'/>
    }

    if (error !== null) {
        return <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <AppText>Impossible de consulter votre historique. Une erreur est apparue..</AppText>
        </View>
    }

    return (
        <>
        {!isLoading && error === null && localHistoriqueServices.length > 0 && <FlatList data={localHistoriqueServices} keyExtractor={(item, index) => index.toString()}
                 renderItem={({item}) => {
                         return (
                             <UserServiceItem  isHistorique={true} isDemande={false} headerValue={item.numero}
                                              itemImage={item.CartItems[0].OrderItem.image} statusAccordValue={item.statusAccord}
                                              dateDemande={item.dateCmde} serviceDescrip={item.CartItems[0].OrderItem.libelle}
                                              dateFourniture={item.dateLivraisonDepart} dateFournitureFinal={item.dateLivraisonFinal} contrats={item.Contrats} statusContratValue={item.Contrats[0].montant === item.Facture.solde?'Terminé':'aucun contrat'}
                                              accordValueStyle={{color: item.statusAccord.toLowerCase()=== 'accepté'?colors.vert:item.statusAccord.toLowerCase()==='refusé'?'red':'grey', fontWeight: 'bold'}}
                                              itemMontant={item.montant} showDetail={item.showDetails} payement={getModePayement(item.id)}
                                              getDetails={() => dispatch(getItemDetail(item))} permitLivraisonEdit={false} permitAccordEdit={false} statusLivraisonValue={item.statusLivraison}
                                            statusLivraisonStyle={{color: item.statusLivraison.toLowerCase() =='livré'?colors.vert:'grey', fontWeight: 'bold'}}
                                            contratValueStyle={{color: item.Contrats[0].montant === item.Facture.solde?colors.vert:'grey', fontWeight:'bold'}}
                                           accordInitdata={initData.accordData} livraisonData={initData.livraisonData}
                                              goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}
                                              serviceLabel={item.CartItems[0].OrderItem.libelle} deleteItem={() => deleteOrder(item)} />
                         )
                 }}/>}
            {!isLoading && error === null && localHistoriqueServices.length === 0 && <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Votre historique est vide...</AppText>
            </View>}
                 </>
    );
}

export default UserServiceHistoryScreen;