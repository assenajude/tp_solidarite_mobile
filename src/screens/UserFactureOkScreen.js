import React from 'react';
import {FlatList, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import useOrderInfos from "../hooks/useOrderInfos";
import FactureListItem from "../components/list/FactureListItem";
import {getTrancheShown} from "../store/slices/factureSlice";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";

function UserFactureOkScreen({navigation}) {
    const dispatch = useDispatch()
    const {getItems, getModePayement} = useOrderInfos()

    const soldeList = useSelector(state => state.entities.facture.soldeList)
    const isLoading = useSelector(state => state.entities.facture.loading)
    const listTranches = useSelector(state => state.entities.tranche.list)

    if(soldeList.length === 0) {
        return (
            <View style={{
                flex:1,
                justifyContent: 'center',
                arguments: "center"
            }}>
                <AppText>Vous n'avez aucune facture soldée.</AppText>
            </View>
        )
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>

        <FlatList data={soldeList} keyExtractor={item => item.id.toString()}
                  renderItem={({item}) =>
                      <FactureListItem numero={item.numero}
                                       orderItems={getItems(item.CommandeId)} showProgress={item.ratio < 1}
                                       okPayement={item.montant === item.solde} progress={Number(item.ratio)}
                                       showTranches={item.showTranche}  getDetails={() => dispatch(getTrancheShown(item.id))} montant={item.montant}
                                       dateEmission={item.dateEmission} dateEcheance={item.dateFin}
                                       tranches={listTranches.filter(tranche => tranche.FactureId === item.id)}
                                       getLink={() => navigation.navigate(routes.ORDER_DETAILS, item.Commande)}
                                       modePayement={getModePayement(item.CommandeId)}
                                       solde={item.solde} endFacture={item.montant === item.solde}
                                       goToItemDetails={() => navigation.navigate('AccueilNavigator', {screen :routes.FACTURE_DETAILS, params: item})}
                                       waitingTranchePayed={item.Tranches.some(tranche => tranche.payedState === 'pending')}/>
                  } />
                  </>
    );
}


export default UserFactureOkScreen;