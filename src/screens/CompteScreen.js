import React from 'react';
import {View, Text, StyleSheet} from "react-native";


function CompteScreen(props) {
    return (
        <View style= {styles.container}>
            <Text>Compte screen</Text>
        </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default CompteScreen;