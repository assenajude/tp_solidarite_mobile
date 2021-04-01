import React, {useCallback,useEffect} from 'react';
import {View,FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";

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
import useAuth from "../hooks/useAuth";

function UserFactureScreen({navigation}) {
    const dispatch = useDispatch()
    const {userRoleAdmin} = useAuth()
    const {payFactureTranche} = useManageUserOrder()
    const {getModePayement, getItems} = useOrderInfos()
    const user = useSelector(state => state.auth.user)
    const userFactures = useSelector(state => {
        let newFactures = []
        const user = state.auth.user
        const factures = state.entities.facture.list
        const userFactures = factures.filter(item => item.Commande.UserId === user.id)
        if(userRoleAdmin()) {
            return factures
        }
        newFactures = userFactures
        return newFactures
    })
    const isLoading = useSelector(state => state.entities.facture.loading)
    const newCompter = useSelector(state => state.entities.facture.newFactureCompter)

    const getUserFactures = useCallback(async () => {
        if(newCompter>0) await dispatch(getFacturesByUser())

    }, [])





    useEffect(() => {
        getUserFactures()
    }, [])


    if(user && userFactures.length >=1) {
       return (
           <>
               <AppActivityIndicator visible={isLoading}/>
           <FlatList data={userFactures} keyExtractor={item => item.id.toString()}
                    renderItem={({item}) =>
                        <FactureListItem numero={item.numero}
                                         orderItems={getItems(item.CommandeId)} showProgress={item.ratio < 1}
                                         okPayement={item.montant === item.solde} progress={Number(item.ratio)}
                                         showTranches={item.showTranche}  getDetails={() => dispatch(getTrancheShown(item.id))} montant={item.montant}
                                         dateEmission={item.dateEmission} dateEcheance={item.dateFin}
                                         tranches={item.Tranches} payTranche={(tranche)=> payFactureTranche(tranche)}
                                         getLink={() => navigation.navigate(routes.ORDER_DETAILS, item.Commande)}
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