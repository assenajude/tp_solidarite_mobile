import React, {useState, useEffect, useCallback} from 'react';
import {View,ActivityIndicator, StyleSheet, ScrollView} from "react-native";
import {useSelector, useStore, useDispatch} from "react-redux";


import AppText from "../components/AppText";
import colors from "../utilities/colors";
import {getPayementActive, getSelected, getSelectedPlan, loadPayements} from '../store/slices/payementSlice'
import PayementListItem from "../components/list/PayementListItem";
import AppButton from "../components/AppButton";
import {getInteretValue, getTotalWithPayement} from '../store/selectors/orderSelector'
import routes from '../navigation/routes';
import {getAdresse} from '../store/slices/userAdresseSlice'
import {getAllVilles} from '../store/slices/villeSlice'
import ModeItemCheck from "../components/payement/ModeItemCheck";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {loadPlans} from "../store/slices/planSlice";

function OrderPayementScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()

    const articleAmount = useSelector(state => state.entities.shoppingCart.totalAmount)
    const payements = useSelector(state => state.entities.payement.list)
    const currentOrder = useSelector(state => state.entities.order.currentOrder)
    const payementPlans = useSelector(state => state.entities.payement.payementPlans)
    const loading = useSelector(state => state.entities.payement.loading)
    const livraisonLoading = useSelector(state => state.entities.userAdresse.loading)
    const [checkItem, setCheckItem] = useState(false)

   const getStarted = useCallback(async () => {
       dispatch(loadPayements())
       dispatch(getSelected(1))
       // dispatch(loadPlans())
   }, [])


  useEffect(() => {
      dispatch(getSelected(1))
  }, [])



    if(loading) {
        return (
            <AppActivityIndicator visible={loading}/>
        )
    }


    return (
        <>
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
                <AppText style={{color: colors.blanc, fontWeight: 'bold', fontSize: 12}}>Dites nous comment vous voulez payer votre commande</AppText>
                </View>
                <ScrollView style={{paddingBottom: 20}}>
                <View style={styles.modePayement}>
                    <View style={{
                        height: 35,
                        backgroundColor: colors.rougeBordeau,
                        justifyContent: 'center'
                    }}>
                    <AppText style={{fontWeight: 'bold', color: colors.blanc}}>Mode</AppText>
                    </View>
                    <View style={{marginLeft: 20}}>
                    <ScrollView horizontal>
                        {payements.map((item, index) => <View key={index.toString()}>
                            <ModeItemCheck isActive={item.active} modeTitle={item.mode} getModeActive={() => dispatch(getPayementActive(item.id))}/>
                        </View>)}
                    </ScrollView>
                    </View>

                </View>
                <View style={styles.listContainer}>
                    <View style={{
                        backgroundColor: colors.rougeBordeau,
                        width: '50%',
                        alignSelf: 'center',
                        marginBottom: 20
                    }}>
                        <AppText style={{color: colors.blanc}}>Choisissez un plan</AppText>
                    </View>
                    {!payementPlans || payementPlans.length === 0 && <View>
                        <AppText>Il n'y a pas de plans dans ce mode.</AppText>
                    </View>}
                    <View style={{justifyContent: 'flex-start'}}>
                    {payementPlans.map((plan, index) =>
                        <PayementListItem libelle={plan.libelle} description={plan.descripPlan} key={index}
                                          checked={plan.checked} selectItem={() => {
                            dispatch(getSelectedPlan(plan))
                            setCheckItem(true)}}/>)}
                    </View>

                </View>
                    <AppButton buttonLoading={livraisonLoading}  disable={true} style={styles.buttonStyle} textStyle={{fontSize: 20}} title='continuer'
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
       </>
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
        alignItems: 'center',
        margin: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1
    },
    listContainer: {
        margin: 5,
        marginLeft: 20,
        paddingTop: 10,
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