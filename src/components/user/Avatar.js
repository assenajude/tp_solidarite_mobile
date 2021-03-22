import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from "react-native";
import {useSelector} from "react-redux";
import colors from "../../utilities/colors";
import AppText from "../AppText";


function Avatar({otherImageStyle,onPress, avatarUrl, ownerUserAvatar}) {

    const user = useSelector(state => state.auth.user)
    const compterTotal = useSelector(state => {
        let compter = 0
        const orderCompter = state.entities.order.totalCompter
        const messageCompter = state.entities.message.newMsgCompter
        const favoriteCompter = state.entities.userFavorite.favoriteCompter
        const faqCompter = state.entities.faq.helpCompter
        const factureCompter = state.entities.facture.newFactureCompter
        const propCompter = state.entities.proposition.newFactureCompter
        compter = orderCompter+messageCompter+factureCompter+favoriteCompter+faqCompter+propCompter
        return compter
    })
    const isUserConnected = Object.keys(user).length>0
    const showUserIcon = isUserConnected === false || ownerUserAvatar === null || !ownerUserAvatar


    return (
        <>
            <TouchableOpacity onPress={onPress}>
            {isUserConnected && ownerUserAvatar && <Image source={avatarUrl} style={[styles.imageStyle, otherImageStyle]}/>}
            {showUserIcon && <Image source={require('../../assets/avatar_silhouette.png')} style={[styles.imageStyle, otherImageStyle]}/>}
            </TouchableOpacity>
            {compterTotal>0 && <View style={styles.notifCompterStyle}>
                <AppText lineNumber={1} style={{color: colors.bleuFbi, fontSize: compterTotal>9?10:12, fontWeight: 'bold'}}>{compterTotal<=9?compterTotal:'9+'}</AppText>
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
        height: 24,
        width: 24,
      right: -20,
      top: 5,
        backgroundColor: colors.blanc,
        borderRadius: 12
    }
})

export default Avatar;