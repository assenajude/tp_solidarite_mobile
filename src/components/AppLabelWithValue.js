import React from 'react';
import {View} from "react-native";
import AppText from "./AppText";

function AppLabelWithValue({label, labelValue, secondLabel, secondLabelValue}) {
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <AppText style={{fontWeight: 'bold'}}>{label}</AppText>
            <AppText>{labelValue}</AppText>
            {secondLabel && <AppText>{secondLabel}</AppText>}
            {secondLabelValue && <AppText>{secondLabelValue}</AppText>}
        </View>
    );
}

export default AppLabelWithValue;