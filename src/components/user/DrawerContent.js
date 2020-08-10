import React, {useState} from 'react'
import {DrawerItem, DrawerContentScrollView} from "@react-navigation/drawer";
import {View,Button, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {AntDesign, FontAwesome, MaterialCommunityIcons, FontAwesome5,Feather, MaterialIcons, EvilIcons, Entypo} from '@expo/vector-icons'

import AppAvatar from "../AppAvatar";
import Color from '../../utilities/colors';
import routes from '../../navigation/routes'
import AppButton from "../AppButton";
import AppIconWithBadge from "../AppIconWithBadge";

function DrawerContent(props) {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('kouakou Pauin')
    return (
        <View style={styles.container}>
           <DrawerContentScrollView {...props}>
               <View style={styles.content}>
                   <View>
                       <View style={styles.avatar}>
                       <View style={styles.avatarStyle}>
                           <AppAvatar style={{borderRadius: 100}} onPress={() => props.navigation.navigate(routes.USER_INFO)}>
                               <Image source={require('../../assets/avatar.jpg')} style={styles.avatarImage}/>
                           </AppAvatar>
                       </View>
                           <TouchableOpacity onPress={() => props.navigation.navigate(routes.USER_NOTIF)}>
                           <AppIconWithBadge name='bells'
                                             color='black' size={24} style={{marginRight: 10}}
                                             notifStyle={{backgroundColor: Color.rougeBordeau}} badgeCount={3} />
                           </TouchableOpacity>
                       </View>
                       <View style={styles.usernameStyle}>
                       {isLogin && <TouchableOpacity onPress={() => props.navigation.navigate(routes.USER_INFO)}>
                       <View style={styles.usernameContainer}>
                           <Text>{username}</Text>
                           <EvilIcons name="chevron-right" size={24} color="black" />
                       </View>
                       </TouchableOpacity>}
                        {!isLogin && <View style={styles.logStyle}>
                        <AppButton title='Se connecter'  style={{fontSize: 10, marginRight: 5}} onPress={() => {
                            setIsLogin(true)
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
                       <DrawerItem icon={({size, color}) => <AntDesign name='home' size={24} color={color}/>}
                                   label='Accueil' onPress={() => props.navigation.navigate(routes.ACCUEIL)} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) =>
                           <AppIconWithBadge name='message1' badgeCount={1}
                                             notifStyle={{backgroundColor: Color.rougeBordeau}} size={size} color={color} />}
                           // <AntDesign name='message1' size={24} color={color} />}
                           label='Messages' onPress={() => {props.navigation.navigate(routes.MESSAGE)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) => <Feather name="command" size={size} color={color} />}
                                   label='Commande' onPress={() => {props.navigation.navigate(routes.ORDER)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) => <Entypo name="address" size={size} color={color} />}
                                   label='Adresses' onPress={() => {props.navigation.navigate(routes.ORDER)}} />
                   </View>

                   <View>
                       <DrawerItem icon={({size, color}) => <FontAwesome5 name='money-bill-alt' size={24} color={color}/>}
                           label='Factures' onPress={() => {props.navigation.navigate(routes.FACTURE)}} />
                   </View>

                   <View>
                       <DrawerItem icon={({size, color}) => <FontAwesome name="shopping-bag" size={size} color={color} />}
                           label='Articles' onPress={() => {props.navigation.navigate(routes.ARTICLE)}} />
                   </View>

                   <View>
                       <DrawerItem icon={({size, color}) => <MaterialCommunityIcons name="store" size={24} color={color} />}
                                   label='Locations' onPress={() => {props.navigation.navigate(routes.LOCATION)}} />
                   </View>

                   <View>
                       <DrawerItem icon={({size, color}) => <MaterialIcons name="favorite-border" size={24} color={color} /> }
                           label='Favoris' onPress={() => {props.navigation.navigate(routes.FAVORIS)}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) => <MaterialCommunityIcons name="dots-horizontal" size={size} color={color} />}
                                   label='Autres' onPress={() => {props.navigation.navigate('Other')}} />
                   </View>
                   <View>
                       <DrawerItem icon={({size, color}) => <AntDesign name="setting" size={24} color={color} />}
                                   label='Paramètres' onPress={() => {props.navigation.navigate(routes.PARAM)}} />
                   </View>
               </View>
               </View>
           </DrawerContentScrollView>
            {isLogin && <Button title='Se déconnecter' color={Color.rougeBordeau} onPress={() => setIsLogin(false)}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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