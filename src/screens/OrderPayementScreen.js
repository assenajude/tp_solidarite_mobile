import React, { useEffect, useState} from 'react';
import {View,StyleSheet, ScrollView, TouchableOpacity, Alert, Modal} from "react-native";
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
import ModeItemCheck from "../components/payement/ModeItemCheck";
import AppActivityIndicator from "../components/AppActivityIndicator";
import usePayementPlan from "../hooks/usePayementPlan";
import usePlaceOrder from "../hooks/usePlaceOrder";
import {AntDesign, EvilIcons, Octicons} from "@expo/vector-icons";
import ConditionsModal from "../components/payement/ConditionsModal";
import ParrainListModal from "../components/payement/ParrainListModal";
import routes from "../navigation/routes";

function OrderPayementScreen({navigation}) {
    const dispatch = useDispatch()
    const {getPayementRate, getTotal} = usePlaceOrder()
    const {permitCredit, isPlanDisabled} = usePayementPlan()
    const articleAmount = useSelector(state => state.entities.shoppingCart.totalAmount)
    const currentUserData = useSelector(state => state.profile.connectedUser)
    const totalParrains = useSelector(state => {
        let total = 0
        const allParrains = state.entities.order.currentOrderParrains
        allParrains.forEach(parrain => {
            total += parrain.parrainAction
        })
        return total
    })
    const payements = useSelector(state => state.entities.payement.list)
    const payementPlans = useSelector(state => state.entities.payement.payementPlans)
    const loading = useSelector(state => state.entities.payement.loading)
    const selectedPlan = useSelector(state => state.entities.payement.currentPlan)
    const livraisonLoading = useSelector(state => state.entities.userAdresse.loading)
    const typeCmde = useSelector(state => state.entities.shoppingCart.type)
    const [openConditionsModal, setOpenConditionsModal] = useState(false)
    const [parrainModalVisible, setParrainModalVisible] = useState(false)
    const [creditSelected, setCreditSelected] = useState(false)
    const [isPLanSelected, setIsPlanSelected] = useState(false)
    const [creditOptionModal, setCreditOptionModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')


    const handleDismissParrainModal = () => {
        if(totalParrains>0 && totalParrains !== getTotal()){
            return alert("Le total parrain doit être egal au total commande")
        }
        setParrainModalVisible(false)
    }


    const handleOrderNext = () => {
        if (creditSelected && isPLanSelected) {
            setCreditOptionModal(true)
        } else navigation.navigate(routes.ORDER)
    }

    const handleModalOptionNext = () => {
        if(selectedOption.toLowerCase() === 'fidelityseuil') {
            setCreditOptionModal(false)
            navigation.navigate(routes.ORDER)
        }
        else {
            setCreditOptionModal(false)
            navigation.navigate(routes.ORDER_PARRAINAGE)
        }
    }

  useEffect(() => {
  }, [])



    if(loading) {
        return (
            <AppActivityIndicator visible={loading}/>
        )
    }


    return (
        <>
            <ConditionsModal conditionModalVisible={openConditionsModal} dismissConditionModal={() => setOpenConditionsModal(false)}/>
            <ParrainListModal parrainageModalVisible={parrainModalVisible} dismissParrainModal={handleDismissParrainModal}/>
        <ScrollView>
            <View style={{alignItems: 'flex-start', padding: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <AntDesign name="infocirlceo" size={20} color={colors.bleuFbi} />
                    <AppText>Avant de faire une commande à credit, </AppText>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                        <AppText>assurez-vous de respecter les</AppText>
                    </View>
                    <TouchableOpacity onPress={() => setOpenConditionsModal(true)}>
                        <AppText style={{color: colors.bleuFbi}}>conditions d'eligibités</AppText>
                    </TouchableOpacity>

                </View>
            </View>
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
                                        if(item.mode.toLowerCase() === 'credit') setCreditSelected(true)
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
                                              setIsPlanSelected(true)
                                            dispatch(getSelectedPlan(plan))
                                          }} planDelai={plan.nombreMensualite>0?plan.nombreMensualite+' m':'3 j'}
                                          showDetail={plan.showPlanDetail} getDetails={() => dispatch(getPlanDetail(plan.id))}
                                          goToPlanDetail={() => navigation.navigate('AccueilNavigator', {screen: 'PlanDetailScreen', params: plan})}
                                          goToDisabledPlanDetail={() => navigation.navigate('AccueilNavigator', {screen: 'PlanDetailScreen', params: plan})}/>)}
                    </View>

                </View>
              {Object.keys(selectedPlan).length>0 &&  <AppButton buttonLoading={livraisonLoading} style={styles.buttonStyle} textStyle={{fontSize: 20}} title='continuer'
                               onPress={handleOrderNext}/>}
                </View>
            </ScrollView>
        </ScrollView>
            <Modal visible={creditOptionModal} transparent>

                <View style={styles.optionContainer}>
                    <View style={{alignSelf: 'flex-end', margin: 30}}>
                        <TouchableOpacity onPress={() => setCreditOptionModal(false)}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <EvilIcons name="close" size={24} color={colors.rougeBordeau} />
                            <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>fermer</AppText>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <AppText style={{color: colors.bleuFbi}}>Veuillez choisir une option de credit pour continuer </AppText>
                    </View>
                    <View style={{alignItems: 'center', marginTop: 50}}>
                    <TouchableOpacity onPress={() => {
                        if(currentUserData.fidelitySeuil < 500000) {
                            alert("Vous ne pouvez pas utiliser cette option, vous n'avez pas encore atteint votre seuil de fidelité")
                        }else {
                        setSelectedOption('fidelitySeuil')

                        }
                    }}>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                        <View style={{height: 20,width: 20, borderWidth: 1, borderRadius: 10, marginRight: 5,
                            justifyContent: 'center', alignItems: 'center'}}>
                            {selectedOption.toLowerCase() === 'fidelitySeuil' && <Octicons name="primitive-dot" size={24} color={colors.or} />}
                        </View>
                        <AppText style={{fontWeight: 'bold' }}>Seuil de fidelité</AppText>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedOption('parrainage')}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20}}>
                        <View style={{height: 20,width: 20, borderWidth: 1,
                            borderRadius: 10, marginRight: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                          {selectedOption.toLowerCase() === 'parrainage' &&  <Octicons name="primitive-dot" size={24} color={colors.or} />}
                        </View>
                        <AppText style={{fontWeight: 'bold'}}>Parrainage</AppText>
                    </View>
                    </TouchableOpacity>
                </View>

                {selectedOption.length>0 && <View style={{alignItems: 'center', marginTop: 60}}>
                  <AppButton style={{padding: 5, paddingLeft: 20,paddingRight: 20}} title='continuer' onPress={handleModalOptionNext}/>
                </View>}
                </View>
            </Modal>
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
    },
    optionContainer: {
        backgroundColor: colors.blanc,
        width: '100%',
        height: '85%',
        top: 60,
    }
})

export default OrderPayementScreen;