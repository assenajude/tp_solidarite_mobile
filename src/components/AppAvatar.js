import React from 'react';
import {View,StyleSheet, TouchableOpacity, Text, Image} from "react-native";
import Color from "../utilities/colors";
import AppText from "./AppText";
import {AntDesign} from "@expo/vector-icons";
import {useSelector} from "react-redux";

function AppAvatar({containerStyle, imageStyle, onPress,textStyle, setUsername=false, showNotif=true}) {
    const user = useSelector(state => state.auth.user)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const userNotifCompter = useSelector(state => state.profile.notifCompter)

    const isUser = Object.entries(user).length !== 0

    return (
        <View style={[{width: 60}, containerStyle]}>
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
            {isUser && user.avatar && <Image source={{uri: user.avatar}} style={[styles.image, imageStyle]}/>}
            <View style={{
                borderWidth: 1,
                borderRadius: 50,
                backgroundColor: Color.blanc
            }}>
                {user === {} || !user.avatar && <AntDesign name='user' size={40}/>}
            </View>
               {setUsername && <AppText>{user.username}</AppText>}
            {userNotifCompter > 0 && showNotif && <View style={[styles.notifStyle, textStyle]}>
               <Text style={styles.textNotifStyle}>{userNotifCompter}</Text>
            </View>}

            </View>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    notifStyle: {
        position: 'absolute',
        right:5,
        top: -5,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNotifStyle:{
        color: Color.blanc,
        fontSize: 8,
        padding: 3,
        fontWeight: 'bold',
        backgroundColor: Color.bleuFbi,
        borderRadius: 60
    },
    image: {
        width: 50,
        height:50,
        borderRadius: 50,
    }
})

export default AppAvatar;