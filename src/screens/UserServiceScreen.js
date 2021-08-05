import React from 'react';
import {useDispatch,useSelector} from "react-redux";
import {View, FlatList} from "react-native";
import AppText from "../components/AppText";
import UserServiceItem from "../components/order/UserServiceItem";
import {
    getItemDetail,
} from "../store/slices/orderSlice";
import colors from "../utilities/colors";
import routes from "../navigation/routes";
import useManageUserOrder from "../hooks/useManageUserOrder";
import AppButton from "../components/AppButton";
import GetLogin from "../components/user/GetLogin";
import AppActivityIndicator from "../components/AppActivityIndicator";
import initData from "../utilities/initData";
import useOrderInfos from "../hooks/useOrderInfos";

function UserServiceScreen({navigation}) {
    const dispatch = useDispatch()
    const { saveAccordEdit, createOrderContrat, moveOrderToHistory, deleteOrder}  = useManageUserOrder()
    const {getModePayement} = useOrderInfos()


    const error = useSelector(state => state.entities.order.error)
    const isLoading = useSelector(state => state.entities.order.loading)
    const userServices = useSelector(state => state.entities.order.listServices)
    const user = useSelector(state => state.auth.user)
    const localDemandeList = userServices.filter(item => item.Contrats.length === 0 && !item.historique)


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

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
       {!isLoading && error === null && localDemandeList.length > 0 && <FlatList data={localDemandeList} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                          return (
                              <UserServiceItem serviceDescrip={item.CartItems[0].OrderItem.libelle}
                                               itemImage={item.CartItems[0].OrderItem.image} itemMontant={item.montant} headerValue={item.numero}
                                               dateDemande={item.dateCmde} dateFourniture={item.dateLivraisonDepart} dateFournitureFinal={item.dateLivraisonFinal}
                                               showDetail={item.showDetails} getDetails={() => dispatch(getItemDetail(item))} deleteItem={() => deleteOrder(item)}
                                               createOrderContrat={() => createOrderContrat(item)} isHistorique={false}
                                               moveItemToHistorique={() => moveOrderToHistory(item.id)} isDemande={true}
                                               payement={getModePayement(item.id)}
                                               accordLabel='Status accord' accordValue={item.statusAccord} accordInitdata={initData.accordData}
                                               changeAccordValue={(value) => saveAccordEdit({orderId: item.id, statusAccord: value})}
                                              accordStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase()==='refusé'?'red':'grey'}}
                                               goToItemDetails={() =>navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params: item})}
                                               serviceLabel={item.CartItems[0].OrderItem.libelle} />
                          )

                  } }/>}
            {!isLoading && error === null && localDemandeList.length === 0 && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Vous n'avez pas demande de service en cours..</AppText>
                <AppButton textStyle={{fontSize: 16}}
                    width={'50%'}
                    title='Demander maintenant'
                    onPress={() => navigation.navigate('E-service')}/>
                </View>}
                  </>
    );
}

export default UserServiceScreen;