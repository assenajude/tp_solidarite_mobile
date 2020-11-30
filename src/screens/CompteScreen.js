import React, {useCallback, useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, Text, Image, ScrollView} from 'react-native'
import AppText from "../components/AppText";
import LeftUserCompte from "../components/user/LeftUserCompte";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import colors from "../utilities/colors";
import {getConnectedUserData} from "../store/slices/userProfileSlice";

function CompteScreen({navigation}) {
    const dispatch = useDispatch()
    const avatar = useSelector(state => state.profile.avatar)
    const isLoading = useSelector(state => state.profile.loading)
    const currentUser = useSelector(state => state.profile.connectedUser)

    const getUserInfo = useCallback(async () => {
        await dispatch(getConnectedUserData())
    }, [])

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
         <AppActivityIndicator visible={isLoading}/>
         <ScrollView>

        <View style={{flex: 1}}>
           <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between'
           }}>
               <View style={{marginRight: 50, marginLeft: 20, top: 20}}>
               <LeftUserCompte avatarNotif={false} imageStyle={{width: 80, height: 80}}/>
               </View>
               <View>
                   <AppButton style={{margin: 20}} onPress={() => navigation.navigate('EditUserInfoScreen')} title='Edit profile' iconSize={24} iconColor={colors.blanc}
                              iconName='edit' textStyle={{marginLeft: 10}}/>
               </View>
           </View>
            <View style={{
                alignSelf: 'flex-start',
                marginTop: 30
            }}>
                <AppText>Carte d'identité:</AppText>
            </View>
            <View style={{
                borderTopWidth: 1,
                marginTop: 50
            }}>
                <View style={{
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: colors.rougeBordeau
                }}>
                    <AppText style={{color: colors.blanc}}>Vos infos</AppText>
                </View>
            <View style={{
                alignSelf: 'flex-start',
            }}>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 20
                }}>
                <AppText style={{fontWeight: 'bold' }}>Nom d'utilisateur: </AppText>
                <AppText>{currentUser.username}</AppText>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 20
                }}>
                 <AppText>Nom & Prenom: </AppText>
                <AppText>{currentUser.nom} {currentUser.prenom}</AppText>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 20
                }}>
                <AppText>Telephone: </AppText>
                <AppText>{currentUser.phone}</AppText>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 20
                }}>
                 <AppText>Adresses: </AppText>
                <AppText>{currentUser.adresse}</AppText>
                </View>
            </View>
            </View>
        </View>
         </ScrollView>
        </>
    );
}

export default CompteScreen;