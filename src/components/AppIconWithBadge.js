import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons'

import Color from '../utilities/colors'

function AppIconWithBadge({name, size, color, badgeCount,children, style, notifStyle}) {
    return (
        <View style={[styles.mainView, style]}>
            {name && <AntDesign name={name} size={size} color={color}/>}
            {children}
            {badgeCount > 0 && <View style={[styles.notifContainer, notifStyle]}>
                <Text numberOfLines={1} style={styles.notifContent}>{badgeCount}</Text>
            </View> }
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        width: 24,
        height: 24,
        margin: 5
    },
    notifContainer: {
        position: 'absolute',
        right: -6,
        top: -3,
        borderRadius: 6,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center'

    },
    notifContent: {
        color: Color.blanc,
        fontSize: 10,
        padding: 3,
        fontWeight: 'bold'

    }

})
export default AppIconWithBadge;