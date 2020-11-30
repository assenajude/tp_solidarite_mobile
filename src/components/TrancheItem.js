import React from 'react';
import AppText from "./AppText";
import colors from "../utilities/colors";
import dayjs from "dayjs";
import {AntDesign} from "@expo/vector-icons";
import AppButton from "./AppButton";
import {View} from "react-native";

function TrancheItem({trancheIndex, trancheMontant, isTranchePayed, tranchePayedDate, trancheDateEcheance, payTranche}) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <AppText> {trancheIndex} - </AppText>
            <AppText style={{color: colors.rougeBordeau}}>{trancheMontant} fcfa</AppText>
            <AppText>{isTranchePayed?'payé le: ' + dayjs(tranchePayedDate).format('DD/MM/YYYY HH:mm:ss'):'avant le: ' + dayjs(trancheDateEcheance).format('DD/MM/YYYY HH:mm:ss')}</AppText>
            {isTranchePayed? <AntDesign name="check" size={24} color="green" />:<AppButton onPress={payTranche} style={{backgroundColor: 'green', width: 'auto', height: 16, marginLeft: 5, paddingRight:5}} title='payer'/>}
        </View>
    );
}

export default TrancheItem;