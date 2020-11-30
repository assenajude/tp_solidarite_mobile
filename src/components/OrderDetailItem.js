import React from 'react';
import AppText from "./AppText";
import {View} from "react-native";

function OrderDetailItem({quantite, libelle, montant}) {
    return (
        <View style={{flexDirection: 'row',minHeight: 50}}>
            <AppText>{quantite}</AppText>
            <AppText>{libelle}</AppText>
            <AppText> => </AppText>
            <AppText>{montant} fcfa</AppText>
        </View>
    );
}

export default OrderDetailItem;