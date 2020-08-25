import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native'

import Color  from '../utilities/colors'
import OrderItem from "../components/order/OrderItem";
import OrderListBottom from "../components/order/OrderListBottom";

import OrderPayement from "../components/order/OrderPayement";
import OrderLivraison from "../components/order/OrderLivraison";
import {loadPayements} from '../store/slices/payementSlice'

function OrderScreen(props) {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.entities.order.list);
    const [totalGlobal, setTotalGlobal] = useState(0);
    const [modePayement, setModePayement] = useState('CASH');
    const [adresseLivraison, setAdresseLivraison] = useState('');
    const payements = useSelector(state => state.entities.payement.list)

    const getAllPayements = useCallback(async () => {
            await dispatch(loadPayements());
            if (!payements) return 'Aucun payement trouvé'
    }, [dispatch]);

    const planData = [
        {
            libelle: 'GUEPARD',
            interet: '5%',
            mensualite: 1,
            contenu: "Avec le plan SHAP-SHAP, remboursez la totalité de votre credit le mois suivant votre emprunt. Le taux d'intéret est seulement de 5%"
        },
        {
            libelle: 'LION',
            interet: '5%',
            mensualite: 1,
            contenu: "Avec le plan SHAP-SHAP, remboursez la totalité de votre credit le mois suivant votre emprunt. Le taux d'intéret est seulement de 5%"
        }
    ];

    const adresseData = [
        {
            libelle: 'Abidjan',
            cout: 2500,
            contenu: []
        }
    ]

    const listData = [
        {
            header: 'Commande',
            libelle: orders[0].itemsLenght,
            value: orders[0].amount
        },
        {
            header: 'Payement',
            subtitle: 'Cash',
            libelle: planData[0].libelle,
            value: planData[0].cout

        },
        {
            header: 'Livraison',
            subtitle: 'Adresse',
            libelle: adresseData[0].libelle,
            value: adresseData[0].cout

        }
    ];

    const possibilities = [
        {
            value: 'CASH'
        },
        {
            value: 'CREDIT'
        }
    ]

    useEffect(() => {
        getAllPayements();
    }, [dispatch, getAllPayements])


    if (orders.length === 0) {
        return (
            <View style={styles.emptyStyle}>
                <Text>Aucune commande encours. Vous pouvez faire des achats</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList ListFooterComponent={() => <OrderListBottom globalOrder={totalGlobal}/>} data={listData} keyExtractor={(item, index) =>index.toString()}
                      renderItem={({item}) => {
                          if (item.header === 'Commande') {
                              return <OrderItem headerTitle={item.header} buttonTitle='Details cmd'
                                                subtitle='Total articles: ' valueSubtitle={item.libelle} cout='Sous-Total: '
                                                coutValue={item.value}
                              />

                          } else if (item.header === 'Payement') {
                              return <OrderPayement libellePlan={possibilities[1].value} payementData={payements}
                                                    changePlanTitle='Changer de plan' planDataLength={planData.length} payementHeader={item.header} payementDetail='Detail Plan'
                                                    payementSubtitle='Mode' payementSubtitleValue={modePayement}
                                                    changePayementSubtitleValue={(value) => setModePayement(value)}
                                                    payementCout='Contribution' payementCoutValue={20000}
                                                    planHeader={planData[0].libelle} planDescrip={planData[0].contenu}>
                              </OrderPayement>
                          } else {
                              return <OrderLivraison livraisonHeader={item.header} livraisonSubtitle='Adresse'
                                                     livraisonSubtitleValue={adresseLivraison} changeLivraisonSubtitle={(value) => setAdresseLivraison(value)}
                                                      livraisonFrais='Frais'
                                                     livraisonFraisValue={2500} livraisonButtonTitle='Detail adresse'/>
                          }
                      }
                      }
            />
        </View>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 20,
        marginBottom: 40,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listFooterStyle: {
        backgroundColor: Color.rougeBordeau,
        padding: 10,
        marginTop: 30,
        marginBottom: 50,
        left: '25%'

    }
})
export default OrderScreen;