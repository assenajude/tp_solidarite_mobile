import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import colors from "../../utilities/colors";
import AppText from "../AppText";


function Avatar({otherImageStyle,onPress, avatarUrl, ownerUserAvatar, showNottif=true}) {

    const user = useSelector(state => state.auth.user)

    const compterTotal = useSelector(state => {
       const connectedUser = state.profile.connectedUser
        const orderCompter = connectedUser.articleCompter + connectedUser.locationCompter + connectedUser.serviceCompter
        const factAndFavCompter = connectedUser.factureCompter + connectedUser.favoriteCompter
        const otherCompter = connectedUser.helpCompter + connectedUser.messageCompter + connectedUser.propositionCompter + connectedUser.parrainageCompter
        const compter = orderCompter + factAndFavCompter + otherCompter
        return compter || 0
    })
    const isUserConnected = Object.keys(user).length>0
    const showUserIcon = isUserConnected === false || ownerUserAvatar === null || !ownerUserAvatar


    return (
        <>
            <TouchableOpacity onPress={onPress}>
            {isUserConnected && ownerUserAvatar && <Image source={avatarUrl} style={[styles.imageStyle, otherImageStyle]}/>}
            {showUserIcon && <Image source={require('../../assets/avatar_silhouette.png')} style={[styles.imageStyle, otherImageStyle]}/>}
            </TouchableOpacity>
            {compterTotal>0 && compterTotal<=9 && showNottif && <View style={styles.notifCompterStyle}>
                <AppText lineNumber={1} style={{color: colors.blanc, fontSize: 12, fontWeight: 'bold'}}>{compterTotal}</AppText>
            </View>}
            {compterTotal > 9 && showNottif && <View style={styles.hightNotifCompter}>
            </View>}
            </>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 40,
        width: 40,
        marginLeft: 5,
        borderRadius:20
    },
    notifCompterStyle: {
      position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 18,
        width: 18,
      right: -15,
      top: 5,
        backgroundColor: colors.bleuFbi,
        borderRadius: 12
    },
    hightNotifCompter: {
        height: 12,
        width:12,
        right: -5,
        top: 5,
        backgroundColor: colors.bleuFbi,
        borderRadius: 12,
        position: 'absolute'
    }
})

export default Avatar;