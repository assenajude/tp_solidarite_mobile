import React from 'react';
import {View, StyleSheet} from "react-native";
import AppText from "../AppText";
import colors from "../../utilities/colors";
import AppInput from "../AppInput";
import AppButton from "../AppButton";

function CompteParrainageItem({fonds, fondsLabel,fondContainerStyle,
                                  editFundValue=false, annuleEdit,
                                   editValue, onEditValueChange,
                                  children}) {
    return (
        <View style={[styles.fondsStyle, fondContainerStyle]}>
            <View>
            <View style={{flexDirection: 'row'}}>
                {children}
                <AppText style={{fontWeight: 'bold'}}>{fondsLabel}</AppText>
            </View>
            <AppText style={{fontWeight: 'bold'}}>{fonds} fcfa</AppText>
            </View>
            {editFundValue && <View>
                <AppInput value={editValue} onChangeText={onEditValueChange} keyboardType='numeric'/>
                <AppButton onPress={annuleEdit} title='fermer' style={{alignSelf: 'flex-end'}}/>
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
        borderWidth: 2,
        padding: 10
    }
})

export default CompteParrainageItem;