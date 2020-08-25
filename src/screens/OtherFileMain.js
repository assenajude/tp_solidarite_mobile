import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native'
import AppButton from "../components/AppButton";
import routes from '../navigation/routes'
import {useDispatch, useSelector} from "react-redux";
import {loadCategories, getCategories} from "../store/slices/categorieSlice";

function OtherFileMain({navigation}) {

    const dispatch = useDispatch();
    const getCategories = useCallback(async () => {
        await dispatch(loadCategories())
    }, [dispatch])

    useEffect(() => {
            getCategories();
    }, [getCategories])

    return (
        <View style={styles.container}>
           <AppButton title='Categorie' style={styles.buttonStyle} onPress={() =>navigation.navigate(routes.CATEGORIE)}/>
           <AppButton title='Payement' style={styles.buttonStyle} onPress={() =>navigation.navigate(routes.PAYEMENT)}/>
           <AppButton title='Plan' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.PLAN)}/>
            <AppButton title='Payement utilisateur' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.USER_PAYEMENT)}/>
            <AppButton title='Livraison' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.LIVRAISON)}/>
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