import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import AppText from "../components/AppText";

function OrderDetailsScreen({route}) {
    const commande = route.params

    useEffect(() => {
        console.log(commande);
    }, [])
    return (
        <View>
            <AppText></AppText>
        </View>
    );
}

export default OrderDetailsScreen;