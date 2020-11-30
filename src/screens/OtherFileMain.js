import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import AppButton from "../components/AppButton";
import routes from '../navigation/routes'
import {useDispatch, useSelector} from "react-redux";
import {loadCategories} from "../store/slices/categorieSlice";
import {getAllShippingAdress} from '../store/slices/shippingAdresseSlice';
import {loadRelais} from '../store/slices/pointRelaisSlice'
import {getRegions} from '../store/slices/regionSlice';
import {getAllVilles} from '../store/slices/villeSlice'
import {getAdresse} from '../store/slices/userAdresseSlice'
import colors from "../utilities/colors";


function OtherFileMain({navigation}) {

    const dispatch = useDispatch();

    const getCategories = useCallback(async () => {
        await dispatch(loadCategories())
    }, [])

    const getVilles = useCallback(async () => {
        await dispatch(getAllVilles())
    }, [])

    const getShippingAdresse = useCallback(async () => {
        await dispatch(getAllShippingAdress())
    }, [])

    const getPointRelais = useCallback(async () => {
        await dispatch(loadRelais())
    }, [])

    const getAllRegions = useCallback(async () => {
        await dispatch(getRegions())
    }, [])

const getUserAdresses = useCallback(async () => {
        await dispatch(getAdresse())
    }, [])

    useEffect(() => {
            getCategories();
        getShippingAdresse();
        getPointRelais()
        getAllRegions()
        getVilles()
        getUserAdresses()
    }, [])

    return (
        <ScrollView>
           <AppButton title='Categorie' style={styles.buttonStyle} onPress={() =>navigation.navigate(routes.CATEGORIE)}/>
           <AppButton title='Payement' style={styles.buttonStyle} onPress={() =>navigation.navigate(routes.PAYEMENT)}/>
           <AppButton title='Plan' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.PLAN)}/>
           <AppButton title='Region' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.REGION)}/>
           <AppButton title='Ville' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.VILLE)}/>
            <AppButton title='Point relais' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.POINT_RELAIS)}/>
            <AppButton title='Adresse utilisateur' style={styles.buttonStyle} onPress={() => navigation.navigate(routes.USER_ADDRESS)}/>
            <AppButton title='Couleur et Taille' style={styles.buttonStyle} onPress={() => navigation.navigate('ColorAndSizeScreen')}/>

        </ScrollView>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: colors.bleuFbi,
        width: '90%',
        padding: 10,
        margin: 20
    }
})
export default OtherFileMain;