import React, {useState, useEffect} from 'react';
import {useStore, useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import AppText from "../components/AppText";
import FactureListItem from "../components/list/FactureListItem";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import {getItemDetail} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import dayjs from "dayjs";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import colors from "../utilities/colors";

function UserLocationHistoryScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const {deleteOrder} = useManageUserOrder()

    const locationHistory = useSelector(state => state.entities.order.currentUserOrders)
    const compter = useSelector(state => state.entities.order.historiqueCompter)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)

    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour voir votre historique..'/>
    }


    if(error === null && compter === 0) {
        return <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}
        }>
            <AppText>Vous n'avez pas de commandes dans votre historique</AppText>
        </View>
    }

    return (
        <FlatList data={locationHistory} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                      if (item.historique) {
                          return <FactureListItem label='commande' header='L' isHistorique={true} orderItems={item.cartItems}
                                     montant={item.montant} contrats={item.contrats} modePayement={getOrderPayementMode(store.getState())[item.id].payementMode}
                                     labelDate1='Commandé le:' labelDate2='Livré le: ' debut={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')}
                                      fin={dayjs(item.dateLivraisonFinal).format('DD/MM/YYYY HH:mm:ss')} labelDatePrevue='Livraison prevue le:'
                                      datePrevue={dayjs(item.dateLivraisonDepart).format('DD/MM/YYYY HH:mm:ss')}
                                     showDetail={item.showDetails} getDetails={() => dispatch(getItemDetail(item.id))}
                                     numero={item.numero} contratLabel='Status contrat' contratStatus={item.facture.solde < item.contrats[0].montant?'En cours':'Terminé'}
                                     labelStatusLivr='Status livraison' statusLivraison={item.statusLivraison} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                    linkTitle='Voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                    deleteItem={() => deleteOrder(item)} orderEspace='historique'
                                    labelAccord='Status accord' statusAccordValue={item.statusAccord} permitAccordEdit={false} permitLivraisonEdit={false}
                                   contratStatusStyle={{color: item.contrats[0].montant === item.facture.solde?colors.vert:"grey", fontWeight: 'bold'}}/>
                      }
                  }}/>
    );
}

export default UserLocationHistoryScreen;