import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, ScrollView} from 'react-native'
import AppText from "../components/AppText";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import colors from "../utilities/colors";
import {getConnectedUserData} from "../store/slices/userProfileSlice";
import AppLabelWithValue from "../components/AppLabelWithValue";
import Avatar from "../components/user/Avatar";

function CompteScreen({navigation}) {
    const dispatch = useDispatch()
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
         <View style={{
             flex: 1,
             backgroundColor: colors.blanc
         }}>
         <ScrollView>
        <View>
           <View style={{
               flexDirection: 'row',
               justifyContent: 'space-between',

           }}>
               <View style={{marginRight: 50, top: 20}}>
                   <Avatar showUsername={true} otherImageStyle={{width: 80,height: 80}}/>
               </View>
               <View>
                   <AppButton style={{margin: 20}} onPress={() => navigation.navigate('EditUserInfoScreen')} title='Edit profile' iconSize={24} iconColor={colors.blanc}
                              iconName='edit' textStyle={{marginLeft: 10}}/>
               </View>
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
                <View>
                    <AppLabelWithValue label="Nom: " labelValue={currentUser.nom}/>
                    <AppLabelWithValue label="Prenom: " labelValue={currentUser.prenom}/>
                    <AppLabelWithValue label="Telephone: " labelValue={currentUser.phone}/>
                    <AppLabelWithValue label="E-mail: " labelValue={currentUser.email}/>
                    <AppLabelWithValue label="Adresse: " labelValue={currentUser.adresse}/>
                </View>
            </View>
        </View>
         </ScrollView>
         </View>
        </>
    );
}

export default CompteScreen;