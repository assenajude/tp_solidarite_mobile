import React from 'react';
import {View, Text, StyleSheet} from "react-native";

function CadeauScreen(props) {
    return (
        <View style = {styles.container}>
            <Text>Cadeau screen</Text>
        </View>
)
    ;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default CadeauScreen;