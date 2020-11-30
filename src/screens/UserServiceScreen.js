import React, { useEffect} from 'react';
import {useDispatch, useStore, useSelector} from "react-redux";
import {useFocusEffect} from '@react-navigation/native'
import {View, FlatList,BackHandler} from "react-native";
import dayjs from "dayjs";
import AppText from "../components/AppText";
import UserServiceItem from "../components/order/UserServiceItem";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import {
    getItemDetail,
} from "../store/slices/orderSlice";
import colors from "../utilities/colors";
import routes from "../navigation/routes";
import useManageUserOrder from "../hooks/useManageUserOrder";
import AppButton from "../components/AppButton";
import GetLogin from "../components/user/GetLogin";

function UserServiceScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const { saveAccordEdit, createOrderContrat, moveOrderToHistory, deleteOrder}  = useManageUserOrder()


    const compter = useSelector(state => state.entities.order.demandeCompter)
    const error = useSelector(state => state.entities.order.error)
    const userServices = useSelector(state => state.entities.order.currentUserOrders)
    const user = useSelector(state => state.auth.user)


    const goToAccueil = () => {
        navigation.navigate(routes.ACCUEIL)
    }

    useFocusEffect( () => {
        BackHandler.addEventListener('hardwareBackPress', goToAccueil)
        }
    )

    const dataAccord = ['Traitement en cours', 'Accepté', 'Refusé']

    useEffect(() => {
    }, [])

    if(!user) {
        return <GetLogin message='Connectez vous pour consulter vos demandes'/>
    }

    if(error !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Impossible de consulter vos demandes de service..Une erreur est apparue.</AppText>
        </View>
    }

    if(error === null && compter === 0) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Vous n'avez pas demande de service en cours..</AppText>
            <AppButton title='Demander maintenant' onPress={() => navigation.navigate('E-service')}/>
        </View>
    }


    return (
        <FlatList data={userServices} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                      if (!item.Contrats || item.Contrats.length === 0 && !item.historique) {
                          return (
                              <UserServiceItem serviceDescrip={item.CartItems[0].libelle}
                                               itemImage={item.CartItems[0].OrderItem.image} itemMontant={item.montant} header='S' headerValue={item.numero}
                                               dateDemande={item.dateCmde} dateFourniture={item.dateLivraisonDepart} dateFournitureFinal={item.dateLivraisonFinal}
                                               showDetail={item.showDetails} getDetails={() => dispatch(getItemDetail(item.id))} deleteItem={() => deleteOrder(item)}
                                               createOrderContrat={() => createOrderContrat(item)} isHistorique={false}
                                               moveItemToHistorique={() => moveOrderToHistory(item.id)} isDemande={true}
                                               payement={getOrderPayementMode(store.getState())[item.id].payementMode}
                                               accordLabel='Status accord' accordValue={item.statusAccord} accordInitdata={dataAccord}
                                               changeAccordValue={(value) => saveAccordEdit({orderId: item.id, statusAccord: value})}
                                              accordStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase()==='refusé'?'red':'grey'}}
                                               goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}
                                               serviceLabel={item.CartItems[0].OrderItem.libelle} />
                          )
                      }
                  } }/>
    );
}

export default UserServiceScreen;