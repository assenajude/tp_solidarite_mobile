import React, {useState, useEffect, useCallback} from 'react';
import {View,ActivityIndicator, StyleSheet, ScrollView} from "react-native";
import {useSelector, useStore, useDispatch} from "react-redux";


import AppText from "../components/AppText";
import colors from "../utilities/colors";
import {Picker} from "@react-native-community/picker";
import {getSelected, getSelectedPlan} from '../store/slices/payementSlice'
import PayementListItem from "../components/list/PayementListItem";
import AppButton from "../components/AppButton";
import {getInteretValue, getTaux, getTotalWithPayement} from '../store/selectors/orderSelector'
import routes from '../navigation/routes';
import {getAdresse, getAdresseByUser} from '../store/slices/userAdresseSlice'
import {getAllVilles} from '../store/slices/villeSlice'

function OrderPayementScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()

    const articleAmount = useSelector(state => state.entities.shoppingCart.totalAmount)
    const payements = useSelector(state => state.entities.payement.list)
    const currentOrder = useSelector(state => state.entities.order.currentOrder)
    const payementPlans = useSelector(state => state.entities.payement.payementPlans)
    const [selectedPayement, setSelectedPayement] = useState(1)
    const [checkItem, setCheckItem] = useState(false)
    const [isLoading, setIsLoading] = useState(true)



    const getVilles = useCallback(async() => {
        dispatch(getAllVilles())
    }, [])


  useEffect(() => {
      dispatch(getAdresse())
      getVilles()
  }, [])



    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}} >Montant articles: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{articleAmount} FCFA</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Taux d'interet payement: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}> {getInteretValue(store.getState())} FCFA</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Net actuel à payer: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{getTotalWithPayement(store.getState())} FCFA</AppText>
                </View>
            </View>
            <View>
                <View style={styles.headerStyle}>
                <AppText style={{color: colors.blanc, fontWeight: 'bold'}}>Choisissez le mode de payement et un plan</AppText>
                </View>
                <ScrollView style={{paddingBottom: 20}}>
                <View style={styles.modePayement}>
                    <AppText style={{fontWeight: 'bold', marginRight: 20}}>Mode de payement: </AppText>
                    <Picker mode='dropdown' style={{height: 50, width: 120}} selectedValue={selectedPayement} onValueChange={(id) => {
                      setSelectedPayement(id)
                        dispatch(getSelected(id))
                    }}>
                        {payements.map((item, index) => <Picker.Item label={item.mode} value={item.id} key={index}/>)}
                    </Picker>
                </View>
                <View style={styles.listContainer}>
                    {payementPlans.map((plan, index) =>
                        <PayementListItem libelle={plan.libelle} description={plan.descripPlan} key={index}
                                          checked={plan.checked} selectItem={() => {
                            dispatch(getSelectedPlan(plan))
                                              setCheckItem(true)}}/>)}

                </View>
                    <AppButton disable={true} style={styles.buttonStyle} textStyle={{fontSize: 20}} title='continuer'
                               onPress={() => {
                                   if(currentOrder.type === 'e-location' || currentOrder.type === 'e-service') {
                                       navigation.navigate(routes.ORDER)
                                   } else {
                                   navigation.navigate(routes.ORDER_LIVRAISON)
                                   }
                               }}/>
            </ScrollView>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    summary: {
        margin: 10,
        borderWidth: 1,
        borderRadius: 10
    },
    itemLine: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modePayement: {
        flexDirection: 'row',
        margin: 10
    },
    listContainer: {
        margin: 5
    },
    headerStyle: {
        backgroundColor: colors.rougeBordeau,
        marginTop: 10,
        marginBottom: 10
    },
    buttonStyle: {
        width: '50%',
        height: 40,
        alignSelf: 'center',
        marginTop: 40
    }
})

export default OrderPayementScreen;