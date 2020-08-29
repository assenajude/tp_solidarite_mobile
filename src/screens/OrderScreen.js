import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux'
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native'

import Color  from '../utilities/colors'
import OrderItem from "../components/order/OrderItem";
import OrderListBottom from "../components/order/OrderListBottom";

import OrderLivraison from "../components/order/OrderLivraison";
import {getSelected} from '../store/slices/payementSlice';
import {getInteretValue, getTaux} from '../store/selectors/orderSelector'
import OrderPlan from "../components/order/OrderPlan";
import {Picker} from "@react-native-community/picker";
import routes from "../navigation/routes";

function OrderScreen({navigation}) {
    const store = useStore()

    const dispatch = useDispatch();
    const orders = useSelector(state => state.entities.order.list);
    const [totalGlobal, setTotalGlobal] = useState(0);
    const payements = useSelector(state => state.entities.payement.list);
    const selectedPayement = useSelector(state => state.entities.payement.selectedPayement);
    const [modePayement, setModePayement] = useState(selectedPayement.id);
    const payementId = useSelector(state => state.entities.payement.payementId)
    const [adresseLivraison, setAdresseLivraison] = useState('');
    const currentPlan = useSelector(state => state.entities.payement.currentPlan);
    const currentOrder = useSelector(state => state.entities.order.currentOrder)


    const listData = [
        {
            header: 'Commande',
            title1Value: orders[0].itemsLenght,
            title2Value: orders[0].amount
        },
        {
            header: 'Payement',
            title1Value: 'Cash',
            title2Value:0

        },
        {
            header: 'Livraison',
            title1Value: 'Adresse',
            title2Value: 0

        }
    ];

    useEffect(() => {
    }, [dispatch, currentOrder])




    if (orders.length === 0) {
        return (
            <View style={styles.emptyStyle}>
                <Text>Aucune commande encours. Vous pouvez faire des achats</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList ListFooterComponent={() => <OrderListBottom globalOrder={totalGlobal}/>} data={listData} keyExtractor={(item, index) =>index.toString()}
                      renderItem={({item}) => {
                          if (item.header === 'Commande') {
                              return <OrderItem headerTitle={item.header} buttonTitle='Details cmd'
                                                title1='Total articles: ' title1Value={currentOrder.itemsLenght} title2='Sous-Total: '
                                                title2Value={currentOrder.amount}
                              />

                          } else if (item.header === 'Payement') {
                              return <OrderItem headerTitle={item.header} title1='Mode' buttonTitle='Details payement'
                                                title1Value={
                                                    <Picker mode='dropdown' style={{height: 50, width: 120}} selectedValue={payementId} onValueChange={(value) => {
                                                        getTaux(store.getState())
                                                        getInteretValue(store.getState())
                                                        dispatch(getSelected(value));
                                                    }
                                                    }>
                                                        {payements.map((item, index) => <Picker.Item label={item.mode} value={item.id} key={index}/>)}
                                                    </Picker>
                                                }  title2={`Taux d'interêt (${getTaux(store.getState())}%)`} title2Value={getInteretValue(store.getState())} >
                                  <OrderPlan libelle={currentPlan.libelle} description={currentPlan.descripPlan} changePlan={() =>navigation.navigate(routes.PLAN) }/>
                              </OrderItem>
                          } else {
                              return <OrderItem headerTitle={item.header}
                                                buttonTitle='Details adresse' title1='Point Relais' title1Value='Aboisso' title2='Cout:' title2Value={0}></OrderItem>
                          }
                      }
                      }
            />
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 20,
        marginBottom: 40,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listFooterStyle: {
        backgroundColor: Color.rougeBordeau,
        padding: 10,
        marginTop: 30,
        marginBottom: 50,
        left: '25%'

    }
})
export default OrderScreen;