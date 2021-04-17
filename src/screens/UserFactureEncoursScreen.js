import React, {useEffect, useCallback} from 'react';
import {FlatList,View} from "react-native";
import FactureListItem from "../components/list/FactureListItem";
import {getTrancheShown} from "../store/slices/factureSlice";
import routes from "../navigation/routes";
import {useDispatch, useSelector} from "react-redux";
import useOrderInfos from "../hooks/useOrderInfos";
import useManageUserOrder from "../hooks/useManageUserOrder";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";

function UserFactureEncoursScreen({navigation}) {
    const dispatch = useDispatch()
    const {getItems, getModePayement} = useOrderInfos()
    const {payFactureTranche} = useManageUserOrder()

    const encoursList = useSelector(state => state.entities.facture.encoursList)
    const loading = useSelector(state => state.entities.facture.loading)
    const tranches = useSelector(state => state.entities.tranche.list)

    if(encoursList.length === 0){
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <AppText>Vous n'avez aucune facture dans les encours.</AppText>
            </View>
        )
    }


    return (
        <>
             <AppActivityIndicator visible={loading}/>
             <View style={{bottom: 20}}>
        <FlatList data={encoursList} keyExtractor={item => item.id.toString()}
                  renderItem={({item}) =>
                      <FactureListItem numero={item.numero}
                                       orderItems={getItems(item.CommandeId)} showProgress={item.ratio < 1}
                                       okPayement={item.montant === item.solde} progress={Number(item.ratio)}
                                       showTranches={item.showTranche}  getDetails={() => dispatch(getTrancheShown(item.id))} montant={item.montant}
                                       dateEmission={item.dateEmission} dateEcheance={item.dateFin}
                                       tranches={tranches.filter(tranche => tranche.FactureId === item.id)} payTranche={(tranche)=> payFactureTranche(tranche)}
                                       getLink={() => navigation.navigate(routes.ORDER_DETAILS, item.Commande)}
                                       modePayement={getModePayement(item.CommandeId)}
                                       solde={item.solde} endFacture={item.montant === item.solde}
                                       goToItemDetails={() => navigation.navigate('AccueilNavigator', {screen :routes.FACTURE_DETAILS, params: item})}
                                       waitingTranchePayed={item.Tranches.some(tranche => tranche.payedState === 'pending')}/>
                  } />
             </View>
                  </>
    );
}

export default UserFactureEncoursScreen;