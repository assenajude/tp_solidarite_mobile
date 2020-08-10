import React from 'react';
import {View, Text, StyleSheet, Platform} from "react-native";
import {AntDesign} from '@expo/vector-icons'
import Color from '../utilities/colors'

function AppText({children,iconName, style, lineNumber,...props}) {
    return (
        <View style={styles.container}>
            {iconName && <AntDesign name={iconName} color={Color.or} size={24}/>}
            <Text {...props} style={[styles.contentStyle, style]} numberOfLines={lineNumber}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
    },
    contentStyle: {
        padding: 5
    }
})
export default AppText;