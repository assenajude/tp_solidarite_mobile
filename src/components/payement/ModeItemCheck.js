import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import { Entypo, Octicons} from '@expo/vector-icons';
import AppText from "../AppText";
import colors from "../../utilities/colors";

function ModeItemCheck({modeTitle,isActive, getModeActive}) {
    return (
        <View style={styles.mainStyle}>
            <TouchableOpacity onPress={getModeActive}>
                <View style={{
                    height: 25,
                    width: 25,
                    borderWidth: 1,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View>
                    {isActive && <Octicons name="primitive-dot" size={24} color={colors.or} />}
                    </View>
                </View>
            </TouchableOpacity>
                <AppText>{modeTitle}</AppText>
        </View>
    );
}

const styles = StyleSheet.create({
    mainStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 30,
        alignItems: 'center'
    }
})

export default ModeItemCheck;