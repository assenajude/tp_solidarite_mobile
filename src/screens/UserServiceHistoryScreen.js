import React from 'react';
import {View, FlatList, ScrollView} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector, useStore} from "react-redux";
import UserServiceItem from "../components/order/UserServiceItem";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import {getItemDetail} from "../store/slices/orderSlice";
import {color} from "react-native-reanimated";
import colors from "../utilities/colors";
import GetLogin from "../components/user/GetLogin";

function UserServiceHistoryScreen(props) {
    const store = useStore()
    const dispatch = useDispatch()
    const userServicesData = useSelector(state => state.entities.order.currentUserOrders)
    const compter = useSelector(state => state.entities.order.historiqueCompter)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)



    if(!user) {
        return <GetLogin message='Connectez vous pour voir votre historique..'/>
    }

    if(error === null && compter === 0) {
        return <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Votre historique est vide...</AppText>
        </View>
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
        <FlatList data={userServicesData} keyExtractor={(item, index) => index.toString()}
                 renderItem={({item}) => {
                     if(item.historique) {
                         return (
                             <UserServiceItem isHistorique={true} isDemande={false} header='S' headerValue={item.numero}
                                              itemImage={item.cartItems[0].image} statusAccordValue={item.statusAccord}
                                              dateDemande={item.dateCmde} serviceDescrip={item.cartItems[0].libelle}
                                              libStatusContrat='Status contrat' contrats={item.contrats} statusContratValue={item.contrats[0].montant === item.facture.solde?'Terminé':'aucun contrat'}
                                              accordValueStyle={{color: item.statusAccord.toLowerCase()=== 'accepté'?colors.vert:item.statusAccord.toLowerCase()==='refusé'?'red':'grey', fontWeight: 'bold'}}
                                              itemMontant={item.montant} showDetail={item.showDetails} payement={getOrderPayementMode(store.getState())[item.id].payementMode}
                                              showOrderDetail={() => dispatch(getItemDetail(item.id))} permitLivraisonEdit={false} permitAccordEdit={false}
                                             statusLivraisonLabel='Status livraison' statusLivraisonValue={item.statusLivraison}
                                            statusLivraisonStyle={{color: item.statusLivraison.toLowerCase() =='livré'?colors.vert:'grey', fontWeight: 'bold'}}
                                            contratValueStyle={{color: item.contrats[0].montant === item.facture.solde?colors.vert:'grey', fontWeight:'bold'}}/>
                         )
                     }
                 }}/>
    );
}

export default UserServiceHistoryScreen;