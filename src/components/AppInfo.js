import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

import Color from '../utilities/colors';
import AppButton from "./AppButton";

function AppInfo({title,buttonTitle,onPress,children,  ...otherProps}) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 15
    }
})

export default AppInfo;