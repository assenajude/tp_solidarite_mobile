import React from 'react';
import {View, StyleSheet} from "react-native";
import AppText from "../AppText";
import colors from "../../utilities/colors";
import AppInput from "../AppInput";
import AppButton from "../AppButton";
import AppSmallButton from "../AppSmallButton";

function CompteParrainageItem({fonds, fondsLabel,fondContainerStyle,
                                  editFundValue=false, annuleEdit,
                                   editValue, onEditValueChange,
                                  children, labelStyle}) {
    return (
        <View style={[styles.fondsStyle, fondContainerStyle]}>
            <View>
            <View style={{flexDirection: 'row'}}>
                {children}
                <AppText style={[{fontWeight: 'bold'}, labelStyle]}>{fondsLabel}</AppText>
            </View>
            <AppText style={{fontWeight: 'bold'}}>{fonds} fcfa</AppText>
            </View>
            {editFundValue && <View>
                <AppInput inputMainContainer={{backgroundColor: colors.blanc}} value={editValue} onChangeText={onEditValueChange} keyboardType='numeric'/>
                <AppSmallButton onPress={annuleEdit} title='fermer' style={{alignSelf: 'flex-end'}}/>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    fondsStyle: {
        backgroundColor: colors.blanc,
        margin: 10,
        borderRadius: 10,
        borderColor: colors.dark,
        padding: 10
    }
})

export default CompteParrainageItem;