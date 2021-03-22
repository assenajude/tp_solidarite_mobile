import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, ScrollView, StyleSheet, Image} from 'react-native'

import AppText from "../components/AppText";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import colors from "../utilities/colors";
import {getConnectedUserData} from "../store/slices/userProfileSlice";
import Avatar from "../components/user/Avatar";

function CompteScreen({navigation}) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.profile.loading)
    const currentUser = useSelector(state => state.profile.connectedUser)
    const userPiece = currentUser.pieceIdentite?.length>0

    const getUserInfo = useCallback(async () => {
        await dispatch(getConnectedUserData())
    }, [])

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <>
         <AppActivityIndicator visible={isLoading}/>
         <View style={{
             flex: 1,
             backgroundColor: colors.blanc
         }}>
         <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <View>
            <View style={{top: 20, marginBottom: 10}}>
           <View style={{
               flexDirection: 'row',
               justifyContent: 'space-around'

           }}>
               <View style={{justifyContent: 'center', alignItems: 'center'}}>
                   <Avatar otherImageStyle={{width: 80,height: 80,borderRadius: 40}} ownerUserAvatar={user.avatar} avatarUrl={{uri: user.avatar}}/>
                   <AppText style={{fontWeight: 'bold'}}>{user.username}</AppText>
               </View>
               <View>
                   <AppText style={{color: colors.dark, fontWeight: 'bold'}}>piece identité</AppText>
                   <View style={{flexDirection: 'row'}}>
                   <View style={styles.pieceStyle}>
                      {!userPiece && <View>
                       <AppText>recto</AppText>
                           <AppText>aucune image</AppText>
                       </View>}
                      {currentUser.pieceIdentite?.length>0 && <Image style={styles.pieceImageStyle} source={{uri: currentUser.pieceIdentite[0]}}/>}
                   </View>
                   <View style={styles.pieceStyle}>
                      {!userPiece  && <View>
                       <AppText>verso</AppText>
                           <AppText>aucune image</AppText>
                       </View>}
                       {currentUser.pieceIdentite?.length>1 && <Image style={styles.pieceImageStyle} source={{uri: currentUser.pieceIdentite[1]}}/>}
                   </View>
                   </View>
               </View>
           </View>
            <View style={styles.buttonStyle}>
                <AppButton onPress={() => navigation.navigate('EditUserImagesScreen')} title='Edit images' iconSize={24} iconColor={colors.blanc}
                           iconName='edit' textStyle={{marginLeft: 10}}/>
            </View>
            </View>
            <View style={{
                borderTopWidth: 1
            }}>
                <View style={{
                    alignSelf: 'center',
                    marginBottom: 20,
                    backgroundColor: colors.rougeBordeau
                }}>
                    <AppText style={{color: colors.blanc}}>Vos infos</AppText>
                </View>
                <View style={{alignSelf: 'flex-end'}}>
                    <AppButton style={{marginRight: 10}} onPress={() => navigation.navigate('EditUserInfoScreen')} title='Edit infos' iconSize={24} iconColor={colors.blanc}
                               iconName='edit' textStyle={{marginLeft: 10}}/>
                </View>
                <View style={{alignItems: 'flex-start'}}>
                    <View style={styles.labelStyle}>

                        <AppText style={{fontWeight: 'bold', fontSize: 20}}>Nom</AppText>

                        <AppText>{currentUser.nom}</AppText>
                    </View>
                    <View style={styles.labelStyle}>
                        <AppText style={{fontWeight: 'bold', fontSize: 20}}>Prenom</AppText>
                        <AppText>{currentUser.prenom}</AppText>
                    </View>
                    <View style={styles.labelStyle}>
                        <AppText style={{fontWeight: 'bold', fontSize: 20}}>Telephone</AppText>
                        <AppText>{currentUser.phone}</AppText>
                    </View>
                    <View style={styles.labelStyle}>
                        <AppText style={{fontWeight: 'bold', fontSize: 20}}>Email</AppText>
                        <AppText>{currentUser.email}</AppText>
                    </View>
                    <View style={styles.labelStyle}>
                        <AppText style={{fontWeight: 'bold', fontSize: 20}}>Adresse</AppText>
                        <AppText>{currentUser.adresse}</AppText>
                    </View>
                    <View style={styles.labelStyle}>
                        <AppText style={{fontWeight: 'bold', fontSize: 20}}>Profession</AppText>
                        <AppText>{currentUser.profession}</AppText>
                    </View>
                </View>
            </View>
        </View>
         </ScrollView>
         </View>
        </>
    );
}

const styles = StyleSheet.create({
    pieceStyle: {
        width: 100,
        height: 100,
        backgroundColor: colors.blanc,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        alignSelf: 'flex-end',
        margin: 40
    },
    pieceImageStyle: {
        width: 60,
        height: 60
    },
    labelStyle: {
        alignItems: 'flex-start',
        margin: 10,
        marginLeft: 10
    }
})
export default CompteScreen;