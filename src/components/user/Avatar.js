import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import colors from "../../utilities/colors";
import AppText from "../AppText";
import LottieView from 'lottie-react-native'


function Avatar({otherImageStyle,onPress, avatarUrl, ownerUserAvatar, showNottif=true, notifStyle, loadingStyle, loadingContainer}) {

    const user = useSelector(state => state.auth.user)

    const compterTotal = useSelector(state => {
       const connectedUser = state.profile.connectedUser
        const orderCompter = connectedUser.articleCompter + connectedUser.locationCompter + connectedUser.serviceCompter
        const factAndFavCompter = connectedUser.factureCompter + connectedUser.favoriteCompter
        const otherCompter = connectedUser.helpCompter + connectedUser.propositionCompter + connectedUser.parrainageCompter
        const compter = orderCompter + factAndFavCompter + otherCompter
        return compter || 0
    })
    const isUserConnected = Object.keys(user).length>0
    const showUserIcon = isUserConnected === false || ownerUserAvatar === null || !ownerUserAvatar

    const [imageLoading, setImageLoading] = useState(true)


    return (
        <>
            <TouchableOpacity onPress={onPress}>
            {isUserConnected && ownerUserAvatar && <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Image
                    onLoadEnd={() => setImageLoading(false)}
                    source={avatarUrl}
                    style={[styles.imageStyle, otherImageStyle]}/>
                {imageLoading && <View style={[styles.imageLoading, loadingContainer]}>
                    <LottieView
                        loop={true}
                        autoPlay={true}
                        style={[{
                            height: 30,
                            width: 30,
                        }, loadingStyle]}
                        source={require('../../assets/animations/image-loading')}/>
                </View>}
            </View>
            }
            {showUserIcon &&
                <Image source={require('../../assets/avatar_silhouette.png')} style={[styles.imageStyle, otherImageStyle]}/>
            }
            </TouchableOpacity>
            {compterTotal>0 && compterTotal<=9 && showNottif && <View style={styles.notifCompterStyle}>
                <AppText lineNumber={1} style={{color: colors.blanc, fontSize: 12, fontWeight: 'bold'}}>{compterTotal}</AppText>
            </View>}
            {compterTotal > 9 && showNottif && <View style={[styles.hightNotifCompter, notifStyle]}>
            </View>}
            </>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 40,
        width: 40,
        marginLeft: 5,
        borderRadius:20,
    },
    imageLoading: {
      position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.leger,
        left: 5,
        height: 40,
        width: 40,

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