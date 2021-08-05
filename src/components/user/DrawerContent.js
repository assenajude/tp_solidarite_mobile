import React from 'react'
import {useSelector, useDispatch} from "react-redux";
import {DrawerItem, DrawerContentScrollView} from "@react-navigation/drawer";
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Fontisto,AntDesign,MaterialCommunityIcons, FontAwesome5,Feather, MaterialIcons, EvilIcons, Entypo} from '@expo/vector-icons'

import Color from '../../utilities/colors';
import routes from '../../navigation/routes'
import AppButton from "../AppButton";
import AppIconWithBadge from "../AppIconWithBadge";
import {getLogout} from '../../store/slices/authSlice'
import useAuth from "../../hooks/useAuth";
import Avatar from "./Avatar";
import AppText from "../AppText";

function DrawerContent(props) {
    const dispatch = useDispatch()
    const {userRoleAdmin,resetConnectedUserData} = useAuth()

    const user = useSelector(state => state.auth.user)
    const userData = useSelector(state => state.profile.connectedUser)
    const isUser = useSelector(state => {
        const connetedUser = state.auth.user
        const isLoggedIn = Object.entries(connetedUser).length > 0?true:false
        return isLoggedIn
    })



    const handleLogout = () => {
        dispatch(getLogout())
        resetConnectedUserData()
    }


    return (
        <View style={styles.container}>
           <DrawerContentScrollView {...props}>
               <View style={styles.content}>
                   <View>
                       <View style={styles.avatar}>
                       <View style={{top: 20, marginBottom: 10}}>
                           <Avatar
                               loadingStyle={{height:80, width: 80, marginLeft: 10}}
                               ownerUserAvatar={user.avatar}
                               avatarUrl={{uri: user.avatar}}
                               onPress={() =>props.navigation.navigate(routes.COMPTE, {...user, ...userData})}
                               otherImageStyle={{width: 80,height: 80, borderRadius: 40}}/>
                       </View>
                           <View>
                               <TouchableOpacity onPress={() => props.navigation.navigate(routes.HELP)}>
                                   <View style={{flexDirection: 'row'}}>
                                       <AppIconWithBadge notifStyle={{backgroundColor: Color.rougeBordeau}} badgeCount={userData.helpCompter}>
                                           <View style={{flexDirection: 'row'}}>
                                               <Entypo name="help-with-circle" size={20} color={Color.bleuFbi}/>
                                           </View>
                                       </AppIconWithBadge>
                                       <AppText style={{color: Color.bleuFbi}}>Aide</AppText>
                                   </View>
                               </TouchableOpacity>
                           </View>
                       </View>
                       <View style={styles.usernameStyle}>
                       {isUser && <TouchableOpacity onPress={() => props.navigation.navigate(routes.COMPTE, {...user, ...userData})}>
                       <View style={styles.usernameContainer}>
                           <Text>{user.username}</Text>
                           <EvilIcons style={{fontWeight: 'bold'}} name="chevron-right" size={24} color="black" />
                       </View>
                       </TouchableOpacity>}
                        {!isUser && <View style={styles.logStyle}>
                        <AppButton width={120} height={40} textStyle={{fontSize: 15}} title='Se connecter' onPress={() => {
                            props.navigation.navigate(routes.LOGIN)
                        }}/>
                        <Text>ou</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate(routes.REGISTER)}>
                             <Text style={{marginLeft: 5,color: Color.marronClair}}>Creer un compte</Text>
                            </TouchableOpacity>
                       </View>}
                       </View>
                   </View>

               <View style={styles.mainContent}>
                   <View>
                       <DrawerItem icon={({size, color}) => <AntDesign name='home' size={size} color={color}/>}
                                   label='Accueil' onPress={() => props.navigation.navigate(routes.HOME)} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge badgeCount={userData.favoriteCompter}
                                   notifStyle={{backgroundColor: Color.rougeBordeau, borderRadius: 10}} style={{width: 30}}>
                                  <MaterialIcons name="favorite-border" size={size} color={color}/>
                       </AppIconWithBadge> }
                                   label='Favoris' onPress={() => {props.navigation.navigate(routes.USER_FAVORIS)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge badgeCount={userData.factureCompter}
                                             notifStyle={{backgroundColor: Color.rougeBordeau, borderRadius: 10}} style={{width: 30}}>
                               <FontAwesome5 name='money-bill-alt' size={size} color={color}/>
                           </AppIconWithBadge> }
                                   label='Mes factures' onPress={() => {props.navigation.navigate(routes.USER_FACTURE)}} />

                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge badgeCount={userData.articleCompter}
                                             notifStyle={{backgroundColor: Color.rougeBordeau, borderRadius: 10}} style={{width: 30}}>
                               <Feather name="command" size={size} color={color}/>
                           </AppIconWithBadge> }
                                   label='cmd articles' onPress={() => {props.navigation.navigate(routes.USER_ORDER)}} />
                   </View>

                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge badgeCount={userData.locationCompter}
                                             notifStyle={{backgroundColor: Color.rougeBordeau, borderRadius: 10}} style={{width: 30}}>
                               <MaterialIcons name="store" size={size} color={color}/>
                           </AppIconWithBadge> }
                                   label='cmd locations' onPress={() => {props.navigation.navigate('UserLocation')}} />
                   </View>

                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge badgeCount={userData.serviceCompter}
                                             notifStyle={{backgroundColor: Color.rougeBordeau, borderRadius: 10}} style={{width: 30}}
                                             name="carryout" size={size} color={color}>
                           </AppIconWithBadge> }
                                   label='cmd services' onPress={() => {props.navigation.navigate(routes.USER_SERVICE)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge
                                             notifStyle={{backgroundColor: Color.rougeBordeau, borderRadius: 10}} style={{width: 30}}>
                               <Entypo name="address" size={size} color={color} />
                           </AppIconWithBadge> }
                                   label='Mes adresses' onPress={() => {props.navigation.navigate(routes.USER_ADDRESS)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge badgeCount={userData.parrainageCompter}
                                             notifStyle={{backgroundColor: Color.rougeBordeau, borderRadius: 10}} style={{width: 30}}>
                               <MaterialCommunityIcons name="bus-stop-covered" size={size} color={color} />
                           </AppIconWithBadge> }
                                   label='Parrainage' onPress={() => {props.navigation.navigate('Parrainage')}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge badgeCount={userData.propositionCompter}
                                             notifStyle={{backgroundColor: Color.rougeBordeau, borderRadius: 10}} style={{width: 30}}>
                               <Fontisto name="suitcase-alt" size={size} color={color} />
                           </AppIconWithBadge> }
                                   label='Plans & Propositions' onPress={() => {props.navigation.navigate('AccueilNavigator',{screen: 'PlanPropositionScreen'})}} />
                   </View>


                   {userRoleAdmin() && <View>
                       <DrawerItem
                           icon={({size, color}) => <MaterialCommunityIcons name="dots-horizontal" size={size} color={color} />}
                           label='Gerer' onPress={() => {props.navigation.navigate('OtherMain')}} />
                   </View>}
               </View>
               </View>
           </DrawerContentScrollView>
            {isUser &&
                <AppButton
                    color2={Color.leger}
                    color1={Color.leger}
                    color3={Color.leger}
                    width={'90%'}
                    iconSize={30}
                    textStyle={{marginLeft: 10, color: Color.rougeBordeau}}
                    iconName='logout'
                    iconColor={Color.rougeBordeau}
                    title='Se deconnecter'
                     onPress={() => handleLogout()}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    logStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        color: 'red'
    },

    mainContent: {
        marginTop: 10,
        borderBottomWidth: 0.2,
        borderTopWidth: 0.5

    },
    avatar: {
      flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    avatarStyle:{
        margin:20,
        width: 50
    },
    usernameStyle: {
        marginTop: 15,
        paddingBottom: 10,
        marginHorizontal: 10
    },
    usernameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatarImage: {
        width: 60,
        height: 60,
        borderRadius: 50
    }
})

export default DrawerContent;