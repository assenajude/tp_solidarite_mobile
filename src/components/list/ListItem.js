import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import AppText from "../AppText";

function ListItem({propriety1, propriety2, propriety3, propriety4}) {
    return (
        <TouchableOpacity>
        <View style={styles.container}>
            <AppText >{propriety1}</AppText>

            <AppText lineNumber={1} style={styles.info}>{propriety2}   {propriety3}   {propriety4}</AppText>

        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    },
    info: {
     marginLeft: 20
    }
})
export default ListItem;