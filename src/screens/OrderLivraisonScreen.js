import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, ActivityIndicator, StyleSheet, ScrollView, Alert} from "react-native";

import {getTotalFinal, getTotalWithPayement, getFraisLivraison} from '../store/selectors/orderSelector'
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import authStorage from '../store/persistStorage'
import routes from "../navigation/routes";
import {getAdresseByUser} from '../store/slices/userAdresseSlice'
import PayementListItem from "../components/list/PayementListItem";
import {getSelectedLivraisonVille,getAllVilles} from '../store/slices/villeSlice'
import {getSelectedAdress} from '../store/slices/userAdresseSlice'
import AppButton from "../components/AppButton";

function OrderLivraisonScreen({navigation}) {
    const store  = useStore();
    const dispatch = useDispatch()
    const adresseByUser = useSelector(state => state.entities.userAdresse.userAdresses);

    const [isLoading, setIsLoading] = useState(true)

    const getCurrentUser = async () => {
        const user = await authStorage.getUser()
        if(!user) {
            Alert.alert('Info', 'Vous devez vous connecter pour continuer.', [
                {
                    text: 'annuler',
                    onPress: () => {
                        return navigation.goBack()}
                },
                {
                    text: 'ok',
                    onPress: () => {
                        return navigation.navigate(routes.LOGIN)
                    }
                }
            ],{cancelable: false})
        }
        return user;
    }

    const getUserAdresses = async () => {
        const user = await authStorage.getUser();
        await dispatch(getAdresseByUser(user.id))
        if (adresseByUser.length === 0) setIsLoading(true)
        setIsLoading(false)
    }

    const getVilles = async () => {
        await dispatch(getAllVilles())
    }


    useEffect(() => {
        getCurrentUser();
        getVilles()
        getUserAdresses()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.summary}>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}} >Montant actuel commande: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{getTotalWithPayement(store.getState())} FCFA</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Frais de livraison: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{getFraisLivraison(store.getState())} FCFA</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Net actuel à payer: </AppText>
                    <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{getTotalFinal(store.getState())} FCFA</AppText>
                </View>
            </View>
            <View>
                <View style={styles.adressHeader}>
                <AppText style={{color: colors.blanc}}>Choisissez votre adresse de livraison</AppText>
                </View>
                <ScrollView>
                    {adresseByUser.map((item, index) => <PayementListItem libelle={item.nom} description={`${item.tel} --- ${item.adresse}`} key={index}
                             selectItem={() =>
                                 {
                                     dispatch(getSelectedLivraisonVille(item.pointRelai.villeId))
                                     dispatch(getSelectedAdress(item.id))
                                 }
                             } checked={item.selected}/>)}
                          {isLoading && <View>
                                 <ActivityIndicator size='large' color={colors.rougeBordeau}/>
                             </View>}
                </ScrollView>
                <AppButton title='continuer' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.ORDER)}/>
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
    }
})

export default OrderLivraisonScreen;