import React, { useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import { getItemDetail} from "../store/slices/orderSlice";
import routes from "../navigation/routes";
import colors from "../utilities/colors";
import AppText from "../components/AppText";
import useManageUserOrder from "../hooks/useManageUserOrder";
import GetLogin from "../components/user/GetLogin";
import initData from "../utilities/initData";
import useOrderInfos from "../hooks/useOrderInfos";
import UserOrderItem from "../components/list/UserOrderItem";
import AppActivityIndicator from "../components/AppActivityIndicator";

function UserOrderHistoryScreen({navigation}) {
    const dispatch = useDispatch()
    const {deleteOrder} = useManageUserOrder()
    const {getModePayement} = useOrderInfos()

    const orderHistoryArticle = useSelector(state => state.entities.order.listArticles)
    const error = useSelector(state => state.entities.order.error)
    const loading = useSelector(state => state.entities.order.loading)
    const user = useSelector(state => state.auth.user)
    let localHistoryList = orderHistoryArticle.filter(item => item.historique === true)


    useEffect(() => {
    },[localHistoryList])

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


    return (
        <>
            <AppActivityIndicator visible={loading}/>
            {error === null && localHistoryList.length > 0 && !loading && <FlatList data={localHistoryList} keyExtractor={(item, index) => item.id.toString()}
               renderItem={({item}) => {
                       return (
                           <UserOrderItem header='A' numero={item.numero} montant={item.montant} orderItems={item.CartItems} tauxInteret={item.interet} fraisLivraison={item.fraisTransport}
                                            showDetail={item.showDetails} modePayement={getModePayement(item.id)}
                                            getDetails={() => dispatch(getItemDetail(item))} dateCmde={item.dateCmde} datePrevue={item.dateLivraisonDepart}
                                             getLink={() => navigation.navigate(routes.FACTURE_DETAILS, item.Facture)}
                                            dateLivraison={item.dateLivraisonFinal} statusLivraison={item.statusLivraison} statusAccordValue={item.statusAccord}
                                            contrats={item.Contrats} deleteItem={() => deleteOrder(item)} isHistorique={true}
                                            contratStatus={item.Contrats[0]? item.Contrats[0].montant === item.Facture.solde?'Terminé':'En cours':'aucun contrat'}
                                            contratStatusStyle={{color: item.Contrats[0]? item.Contrats[0].montant === item.Facture.solde?colors.vert:'grey':'grey', fontSize: 15, fontWeight: 'bold'}}
                                            livraisonInitData={initData.livraisonData} accordInitData={initData.accordData} livraisonValue={item.statusLivraison}
                                             solde={item.Facture.solde}
                                            goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}/>
                       )
               }} />}
            {error === null && localHistoryList.length === 0 && !loading && <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Vous n'avez pas de commandes dans votre historique.</AppText>
            </View>}
            </>
    );
}

export default UserOrderHistoryScreen;