import React from 'react';
import {View} from "react-native";
import AppText from "./AppText";
import colors from "../utilities/colors";

function AppLabelWithValue({label, labelValue, secondLabel, secondLabelValue}) {
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <AppText style={{fontWeight: 'bold'}}>{label}</AppText>
            <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{labelValue}</AppText>
            {secondLabel && <AppText>{secondLabel}</AppText>}
            {secondLabelValue && <AppText>{secondLabelValue}</AppText>}
        </View>
    );
}

export default AppLabelWithValue;