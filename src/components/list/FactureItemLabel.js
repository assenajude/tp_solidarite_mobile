import React from 'react';
import {View} from "react-native";
import AppText from "../AppText";

function FactureItemLabel({itemLabel, labelValue, labelValue2, labelStyle, labelValueStyle, labelValue2Style}) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <AppText style={labelStyle}>{itemLabel}</AppText>
            <AppText style={labelValueStyle}>{labelValue}</AppText>
            {labelValue2 && <AppText style={labelValue2Style}>{labelValue2}</AppText>}
        </View>
    );
}

export default FactureItemLabel;