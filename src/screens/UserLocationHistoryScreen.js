import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import AppText from "../components/AppText";
import FactureListItem from "../components/list/FactureListItem";
import {getItemDetail} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import colors from "../utilities/colors";
import initData from "../utilities/initData";
import useOrderInfos from "../hooks/useOrderInfos";

function UserLocationHistoryScreen({navigation}) {
    const dispatch = useDispatch()
    const {deleteOrder} = useManageUserOrder()
    const  {getModePayement} = useOrderInfos()

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
                                     montant={item.montant} contrats={item.Contrats} modePayement={getModePayement(item.id)}
                                     labelDateCmde='Commandé le:' labelDateLivraison='Livré le: ' dateCmde={item.dateCmde}
                                      dateLivraison={item.dateLivraisonFinal} labelDatePrevue='Livraison prevue le:'
                                      datePrevue={item.dateLivraisonDepart}
                                     showDetail={item.showDetails} getDetails={() => dispatch(getItemDetail(item.id))}
                                     numero={item.numero} contratLabel='Status contrat' contratStatus={item.Facture.solde < item.Contrats[0].montant?'En cours':'Terminé'}
                                     labelStatusLivr='Status livraison' statusLivraison={item.statusLivraison} fraisLivraison={item.fraisTransport} tauxInteret={item.interet}
                                    linkTitle='Voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                    deleteItem={() => deleteOrder(item)} orderEspace='historique'
                                    labelAccord='Status accord' statusAccordValue={item.statusAccord} permitAccordEdit={false} permitLivraisonEdit={false}
                                    contratStatusStyle={{color: item.Contrats[0].montant === item.Facture.solde?colors.vert:"grey", fontWeight: 'bold'}}
                                    accordInitData={initData.accordData} livraisonInitData={initData.livraisonData} livraisonValue={item.statusLivraison}
                                    livraisonLabel='Status livraison' goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}/>
                      }
                  }}/>
    );
}

export default UserLocationHistoryScreen;