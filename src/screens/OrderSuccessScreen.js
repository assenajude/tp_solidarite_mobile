import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, StyleSheet} from 'react-native'



import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import {getFactures} from '../store/slices/factureSlice'
import {getAllOrders, getOrdersByUser, getUserOrdersPopulate} from '../store/slices/orderSlice'
import routes from "../navigation/routes";
import Color from "../utilities/colors";
import {getAllUserOrderData, getUserData} from "../store/selectors/userOrderSelector";
import {getAllLocation} from "../store/slices/locationSlice";

function OrderSuccessScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const newOrder = useSelector(state => state.entities.order.newAdded)
    const newFacture = useSelector(state => state.entities.facture.newAdded)

    const getnewOrders = useCallback(async () => {
        await dispatch(getOrdersByUser())
        await dispatch(getFactures())
    }, [])

    useEffect(()=> {
        getnewOrders()
    }, [])

    const handleReset = async (buttonClicked) => {
        let whatToGo = buttonClicked.toLowerCase()
        if (whatToGo == 'commande') {
            navigation.navigate(routes.USER_ORDER)
        } else if(whatToGo =='accueil') {
        navigation.navigate('AccueilNavigator', {screen: 'AccueilScreen'})
        }

    }

    if(newOrder.typeCmde === 'e-location') {
        return <View>
            <AppText>Location enregistrée avec succès...</AppText>
            <AppButton title='Accueil' onPress={() => {
                navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})}}/>
            <AppButton title='Mes locations' onPress={() =>{
                navigation.navigate('AccueilNavigator', {screen: 'UserLocation'})}}/>
        </View>
    }

    if(newOrder.typeCmde === 'e-service') {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Votre demande de service a été enregistré avec succès..</AppText>
            <View style={{
                flexDirection: 'row'
            }}>
            <AppButton title='Accueil' onPress={() => {
                navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})}}/>
            <AppButton title='Mes services' onPress={() => {
                navigation.navigate('AccueilNavigator', {screen: 'UserServiceScreen'})}}/>
            </View>
        </View>
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={{fontSize: 30, fontWeight: 'bold', color: 'green'}}>Felicitation!!!</AppText>
                <AppText style={{fontSize: 20}}>Votre commande a été enregistrée...</AppText>
            </View>
            <View style={styles.content}>
                <View style={styles.commande}>
                <AppText style={{fontSize: 20}}>N° Commande: </AppText>
                <AppText style={{color: Color.or, fontSize: 20, fontWeight: 'bold'}}>{newOrder.numero}</AppText>
                </View>
                <View style={styles.facture}>
                    <AppText style={{fontSize: 20}}>N° Facture: </AppText>
                    <AppText style={{color: Color.or, fontSize: 20, fontWeight: 'bold'}}>{newFacture.numero}</AppText>
                </View>
            </View>
            <View>
                <View style={styles.buttonStyle}>
                    <AppButton iconColor={Color.blanc} style={{padding: 5, width: 'auto'}} title='Accueil' onPress={() => handleReset('accueil')}/>
                    <AppButton iconColor={Color.blanc} style={{padding: 5, width: 'auto'}}  title='Mes commandes' onPress={() => handleReset('commande')}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },
    header: {
    },
    content: {
        marginRight: 20
    },
    commande: {
        flexDirection: 'row'
    },
    facture: {
        flexDirection: 'row'
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default OrderSuccessScreen;