import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import AppText from "../AppText";

function ListItem({key1, key2, key3, key4}) {
    return (
        <TouchableOpacity>
        <View style={styles.container}>
            <AppText >{key1}</AppText>

            <AppText lineNumber={1} style={styles.info}>{key2} -- {key3}--{key4}</AppText>

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