import React from 'react';
import {View, Text, StyleSheet} from "react-native";

import AppButton from "../components/AppButton";
import AppSearchBar from "../components/AppSearchBar";
import AppAddNewButton from "../components/AppAddNewButton";
import AccueilScreen from "./AccueilScreen";


function HomeScreen(props) {
    return (
            <View style={styles.container} >
                <Text>My home screen</Text>
            </View>

);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:50
    },
    imageList: {
        marginTop: 20
    }

})


export default HomeScreen;