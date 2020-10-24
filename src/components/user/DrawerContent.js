import React, {useState, useEffect} from 'react'
import {useSelector, useStore, useDispatch} from "react-redux";
import {DrawerItem, DrawerContentScrollView} from "@react-navigation/drawer";
import {View,Button, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {AntDesign, FontAwesome, MaterialCommunityIcons, FontAwesome5,Feather, MaterialIcons, EvilIcons, Entypo} from '@expo/vector-icons'

import AppAvatar from "../AppAvatar";
import Color from '../../utilities/colors';
import routes from '../../navigation/routes'
import AppButton from "../AppButton";
import AppIconWithBadge from "../AppIconWithBadge";
import {getLogout} from '../../store/slices/authSlice'
import {getRoleAdmin} from "../../store/selectors/authSelector";
import {getUserOrdersPopulate} from "../../store/slices/orderSlice";

function DrawerContent(props) {
    const store = useStore()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const isLogin = useSelector(state => state.auth.isLoggedIn)


    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
           <DrawerContentScrollView {...props}>
               <View style={styles.content}>
                   <View>
                       <View style={styles.avatar}>
                       <View style={styles.avatarStyle}>
                           <AppAvatar style={{borderRadius: 100}} onPress={() => props.navigation.navigate(routes.COMPTE)}>
                              {isLogin && <Image source={require('../../assets/avatar.jpg')} style={styles.avatarImage}/>}
                               {!isLogin && <AntDesign name='user' size={30} color={Color.leger}/>}
                           </AppAvatar>
                       </View>
                           <View>
                           <TouchableOpacity onPress={() => props.navigation.navigate(routes.NOTIFICATION)}>
                           <AppIconWithBadge name='bells'
                                             color='black' size={24} style={{marginRight: 10}}
                                             notifStyle={{backgroundColor: Color.rougeBordeau}} badgeCount={3} />
                           </TouchableOpacity>
                           </View>
                       </View>
                       <View style={styles.usernameStyle}>
                       {isLogin && <TouchableOpacity onPress={() => props.navigation.navigate(routes.COMPTE)}>
                       <View style={styles.usernameContainer}>
                           <Text>{user.username}</Text>
                           <EvilIcons name="chevron-right" size={24} color="black" />
                       </View>
                       </TouchableOpacity>}
                        {!isLogin && <View style={styles.logStyle}>
                        <AppButton title='Se connecter'  style={{fontSize: 10, marginRight: 5}} onPress={() => {
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
                                   label='Accueil' onPress={() => props.navigation.navigate(routes.ACCUEIL)} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge name='message1' badgeCount={1}
                                             notifStyle={{backgroundColor: Color.rougeBordeau}} size={size} color={color} />}
                           // <AntDesign name='message1' size={24} color={color} />}
                           label='Messages' onPress={() => {props.navigation.navigate(routes.USER_MESSAGE)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) => <MaterialIcons name="favorite-border" size={30} color={color} /> }
                                   label='Favoris' onPress={() => {props.navigation.navigate(routes.USER_FAVORIS)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) => <FontAwesome5 name='money-bill-alt' size={size} color={color}/>}
                                   label='Vos factures' onPress={() => {props.navigation.navigate(routes.USER_FACTURE)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) => <Feather name="command" size={size} color={color} />}
                                   label='Vos commandes' onPress={() => {props.navigation.navigate(routes.USER_ORDER)}} />
                   </View>

                   <View>
                       <DrawerItem icon={({size, color}) => <MaterialCommunityIcons name="store" size={size} color={color} />}
                                   label='Vos locations' onPress={() => {props.navigation.navigate('UserLocation')}} />
                   </View>

                   <View>
                       <DrawerItem icon={({size, color}) => <AntDesign name="carryout" size={size} color={color} />}
                                   label='Vos services' onPress={() => {props.navigation.navigate(routes.USER_SERVICE)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) => <Entypo name="address" size={size} color={color} />}
                                   label='Vos adresses' onPress={() => {props.navigation.navigate(routes.USER_ADDRESS)}} />
                   </View>


                   {getRoleAdmin(store.getState()) && <View>
                       <DrawerItem icon={({size, color}) => <MaterialCommunityIcons name="dots-horizontal" size={size} color={color} />}
                                   label='Gerer' onPress={() => {props.navigation.navigate('OtherMain')}} />
                   </View>}
                   <View>
                       <DrawerItem icon={({size, color}) => <AntDesign name="setting" size={size} color={color} />}
                                   label='Paramètres' onPress={() => {props.navigation.navigate(routes.PARAM)}} />
                   </View>
               </View>
               </View>
           </DrawerContentScrollView>
            {isLogin && <Button title='Se déconnecter' color={Color.rougeBordeau} onPress={() => dispatch(getLogout())}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    logStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonStyle: {
        color: 'red'
    },

    mainContent: {
        marginTop: 10,
        borderBottomWidth: 0.2,

    },
    avatar: {
      flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatarStyle:{
        marginLeft: 10,
        width: 50
    },
    usernameStyle: {
        marginTop: 15,
        paddingBottom: 10,
        borderBottomWidth: 0.2
    },
    usernameContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between'
    },
    avatarImage: {
        width: 60,
        height: 60,
        borderRadius: 40
    }
})

export default DrawerContent;