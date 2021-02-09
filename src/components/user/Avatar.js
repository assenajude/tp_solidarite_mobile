import React,{useEffect} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from "react-native";
import {useSelector} from "react-redux";
import {AntDesign} from '@expo/vector-icons'
import colors from "../../utilities/colors";
import AppText from "../AppText";


function Avatar({showUsername, otherImageStyle,otherImageContainerStyle,
                    onPress,notifStyle, userAvatar}) {

    const user = useSelector(state => state.auth.user)
    const compterTotal = useSelector(state => {
        const orderCompter = state.entities.order.totalCompter
        const messageCompter = state.entities.message.newMsgCompter
        const favoriteCompter = state.entities.userFavorite.favoriteCompter
        const faqCompter = state.entities.faq.helpCompter
        const factureCompter = state.entities.facture.newFactureCompter
        const propCompter = state.entities.proposition.newFactureCompter
        return orderCompter+messageCompter+factureCompter+favoriteCompter+faqCompter+propCompter
    })
    const isUserConnected = Object.keys(user).length>0
    const showUserIcon = isUserConnected === false || user.avatar === null


    return (
        <View>
            <TouchableOpacity onPress={onPress}>
            <View style={[styles.avatarContainer, otherImageContainerStyle]}>
            {isUserConnected && user.avatar !== null && <Image source={userAvatar} resizeMode='contain' style={[styles.imageStyle, otherImageStyle]}/>}
                {showUserIcon && <View>
                <AntDesign name='user' size={30} color={colors.dark}/>
                </View>}
                {showUsername && <AppText>{user.username}</AppText>}
            </View>
            </TouchableOpacity>
            {compterTotal > 0 && <View style={[styles.notifContainer,{height: compterTotal<=9?12:20,width: compterTotal<=9?12:20}, notifStyle]}>
                <Text numberOfLines={1} style={styles.notifContent}>{compterTotal<=9?compterTotal:'9+'}</Text>
            </View> }
            </View>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 50,
        width: 50,
        borderRadius:250
    },
    avatarContainer: {
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
        justifyContent: 'center',
        backgroundColor: colors.blanc,
        borderRadius: 100
    },
    notifContainer: {
        backgroundColor: colors.bleuFbi,
        position: 'absolute',
        right: -6,
        top: 5,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'

    },
    notifContent: {
        color: colors.blanc,
        fontSize: 10,
        padding: 3,
        fontWeight: 'bold'

    }
})

export default Avatar;