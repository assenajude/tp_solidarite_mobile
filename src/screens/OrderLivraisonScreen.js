import React from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, StyleSheet, ScrollView} from "react-native";

import AppText from "../components/AppText";
import colors from "../utilities/colors";
import routes from "../navigation/routes";
import PayementListItem from "../components/list/PayementListItem";
import { getSelectedLivraisonVille} from '../store/slices/villeSlice'
import {getSelectedAdress, getAdLivraisonDetail} from '../store/slices/userAdresseSlice'
import AppButton from "../components/AppButton";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppLabelWithValue from "../components/AppLabelWithValue";
import usePlaceOrder from "../hooks/usePlaceOrder";
import useAuth from "../hooks/useAuth";

function OrderLivraisonScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const {formatPrice} = useAuth()
    const {getShippingRate, getTotal} = usePlaceOrder()
    const loading = useSelector(state => state.entities.userAdresse.loading)
    const adresseByUser = useSelector(state => state.entities.userAdresse.list);
    const currentSelected = useSelector(state => state.entities.userAdresse.selectedAdresse)
    const isAdresseNotEmpty = Object.keys(currentSelected).length>0


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
                    }}>{formatPrice(getTotal()-getShippingRate())}</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Frais de livraison: </AppText>
                    <AppText style={{
                        fontWeight: 'bold',
                        color: colors.rougeBordeau
                    }}>{formatPrice(getShippingRate())}</AppText>
                </View>
                <View style={styles.itemLine}>
                    <AppText style={{fontWeight: 'bold'}}>Net actuel à payer: </AppText>
                    <AppText style={{
                        fontWeight: 'bold',
                        color: colors.rougeBordeau
                    }}>{formatPrice(getTotal())}</AppText>
                </View>
            </View>
            <View>
                <View style={styles.adressHeader}>
                    <AppText style={{color: colors.blanc}}>Choisissez votre adresse de livraison</AppText>
                </View>
            </View>
                <ScrollView>
                    <View style={{
                        marginLeft: 20
                    }}>


                    {adresseByUser.map((item, index) => <PayementListItem libelle={item.nom}
                                                                          description={`${item.tel} --- ${item.adresse}`}
                                                                          key={index}
                                                                          selectItem={async () => {
                                                                              await dispatch(getSelectedAdress(item.id))
                                                                              const selectedAd = store.getState().entities.userAdresse.selectedAdresse
                                                                              if(selectedAd.selected) {
                                                                                  dispatch(getSelectedLivraisonVille(item))
                                                                              }else {
                                                                                  dispatch(getSelectedLivraisonVille({}))
                                                                              }
                                                                          }
                                                                          } checked={item.selected} showDelai={false} showDetail={item.showLivraisonDetail}
                                                                          getDetails={() => dispatch(getAdLivraisonDetail(item.id))} isAdLivraison={true}
                                                                          showDetailButton={false}>
                                                                            <AppLabelWithValue label='Tel: ' labelValue={item.tel}/>
                                                                            <AppLabelWithValue label='E-mail: ' labelValue={item.email}/>
                                                                            <AppLabelWithValue label='Autres adresses: ' labelValue={item.adresse}/>

                                                                            </PayementListItem>
                                                                          )}
                        {isAdresseNotEmpty && <AppButton style={styles.buttonStyle} title='continuer' onPress={() => {navigation.navigate(routes.ORDER_PAYEMENT)}}/>}
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
    adressHeader: {
        backgroundColor: colors.rougeBordeau,
        marginTop: 20,
        marginBottom: 20
    },
    buttonStyle: {
        height: 40,
        width: '50%',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30
    },
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrderLivraisonScreen;