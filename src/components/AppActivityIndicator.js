import React from 'react';
import {View, StyleSheet, ActivityIndicator} from "react-native";
import colors from "../utilities/colors";
import LottieView from "lottie-react-native";


function AppActivityIndicator({visible}) {
    if (!visible) {
        return null;
    } else {
    return (
        <View style={styles.container}>
            <LottieView style={{ width: 200}} autoPlay={true} loop={true} source={require('../assets/animations/loading.json')}/>
            <ActivityIndicator size='large' color={colors.rougeBordeau}/>
        </View>
    );
    }

}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: colors.blanc,
        opacity: 0.8
    }
})

export default AppActivityIndicator;