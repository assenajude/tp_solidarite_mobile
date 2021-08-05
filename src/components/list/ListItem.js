import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native'
import AppText from "../AppText";

function ListItem({imageUrl, propriety2, propriety3, propriety4}) {
    return (
        <TouchableOpacity>
        <View style={styles.container}>
            <Image source={imageUrl} style={styles.imageStyle}/>
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
    },
    imageStyle: {
        height: 80,
        width: 80,
        overflow: 'hidden'
    }
})
export default ListItem;