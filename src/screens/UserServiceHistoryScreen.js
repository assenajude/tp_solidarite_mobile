import React from 'react';
import {View, FlatList, ScrollView} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector, useStore} from "react-redux";
import UserServiceItem from "../components/order/UserServiceItem";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import {getItemDetail} from "../store/slices/orderSlice";

function UserServiceHistoryScreen(props) {
    const store = useStore()
    const dispatch = useDispatch()
    const userServicesData = useSelector(state => state.entities.order.currentUserOrders)
    const compter = useSelector(state => state.entities.order.historiqueCompter)



    if(compter === 0) {
        return <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Votre historique est vide...</AppText>
        </View>
    }

    return (
        <ScrollView>
            {userServicesData.map((item, index) => {
                if(item.historique) {
                    return (
                        <UserServiceItem key={index.toString()} isHistorique={true} isDemande={false} header='SVC N°:' headerValue={item.numero}
                                         itemImage={item.cartItems[0].image} statusAccordValue={item.statusAccord}
                                         dateDemande={item.dateCmde} serviceDescrip={item.cartItems[0].libelle}
                                         libStatusContrat='Status contrat' contrats={item.contrats} statusContratValue={item.contrats[0]?item.contrats[0].status:'aucun contrat'}
                                         accordValueStyle={{color: item.statusAccord.toLowerCase()=== 'acceté'?'green':item.statusAccord.toLowerCase()==='refusé'?'red':'grey'}}
                                         itemMontant={item.montant} showDetail={item.showDetails}
                                         showOrderDetail={() => dispatch(getItemDetail(item.id))}/>
                    )
                }
            })}
        </ScrollView>
    );
}

export default UserServiceHistoryScreen;