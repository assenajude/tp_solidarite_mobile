import React from 'react';
import {View, Text, StyleSheet, Image, Button} from "react-native";
import Constants from 'expo-constants'
import * as Updates from 'expo-updates'
import colors from "../utilities/colors";
import AppButton from "./AppButton";
import AppText from "./AppText";

function OfflineNotice(props) {
    const handleRetry = async () => {
        await Updates.reloadAsync()
    }

    return (
        <View style={styles.noticeContainer}>
            <AppText>Vous n'avez pas d'accès internet,</AppText>
            <AppText>veuillez cliquer sur le bouton pour réessayer</AppText>
            <Image source={require('../assets/no_internet.jpg')} style={{width: 100, height: 100}}/>
            <AppButton title='Réessayer' onPress={handleRetry} style={{alignSelf: 'center'}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    noticeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: Constants.statusBarHeight,
    }
})

export default OfflineNotice;