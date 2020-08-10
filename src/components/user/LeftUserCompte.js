import React from 'react';
import {View, StyleSheet, Image} from 'react-native'
import color from "../../utilities/colors";
import AppAvatar from "../AppAvatar";

function LeftUserCompte({getUserCompteNavigator}) {
    return (
        <AppAvatar textStyle={{backgroundColor: color.bleuFbi}} style={{backgroundColor: color.bleuFbi, borderRadius: 100, margin:5}} onPress={getUserCompteNavigator}>
            <Image source={require('../../assets/avatar.jpg')} style={styles.avatarStyle}/>
        </AppAvatar>
    );
}

const styles = StyleSheet.create({
    avatarStyle: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
})

export default LeftUserCompte;