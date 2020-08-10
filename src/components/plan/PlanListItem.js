import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native'
import AppText from "../AppText";

function PlanListItem({prop1, prop2, prop3}) {
    return (
        <View style={styles.container}>
            <View style={styles.idStyle}>
                <AppText>{prop1}</AppText>
            </View>
            <View style={styles.propStyle}>
                <AppText style={{fontWeight: 'bold'}}>{prop2}</AppText>
                <AppText lineNumber={1}>{prop3}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        margin: 10
    },
    idStyle: {
    },
    propStyle: {
        alignItems: 'flex-start',
        width: '90%',
        marginLeft: 10
    }
})

export default PlanListItem;