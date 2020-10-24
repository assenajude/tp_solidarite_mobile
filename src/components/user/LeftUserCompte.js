import React from 'react';
import {useSelector} from "react-redux";
import {View, StyleSheet, Image} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

import color from "../../utilities/colors";
import AppAvatar from "../AppAvatar";

function LeftUserCompte({getUserCompteNavigator}) {
    const user = useSelector(state => state.auth.user)

    return (
        <AppAvatar textStyle={{backgroundColor: color.bleuFbi}} style={{backgroundColor: color.blanc, borderRadius: 100, margin:5}} onPress={getUserCompteNavigator}>
           {user && <Image source={require('../../assets/avatar.jpg')} style={styles.avatarStyle}/>}
           {!user && <AntDesign name='user' size={40}/>}
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