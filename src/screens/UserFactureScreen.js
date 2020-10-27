import React, {useCallback, useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList,ScrollView, ActivityIndicator} from "react-native";
import {useSelector, useDispatch, useStore} from "react-redux";
import dayjs from 'dayjs'

import {
    getTrancheShown,
    getPayedStatusChanged,
    getFacturePayed,
    getFacturesByUser
} from '../store/slices/factureSlice'
import {getTranchePayed} from '../store/slices/trancheSlice'
import colors from "../utilities/colors";
import FactureListItem from "../components/list/FactureListItem";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import {getOrderPayementMode} from "../store/selectors/payementSelector";
import {getFactureItems} from "../store/selectors/userOrderSelector";

function UserFactureScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const userFactures = useSelector(state => state.entities.facture.userFactures)
    const isLoading = useSelector(state => state.entities.facture.loading)

    const getUserFactures = useCallback(async () => {
        await dispatch(getFacturesByUser())
    }, [dispatch])


    useEffect(() => {
        getUserFactures()
    }, [])

    if (isLoading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color={colors.rougeBordeau}/>
            </View>
        )
    }

    if(user && userFactures.length >=1) {
       return (
           <FlatList data={userFactures} keyExtractor={item => item.id.toString()}
                    renderItem={({item}) =>
                        <FactureListItem numero={item.numero} header='F' orderItems={getFactureItems(store.getState())[item.commandeId].items}
                                         trancheButtonTitle2='payer' showProgress={item.ratio < 1}
                                         okPayement={item.ratio===1} progress={item.ratio}
                                         showTranche={item.showTranche}  getDetails={() => dispatch(getTrancheShown(item.id))} montant={item.montant}
                                         debut={dayjs(item.dateEmission).format('DD/MM/YYYY HH:mm:ss')} fin={dayjs(item.dateFin).format('DD/MM/YYYY HH:mm:ss')}
                                         tranches={item.tranches} notPayed={item.ratio < 1} label='facture' labelDate1='Debut payement' labelDate2='Fin Payement'
                                         payTranche={(tranche)=> {
                                             dispatch(getTranchePayed(tranche))
                                             dispatch(getPayedStatusChanged(tranche))
                                         }}
                                         soldeFacture={() => dispatch(getFacturePayed(item))} linkTitle='consulter la cmde'
                                         getLink={() => navigation.navigate(routes.ORDER_DETAILS, item)}
                                         modePayement={getOrderPayementMode(store.getState())[item.commandeId].payementMode}
                                         solde={item.solde}/>
                    }/>
       )
    } else if (user && userFactures.length === 0) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <AppText>Vous n'avez aucune facture enregistrée...</AppText>
            </View>

        )
    } else {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <AppText>Vous devez vous connecter pour voir vos factures..</AppText>
                <AppButton title='Se connecter' onPress={() => navigation.navigate('AccueilNavigator', {screen: routes.LOGIN})}/>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: 20
    },
    loadingStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UserFactureScreen;