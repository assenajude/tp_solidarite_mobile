import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useStore, useSelector} from "react-redux";
import {useFocusEffect} from '@react-navigation/native'
import {View, FlatList,Alert, ActivityIndicator, BackHandler, ScrollView} from "react-native";
import dayjs from "dayjs";
import AppText from "../components/AppText";
import UserServiceItem from "../components/order/UserServiceItem";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import {
    getItemDetail,
    updateHistory
} from "../store/slices/orderSlice";
import colors from "../utilities/colors";
import routes from "../navigation/routes";
import useCreateOrderContrat from "../hooks/useCreateOrderContrat";
import useManageUserOrder from "../hooks/useManageUserOrder";
import AppButton from "../components/AppButton";
import GetLogin from "../components/user/GetLogin";

function UserServiceScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const {startEditingAccord, saveAccordEdit, createOrderContrat, moveOrderToHistory, deleteOrder}  = useManageUserOrder()


    const compter = useSelector(state => state.entities.order.demandeCompter)
    const error = useSelector(state => state.entities.order.error)
    const userServices = useSelector(state => state.entities.order.currentUserOrders)
    const user = useSelector(state => state.auth.user)
    const [accordValue,setAccordValue] = useState('status...')


    const goToAccueil = () => {
        navigation.navigate(routes.ACCUEIL)
    }

    useFocusEffect( () => {
        BackHandler.addEventListener('hardwareBackPress', goToAccueil)
        }
    )

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
        return <View>
            <AppText>Vous n'avez pas demande de service en cours..</AppText>
            <AppButton title='Demander maintenant' onPress={() => navigation.navigate('E-service')}/>
        </View>
    }


    return (
        <FlatList data={userServices} keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                      if (!item.contrats || item.contrats.length === 0 && !item.historique) {
                          return (
                              <UserServiceItem serviceDescrip={item.cartItems[0].libelle}
                                               itemImage={item.cartItems[0].image} itemMontant={item.montant} header='S' headerValue={item.numero}
                                               dateDemande={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')} dateFourniture={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                                               showDetail={item.showDetails} showOrderDetail={() => dispatch(getItemDetail(item.id))}
                                               libStatusAccord='Status accord' statusAccordValue={item.statusAccord} editStatusAccord={item.editAccord}
                                               accordValueStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase()=== 'refusé'?'red':'grey'}}
                                               startEditingAccord={() => startEditingAccord(item.id)} deleteItem={() => deleteOrder(item)}
                                               accordEditValue={accordValue} changeAccordEditValue={value => setAccordValue(value)}
                                               undoAccordEditing={() => startEditingAccord(item.id)} saveAccording={() => saveAccordEdit({orderId: item.id, statusAccord: accordValue})}
                                               createOrderContrat={() => createOrderContrat(item)} isHistorique={false}
                                               moveItemToHistorique={() => moveOrderToHistory(item.id)} isDemande={true}
                                               payement={getOrderPayementMode(store.getState())[item.id].payementMode}
                              />
                          )
                      }
                  } }/>
    );
}

export default UserServiceScreen;