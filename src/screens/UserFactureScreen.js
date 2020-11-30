import React, {useCallback,useEffect} from 'react';
import {View,FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import dayjs from 'dayjs'

import {
    getTrancheShown,
    getFacturesByUser
} from '../store/slices/factureSlice'
import FactureListItem from "../components/list/FactureListItem";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import useManageUserOrder from "../hooks/useManageUserOrder";
import useOrderInfos from "../hooks/useOrderInfos";
import AppActivityIndicator from "../components/AppActivityIndicator";

function UserFactureScreen({navigation}) {
    const dispatch = useDispatch()
    const {payFactureTranche} = useManageUserOrder()
    const {getModePayement} = useOrderInfos()
    const user = useSelector(state => state.auth.user)
    const userFactures = useSelector(state => state.entities.facture.userFactures)
    const listOrder = useSelector(state => state.entities.order.list)
    const isLoading = useSelector(state => state.entities.facture.loading)

    const getUserFactures = useCallback(async () => {
        await dispatch(getFacturesByUser())
    }, [])

    const getItemsOfFacture = (orderId) => {
        const selectedOrder = listOrder.find(item => item.id === orderId)
        if(selectedOrder) return selectedOrder.CartItems
        return null
    }




    useEffect(() => {
        getUserFactures()
        // dispatch(getFacturesByUser())
    }, [])


    if(user && userFactures.length >=1) {
       return (
           <>
               <AppActivityIndicator visible={isLoading}/>
           <FlatList data={userFactures} keyExtractor={item => item.id.toString()}
                    renderItem={({item}) =>
                        <FactureListItem numero={item.numero} header='F'
                                         orderItems={getItemsOfFacture(item.CommandeId)}
                                         trancheButtonTitle2='payer' showProgress={item.ratio < 1}
                                         okPayement={item.montant === item.solde} progress={Number(item.ratio)}
                                         showTranches={item.showTranche}  getDetails={() => dispatch(getTrancheShown(item.id))} montant={item.montant}
                                         dateEmission={item.dateEmission} dateEcheance={item.dateFin}
                                         tranches={item.Tranches} label='facture' labelDateCmde='Debut payement' labelDateLivraison='Fin Payement'
                                         payTranche={(tranche)=> payFactureTranche(tranche)}
                                          linkTitle='consulter la cmde'
                                         getLink={() => navigation.navigate(routes.ORDER_DETAILS, item)}
                                         modePayement={getModePayement(item.CommandeId)}
                                         solde={item.solde} endFacture={item.montant === item.solde}
                                        goToItemDetails={() => navigation.navigate('AccueilNavigator', {screen :routes.FACTURE_DETAILS, params: item})}/>
                    } />
                    </>
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

export default UserFactureScreen;