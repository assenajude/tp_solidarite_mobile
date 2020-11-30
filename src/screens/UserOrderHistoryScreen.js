import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import FactureListItem from "../components/list/FactureListItem";
import { getItemDetail} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import colors from "../utilities/colors";
import AppText from "../components/AppText";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import initData from "../utilities/initData";
import useOrderInfos from "../hooks/useOrderInfos";

function UserOrderHistoryScreen({navigation}) {
    const dispatch = useDispatch()
    const {deleteOrder} = useManageUserOrder()
    const {getModePayement} = useOrderInfos()

    const orderHistory = useSelector(state => state.entities.order.currentUserOrders)
    const error = useSelector(state => state.entities.order.error)
    const compter = useSelector(state => state.entities.order.historiqueCompter)
    const user = useSelector(state => state.auth.user)


    if(!user) {
        return <GetLogin message='Connectez vous pour voir votre historique'/>
    }

    if(error !== null) {
        return <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'}
        }>
            <AppText>Erreur...Impossible de consulter vos historiques.Veuilez reessayer plutard</AppText>
        </View>
    }

    if(error === null && compter === 0) {
        return <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Vous n'avez pas de commandes dans votre historique.</AppText>
        </View>
    }

    return (
        <>
            <FlatList data={orderHistory} keyExtractor={(item, index) => index.toString()}
               renderItem={({item}) => {
                   if(item.historique) {
                       return (
                           <FactureListItem label='commande' header='A' numero={item.numero} montant={item.montant} orderItems={item.CartItems} tauxInteret={item.interet} fraisLivraison={item.fraisTransport}
                                            showDetail={item.showDetails} modePayement={getModePayement(item.id)}
                                            getDetails={() => dispatch(getItemDetail(item.id))} dateCmde={item.dateCmde} datePrevue={item.dateLivraisonDepart}
                                            linkTitle='voir la facture' getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item)}
                                            labelDatePrevue='Date livraison prevue' dateLivraison={item.dateLivraisonFinal}
                                            labelDateCmde='Commandé le' labelDateLivraison='Livré le' labelStatusLivr='Status livraison' statusLivraison={item.statusLivraison}
                                            orderEspace='historique' labelAccord='Status accord' statusAccordValue={item.statusAccord}
                                            contrats={item.Contrats} deleteItem={() => {deleteOrder(item)}} isHistorique={true} permitLivraisonEdit={false} permitAccordEdit={false}
                                            contratLabel='Status contrat' contratStatus={item.Contrats[0]? item.Contrats[0].montant === item.Facture.solde?'Terminé':'En cours':'aucun contrat'}
                                            contratStatusStyle={{color: item.Contrats[0]? item.Contrats[0].montant === item.Facture.solde?colors.vert:'grey':'grey', fontSize: 15, fontWeight: 'bold'}}
                                            livraisonInitData={initData.livraisonData} accordInitData={initData.accordData} livraisonValue={item.statusLivraison}
                                            livraisonLabel='Status livraison' solde={item.Facture.solde}
                                            goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}/>
                       )
                   }
               }} />
            </>
    );
}

export default UserOrderHistoryScreen;