import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native'
import AppButton from "../components/AppButton";
import routes from '../navigation/routes'
import {useDispatch, useSelector} from "react-redux";
import {loadCategories} from "../store/slices/categorieSlice";
import {getAllShippingAdress} from '../store/slices/shippingAdresseSlice'


function OtherFileMain({navigation}) {

    const dispatch = useDispatch();

    const getCategories = useCallback(async () => {
        await dispatch(loadCategories())
    }, [dispatch])

    const getShippingAdresse = useCallback(async () => {
        await dispatch(getAllShippingAdress())
    }, [dispatch])


    useEffect(() => {
            getCategories();
        getShippingAdresse()
    }, [getCategories, getShippingAdresse])

    return (
        <View style={styles.container}>
           <AppButton title='Categorie' style={styles.buttonStyle} onPress={() =>navigation.navigate(routes.CATEGORIE)}/>
           <AppButton title='Payement' style={styles.buttonStyle} onPress={() =>navigation.navigate(routes.PAYEMENT)}/>
           <AppButton title='Plan' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.PLAN)}/>
            <AppButton title='Payement utilisateur' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.USER_PAYEMENT)}/>
            <AppButton title='Livraison' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.LIVRAISON)}/>
            <AppButton title='Adresse de livraison' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.SHIPPING)}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: '90%',
        padding: 10,
        margin: 20
    }
})
export default OtherFileMain;