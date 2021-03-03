import React, { useEffect} from 'react';
import {View,StyleSheet, ScrollView} from "react-native";
import {useSelector, useDispatch} from "react-redux";


import AppText from "../components/AppText";
import colors from "../utilities/colors";
import {
    getPayementActive,
    getPlanDetail,
    getSelectedPlan
} from '../store/slices/payementSlice'
import PayementListItem from "../components/list/PayementListItem";
import AppButton from "../components/AppButton";
import routes from '../navigation/routes';
import ModeItemCheck from "../components/payement/ModeItemCheck";
import AppActivityIndicator from "../components/AppActivityIndicator";
import usePayementPlan from "../hooks/usePayementPlan";
import usePlaceOrder from "../hooks/usePlaceOrder";

function OrderPayementScreen({navigation}) {
    const dispatch = useDispatch()
    const {getPayementRate, getTotal} = usePlaceOrder()
    const {permitCredit, isPlanDisabled} = usePayementPlan()
    const articleAmount = useSelector(state => state.entities.shoppingCart.totalAmount)
    const payements = useSelector(state => state.entities.payement.list)
    const currentOrder = useSelector(state => state.entities.order.currentOrder)
    const payementPlans = useSelector(state => state.entities.payement.payementPlans)
    const loading = useSelector(state => state.entities.payement.loading)
    const selectedPlan = useSelector(state => state.entities.payement.currentPlan)
    const livraisonLoading = useSelector(state => state.entities.userAdresse.loading)
    const typeCmde = useSelector(state => state.entities.shoppingCart.type)
    // const [checkItem, setCheckItem] = useState()






  useEffect(() => {

  }, [])



    if(loading) {
        return (
            <AppActivityIndicator visible={loading}/>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}} >Montant commande: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{articleAmount} FCFA</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Interet payement: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}> {getPayementRate()} FCFA</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Net actuel à payer: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{getTotal()} FCFA</AppText>
                </View>
            </View>
            <View>
                <View style={styles.headerStyle}>
                <AppText style={{color: colors.blanc, fontWeight: 'bold', fontSize: 12}}>Dites nous comment vous voulez payer votre commande</AppText>
                </View>
            </View>
            <ScrollView>
                <View  style={{paddingBottom: 30}}>
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
                            <ModeItemCheck isActive={item.active} modeTitle={item.mode} getModeActive={() => {
                                if(typeCmde === 'service' && item.mode.toLowerCase() === 'cash') {
                                    alert('Désolé, vous ne pouvez pas choisir ce mode de payement pour cette commande.')
                                } else {
                                    if(item.mode.toLowerCase() === 'credit' && !permitCredit()) {
                                        alert('Impossible de choisir ce mode, un ou plusieurs articles de votre commande ne peuvent pas être vendus à credit')
                                    } else {
                                      dispatch(getPayementActive(item.id))
                                    }
                                }
                            }} isPayementDisabled={typeCmde === 'service' && item.mode.toLowerCase() === 'cash'}/>
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
                        <PayementListItem disablePlan={isPlanDisabled(plan)}
                                          libelle={plan.libelle} description={plan.descripPlan} key={index}
                                          checked={plan.checked} selectItem={() => {
                                              if(isPlanDisabled(plan)) {
                                                  return alert('Vous ne pouvez pas choisir ce plan pour cette commande, veuillez choisir un autre plan SVP')
                                              }
                                            dispatch(getSelectedPlan(plan))
                                            // setCheckItem(true)
                                          }} planDelai={plan.nombreMensualite>0?plan.nombreMensualite+' m':'3 j'}
                                          showDetail={plan.showPlanDetail} getDetails={() => dispatch(getPlanDetail(plan.id))}
                                          goToPlanDetail={() => navigation.navigate('AccueilNavigator', {screen: 'PlanDetailScreen', params: plan})}
                                          goToDisabledPlanDetail={() => navigation.navigate('AccueilNavigator', {screen: 'PlanDetailScreen', params: plan})}/>)}
                    </View>

                </View>
              {Object.keys(selectedPlan).length>0 &&  <AppButton buttonLoading={livraisonLoading} style={styles.buttonStyle} textStyle={{fontSize: 20}} title='continuer'
                               onPress={() => {
                                   if(currentOrder.type === 'location' || currentOrder.type === 'service') {
                                       navigation.navigate(routes.ORDER)
                                   } else {
                                       navigation.navigate(routes.ORDER_LIVRAISON)
                                   }
                               }}/>}
                </View>
            </ScrollView>
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