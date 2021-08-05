import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, ScrollView, StyleSheet, Image} from 'react-native'

import AppText from "../components/AppText";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import colors from "../utilities/colors";
import {getConnectedUserData} from "../store/slices/userProfileSlice";
import Avatar from "../components/user/Avatar";
import useAuth from "../hooks/useAuth";
import AppLabelWithContent from "../components/AppLabelWithContent";
import AppIconButton from "../components/AppIconButton";
import LottieView from 'lottie-react-native'

function CompteScreen({navigation, route}) {
    const selectedParams = route.params
    const dispatch = useDispatch()
    const store = useStore()
    const  {userRoleAdmin} = useAuth()
    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.profile.loading)
    const allowEdit = userRoleAdmin() || selectedParams.id === user.id
    const [selectedUser, setSelectedUser] = useState(selectedParams)
    const [pieceRectoLoading, setPieceRectoLoading] = useState(true)
    const [pieceVersoLoading, setPieceVersoLoading] = useState(true)

    const getUserInfo = useCallback(async () => {
        await dispatch(getConnectedUserData())
        if(selectedParams.id === user.id) {
             const currentUser = store.getState().profile.connectedUser
            setSelectedUser(currentUser)
        }
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserInfo()
        })
        return unsubscribe
    }, [])

    return (
        <>
         <AppActivityIndicator visible={isLoading}/>
         <View style={{
             flex: 1,
             backgroundColor: colors.blanc
         }}>
         <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <View>
            <View style={styles.imageContainer}>
                <View style={styles.avatarContainer}>
                <Avatar
                    loadingContainer={{width: 200, height: 200}}
                    loadingStyle={{width: 100, height: 100}}
                    showNottif={false}
                    otherImageStyle={styles.avatarStyle}
                    ownerUserAvatar={selectedUser.avatar}
                    avatarUrl={{uri: selectedUser.avatar}}/>
                    <AppText style={{fontWeight: 'bold'}}>{selectedUser.username}</AppText>
                </View>
                <View style={styles.pieceContainer}>
                    <View style={styles.pieceImageStyle}>
                        {!selectedUser.pieceIdentite && <AppText style={{fontSize: 15}}>pièce recto</AppText>}
                        {selectedUser.pieceIdentite && <View style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                onLoadEnd={() => setPieceRectoLoading(false)}
                                resizeMode='contain'
                                style={{height: 120, width: 160, borderRadius: 20}}
                                source={{uri: selectedUser.pieceIdentite[0]}}/>
                                {pieceRectoLoading && <View style={styles.loadingContainer}>
                                    <LottieView
                                        loop={true}
                                        autoPlay={true}
                                        style={styles.imageLoading}
                                        source={require('../assets/animations/image-loading')}/>
                                </View>}

                        </View>
                    }

                    </View>
                    <View style={styles.pieceImageStyle}>
                        {!selectedUser.pieceIdentite && <AppText style={{fontSize: 15}}>pièce verso</AppText>}
                        {selectedUser.pieceIdentite?.length>1 &&
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                onLoadEnd={() => setPieceVersoLoading(false)}
                                resizeMode='contain'
                                style={{height: 120, width: 160}}
                                source={{uri: selectedUser.pieceIdentite[1]}}/>
                            {pieceVersoLoading && <View style={styles.loadingContainer}>
                                <LottieView
                                    loop={true}
                                    autoPlay={true}
                                    style={styles.imageLoading}
                                    source={require('../assets/animations/image-loading')}/>
                            </View>}

                        </View>
                        }

                    </View>
                </View>
                {allowEdit && <AppIconButton
                    onPress={() => navigation.navigate('EditUserImagesScreen')}
                    iconSize={40}
                    buttonContainer={styles.cameraStyle}
                    iconName='camera' iconColor='black'/>}
            </View>
            <View style={{
                borderTopWidth: 1,
                marginTop: 20
            }}>
                <View style={{
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: colors.rougeBordeau
                }}>
                    <AppText style={{color: colors.blanc}}>Infos complementaires</AppText>
                </View>
                {allowEdit && <View style={{alignSelf: 'flex-end'}}>
                    <AppButton
                        style={{marginRight: 10}}
                        onPress={() => navigation.navigate('EditUserInfoScreen')}
                        title='Edit infos' iconSize={24}
                        width={150}
                        height={40}
                        color1={colors.leger}
                        color2={colors.leger}
                        color3={colors.leger}
                        iconColor={colors.dark}
                        iconName='edit' textStyle={{marginLeft: 10}}/>
                </View>}
                <View>
                    <AppLabelWithContent label="Nom" content={selectedUser.nom}/>
                    <AppLabelWithContent label="Prenoms" content={selectedUser.prenom}/>
                    <AppLabelWithContent label="Telephone" content={selectedUser.phone}/>
                    <AppLabelWithContent label="Adresse mail" content={selectedUser.email}/>
                    <AppLabelWithContent label="Situation géographique" content={selectedUser.adresse}/>
                    <AppLabelWithContent label="Profession" content={selectedUser.profession} showSeparator={false}/>
                </View>
            </View>
        </View>
         </ScrollView>
         </View>
        </>
    );
}

const styles = StyleSheet.create({
    pieceContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        alignSelf: 'flex-end',
        margin: 40
    },
    pieceImageStyle: {
        width: '45%',
        height: 130,
        marginHorizontal: 5,
        backgroundColor: colors.leger,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    labelStyle: {
        alignItems: 'flex-start',
        margin: 10,
        marginLeft: 10
    },
    imageContainer: {
        height: 430,
        backgroundColor: colors.lightGrey,
        width:'100%',
        paddingVertical:20
    },
    avatarStyle:{
        width: 200,
        height: 200,
        borderRadius: 100
    },
    avatarContainer: {
        position: 'absolute',
        top: 20,
        left: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraStyle: {
        alignSelf: 'flex-end',
        marginRight: 20,
        height: 60,
        width: 60
    },
    imageLoading: {
        height: 80,
        width: 80
    },
    loadingContainer: {
        position: 'absolute',
        backgroundColor: colors.leger,
        height: 120,
        width: 160,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default CompteScreen;