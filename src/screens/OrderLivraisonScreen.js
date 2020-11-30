import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, ActivityIndicator, StyleSheet, ScrollView, Alert} from "react-native";

import {getTotalFinal, getTotalWithPayement, getFraisLivraison} from '../store/selectors/orderSelector'
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import routes from "../navigation/routes";
import PayementListItem from "../components/list/PayementListItem";
import {getAllVilles, getSelectedLivraisonVille} from '../store/slices/villeSlice'
import {getSelectedAdress, getAdresse} from '../store/slices/userAdresseSlice'
import AppButton from "../components/AppButton";
import AppActivityIndicator from "../components/AppActivityIndicator";

function OrderLivraisonScreen({navigation}) {
    const store = useStore();
    const dispatch = useDispatch()
    const loading = useSelector(state => state.entities.userAdresse.loading)
    const adresseByUser = useSelector(state => state.entities.userAdresse.list);


    const getUserAdresses = useCallback(async () => {
        dispatch(getAdresse())
        dispatch(getAllVilles())
    }, [])


    useEffect(() => {
    }, [])


    if (loading) {
        return (
            <AppActivityIndicator visible={loading}/>
        )
    }

    if (!loading && adresseByUser.length === 0) {
        return (
            <View style={styles.emptyStyle}>
                <AppText>Vous n'avez pas d'adresses de livraison. Veillez en ajouter pour continuer</AppText>
                <AppButton title='Ajouter des adresses' onPress={() => navigation.navigate(routes.USER_ADDRESS)}/>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Montant actuel commande: </AppText>
                    <AppText style={{
                        fontWeight: 'bold',
                        color: colors.rougeBordeau
                    }}>{getTotalWithPayement(store.getState())} FCFA</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Frais de livraison: </AppText>
                    <AppText style={{
                        fontWeight: 'bold',
                        color: colors.rougeBordeau
                    }}>{getFraisLivraison(store.getState())} FCFA</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Net actuel à payer: </AppText>
                    <AppText style={{
                        fontWeight: 'bold',
                        color: colors.rougeBordeau
                    }}>{getTotalFinal(store.getState())} FCFA</AppText>
                </View>
            </View>
            <View>
                <View style={styles.adressHeader}>
                    <AppText style={{color: colors.blanc}}>Choisissez votre adresse de livraison</AppText>
                </View>
                <ScrollView>
                    <View style={{
                        marginLeft: 20
                    }}>


                    {adresseByUser.map((item, index) => <PayementListItem libelle={item.nom}
                                                                          description={`${item.tel} --- ${item.adresse}`}
                                                                          key={index}
                                                                          selectItem={() => {
                                                                              dispatch(getSelectedLivraisonVille(item.PointRelai.VilleId))
                                                                              dispatch(getSelectedAdress(item.id))
                                                                          }
                                                                          } checked={item.selected}/>)}
                    </View>
                </ScrollView>
                <AppButton title='continuer' style={styles.buttonStyle}
                           onPress={() => {navigation.navigate(routes.ORDER)}}/>
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
    adressHeader: {
        backgroundColor: colors.rougeBordeau,
        marginTop: 20,
        marginBottom: 20
    },
    buttonStyle: {
        height: 40,
        width: '50%',
        alignSelf: 'center',
        top: 50
    },
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrderLivraisonScreen;