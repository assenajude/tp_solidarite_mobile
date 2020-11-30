import React from 'react';
import {useSelector} from "react-redux";
import {View, StyleSheet, Image} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

import color from "../../utilities/colors";
import AppAvatar from "../AppAvatar";
import useConvertBuffer from "../../hooks/useConvertBuffer";

function LeftUserCompte({getUserCompteNavigator, imageStyle, avatarNotif}) {
    const {arrayBufferToBase64} = useConvertBuffer()
    const user = useSelector(state => state.auth.user)
    const avatar = useSelector(state => state.profile.avatar)

    //let uriData = 'data:image/png;base64,'+arrayBufferToBase64(avatar?.data);

    return (
        <View style={styles.avatarStyle}>
        <AppAvatar isNotif={avatarNotif} textStyle={{backgroundColor: color.bleuFbi}} style={{backgroundColor: color.blanc, borderRadius: 100, margin:5}} onPress={getUserCompteNavigator}>
           {user && avatar !== null && <Image resizeMode='contain' source={{uri: avatar}} style={[{borderRadius: 80},imageStyle]}/>}
          {avatar === null && <AntDesign name='user' size={30}/>}
        </AppAvatar>
        </View>
    );
}

const styles = StyleSheet.create({
    avatarStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LeftUserCompte;