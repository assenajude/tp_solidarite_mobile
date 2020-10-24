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
import {getServiceDetails, getStartAccordEdit, saveStatusEdit} from "../store/slices/userServiceSlice";

function UserServiceScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const {createContrat} = useCreateOrderContrat()

    const compter = useSelector(state => state.entities.order.demandeCompter)
    const userServices = useSelector(state => state.entities.order.currentUserOrders)
    const [accordValue,setAccordValue] = useState('status...')


    const startOrderContrat = (order) => {
        Alert.alert('INFO!', 'Voulez-vous commencer le contrat pour cette commande?', [
            {text: 'oui', onPress: async () => {

                await createContrat(order)
                }}, {
            text: 'non', onPress: () => {return;}
            }
        ], {cancelable: false})

    }

    const setItemHistorique = (item) => {
        const data = {
            orderId: item.id,
            history: true
        }
        dispatch(updateHistory(data))
    }


    const saveAccordEditing = (data) => {
        const orderData = {
            orderId: data.id,
            statusAccord: accordValue
        }
        dispatch(saveStatusEdit(orderData))
        dispatch(getStartAccordEdit(data))
    }

    const goToAccueil = () => {
        navigation.navigate(routes.ACCUEIL)
    }

    useFocusEffect( () => {
        BackHandler.addEventListener('hardwareBackPress', goToAccueil)
        }
    )

    useEffect(() => {
    }, [])

    return (
        <ScrollView>
            {userServices.map((item, index) => {
                if (!item.contrats || item.contrats.length === 0 && !item.historique) {
                    return (
                        <UserServiceItem key={index.toString()} serviceDescrip={item.cartItems[0].libelle} itemIndex={index+1}
                                         itemImage={item.cartItems[0].image} itemMontant={item.montant} header='SVC N°:' headerValue={item.numero}
                                         dateDemande={dayjs(item.dateCmde).format('DD/MM/YYYY HH:mm:ss')} dateFourniture={dayjs(item.dateLivraison).format('DD/MM/YYYY HH:mm:ss')}
                                         showDetail={item.showDetails} showOrderDetail={() => dispatch(getItemDetail(item.id))}
                                         libStatusAccord='Status accord' statusAccordValue={item.statusAccord} editStatusAccord={item.editAccord}
                                         accordValueStyle={{color: item.statusAccord.toLowerCase() === 'accepté'?colors.vert:item.statusAccord.toLowerCase()=== 'refusé'?'red':'grey'}}
                                         startEditingAccord={() => dispatch(getStartAccordEdit(item))}
                                         accordEditValue={accordValue} changeAccordEditValue={value => setAccordValue(value)}
                                         undoAccordEditing={() => dispatch(getStartAccordEdit(item))} saveAccording={() => saveAccordEditing(item)}
                                         createOrderContrat={() => startOrderContrat(item)} isHistorique={false}
                                         moveItemToHistorique={() => setItemHistorique(item)} isDemande={true}
                        />
                    )
                }
            })}
        </ScrollView>
    );
}

export default UserServiceScreen;