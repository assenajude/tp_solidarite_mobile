import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity, Alert} from "react-native";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import useAuth from "../hooks/useAuth";
import {useDispatch, useSelector, useStore} from "react-redux";
import {showTrancheDetails} from "../store/slices/trancheSlice";
import AppLabelWithValue from "../components/AppLabelWithValue";
import AppIconButton from "../components/AppIconButton";
import useManageUserOrder from "../hooks/useManageUserOrder";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppSmallButton from "../components/AppSmallButton";

function FactureTrancheScreen({route}) {
    const {formatPrice, formatDate, userRoleAdmin} = useAuth()
    const {payFactureTranche} = useManageUserOrder()
    const dispatch = useDispatch()
    const store = useStore()
    const selectedFacture = route.params
    const factureTranchesList = useSelector(state => {
        const list = state.entities.tranche.list
        const selectedList = list.filter(item => item.FactureId === selectedFacture.id)
        return selectedList
    })
    const isLoading = useSelector(state => state.entities.tranche.loading)

    const [factureTranches, setFactureTranches] = useState([])

    const handlePayTranche = (item) => {
        Alert.alert('Alert', "Voulez-vous payer cette tranche?", [{
            text: "oui", onPress: async () => {
                await payFactureTranche(item)
                const newList = store.getState().entities.tranche.list
                const selectedList = newList.filter(tranche => tranche.FactureId === selectedFacture.id)
                setFactureTranches(selectedList)
            }
        }, {
            text: 'non', onPress: () => {return;}
        }])


    }

    const handleShowTranche = async (tranche) => {
        await dispatch(showTrancheDetails(tranche))
        const newList = store.getState().entities.tranche.list
        const selectedList = newList.filter(item => item.FactureId === selectedFacture.id)
        setFactureTranches(selectedList)
    }

    useEffect(() => {
        setFactureTranches(factureTranchesList)
    }, [])

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
        <ScrollView contentContainerStyle={{
            paddingBottom: 50
        }}>
            <View style={styles.headerContainer}>
            <View style={styles.trancheHeader}>
                <AppText style={styles.letterF}>FP</AppText>
            </View>
                <AppText style={styles.numeroFact}>{selectedFacture.numero}</AppText>
            </View>
            <View>
                {factureTranches.map((item) =>
                    <View key={item.id.toString()} style={[styles.trancheContainer, {height: item.showDetails?'auto':50}]}>
                        <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal:10
                        }}>
                            <TouchableOpacity onPress={() => handleShowTranche(item)}>
                                <AppText style={{color: colors.bleuFbi}}>{item.numero}</AppText>
                            </TouchableOpacity>
                            <AppText style={{fontWeight: 'bold'}}>{formatPrice(item.montant)}</AppText>
                            {item.payed && <View>
                                {item.payedState === 'confirmed' && <AppIconButton
                                    onPress={() => alert("Vous avez deja payé cette tranche.")}
                                    iconName='check'
                                    buttonContainer={{
                                        backgroundColor: colors.vert
                                    }}/>}
                                    {item.payedState === 'pending' && <AppIconButton
                                        buttonContainer={{
                                            backgroundColor: 'orange'
                                        }}
                                        iconName='exclamation'/>}
                            </View>}
                        </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                                {userRoleAdmin() && item.payedState !=='confirmed' &&
                                <AppSmallButton
                                    onPress={() => handlePayTranche({...item, validation: true})}
                                    title="valider"
                                />
                                }
                                {!item.payed &&
                                <AppSmallButton
                                    onPress={() => handlePayTranche(item)}
                                    title='payer'/>
                                }

                            </View>

                        </View>
                        {item.showDetails && <View style={{
                            marginHorizontal: 20,
                            backgroundColor: colors.lightGrey
                        }}>
                            <AppLabelWithValue label='Emis le:' labelValue={formatDate(item.dateEmission)}/>
                            <AppLabelWithValue label='Doit être payé le:' labelValue={formatDate(item.dateEcheance)}/>
                            <AppLabelWithValue label='Déjà payé:' labelValue={formatPrice(item.solde)}/>
                            {item.payed && <AppLabelWithValue label='Payé le:' labelValue={formatDate(item.updatedAt)}/>}
                            <AppIconButton
                                onPress={() => handleShowTranche(item)}
                                buttonContainer={styles.closeDetails}
                                iconColor={colors.dark}
                                iconName="caretup" />
                        </View>}
                </View>)}
            </View>
        </ScrollView>
            </>
    );
}

const styles = StyleSheet.create({
    closeDetails:{
        backgroundColor: colors.leger,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 20
    },
    headerContainer: {
      width: '100%',
      height: 300,
        backgroundColor: colors.leger,
        alignItems: 'center',
        justifyContent: 'center'
    },
    letterF: {
        fontSize: 100,
        color: colors.blanc,
        fontWeight: 'bold'
    },
    numeroFact: {
      color: colors.dark,
        marginTop: -20,
        fontSize: 30,
        fontWeight: 'bold'
    },
    trancheHeader: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius:200,
        backgroundColor: colors.rougeBordeau,
        marginVertical: 20
    },
    trancheContainer: {
        marginVertical: 20,
        backgroundColor: colors.blanc
    }
})
export default FactureTrancheScreen;