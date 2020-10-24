import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View} from "react-native";
import AppText from "../components/AppText";

function FactureDetailsScreen({route}) {
    const facture = route.params

    useEffect(() => {
        console.log(facture);
    }, [])
    return (
        <View>
            <AppText>Facture detial goes her</AppText>
        </View>
    );
}

export default FactureDetailsScreen;