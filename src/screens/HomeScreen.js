import React, {useEffect, useCallback, useState} from 'react';
import {ScrollView, View, StyleSheet,TouchableOpacity} from "react-native";
import { EvilIcons } from '@expo/vector-icons';

import colors from "../utilities/colors";
import Avatar from "../components/user/Avatar";
import {useDispatch, useSelector} from "react-redux";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import AppText from "../components/AppText";
import useAuth from "../hooks/useAuth";
import {getAllEspaces} from "../store/slices/espaceSlice";
import {loadCategories} from "../store/slices/categorieSlice";
import {loadPayements} from "../store/slices/payementSlice";
import {loadPlans} from "../store/slices/planSlice";
import {loadArticles} from "../store/slices/articleSlice";
import {getAllLocation} from "../store/slices/locationSlice";
import {loadRelais} from "../store/slices/pointRelaisSlice";
import {getAllPropositions} from "../store/slices/propositionSlice";
import {getAllVilles} from "../store/slices/villeSlice";
import {getTranches} from "../store/slices/trancheSlice";
import {getServices} from "../store/slices/serviceSlice";
import {getAllParrains} from "../store/slices/parrainageSlice";
import AppIconButton from "../components/AppIconButton";
import routes from "../navigation/routes";
import HomeCard from "../components/HomeCard";
import useMainFeatures from "../hooks/useMainFeatures";
import {getRefreshing, getSelectedOptions} from "../store/slices/mainSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import LottieView from 'lottie-react-native'

function HomeScreen({navigation}) {
    const dispatch = useDispatch()
    const {initUserDatas, resetConnectedUserData} = useAuth()
    const {getProductsByCategories, getBestSellerArticles, getFlashPromo} = useMainFeatures()
    const user = useSelector(state => state.auth.user)
    const cartLoading = useSelector(state => state.entities.shoppingCart.loading)
    const cartItemLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    const mainDatas = useSelector(state => state.entities.main.searchList)
    const refreshNotif = useSelector(state => state.entities.main.homeCounter)
    const mainLoading = useSelector(state => state.entities.main.loading)
    const [categorieLoading, setCategorieLoading] = useState(true)
    const [isHotSelected, setIsHotSelected] = useState(true)
    const [isAllSelected, setIsAllSelected] = useState(false)

    setTimeout(() => {
        setCategorieLoading(false)
    }, 2000)

    const getStarted = useCallback( () => {
        dispatch(loadArticles())
        dispatch(getAllLocation())
        dispatch(getAllEspaces())
        dispatch(loadCategories())
        dispatch(loadPayements())
        dispatch(loadPlans())
        dispatch(loadRelais())
        dispatch(getAllPropositions())
        dispatch(getAllVilles())
        dispatch(getTranches())
        dispatch(getServices())
        dispatch(getServices())
        dispatch(getAllParrains())
    }, [])




    useEffect(() => {
        resetConnectedUserData()
        if (Object.keys(user).length>0) {
            initUserDatas()
        }
        getStarted()
        const unsubscribe = navigation.addListener('focus',() => {
            setIsHotSelected(true)
            setIsAllSelected(false)
        } )
        return unsubscribe
    }, []);

    return (
        <>
            <AppActivityIndicator visible={cartLoading || mainLoading}/>
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 30,
                backgroundColor: colors.blanc
            }}>

            <View style={styles.headerStyle}>
                <View style={styles.avatar}>
                    <View style={styles.avatarWithValue}>
                    <Avatar
                        onPress={() =>navigation.openDrawer()}
                        showNottif={true}
                        ownerUserAvatar={user.avatar}
                        avatarUrl={{uri: user.avatar}}/>
                        <AppText onPress={() => navigation.openDrawer()} style={styles.infoStyle}>Compte</AppText>
                    </View>
                    <View style={styles.avatarWithValue}>
                    <CartIconRight
                        cartLenght={cartItemLenght}
                        getToCartScreen={() => navigation.navigate('AccueilNavigator', {screen: 'ShoppingCartScreen'})}/>
                        <AppText onPress={() => navigation.navigate('AccueilNavigator', {screen: 'ShoppingCartScreen'})} style={[styles.infoStyle, {marginRight: 0}]}>Panier</AppText>
                    </View>
                </View>
                <View style={styles.headerInfo}>
                    <AppText style={{color: colors.blanc, fontSize: 15, marginLeft: 40}}>sabbat-confort</AppText>
                    <AppText style={{marginTop: -10, fontSize: 24, color: colors.blanc}}>Tout le confort à portée de main.</AppText>
                </View>
                <View style={styles.secondHeader}>
                </View>
               {refreshNotif>0 && <TouchableOpacity onPress={() => dispatch(getRefreshing())} style={styles.refresh}>
                    <EvilIcons name="refresh" size={26} color={colors.bleuFbi} />
                    <AppText style={styles.notif}>{refreshNotif}</AppText>
                </TouchableOpacity>}
            </View>
            <View style={{
                position: 'absolute',
                top: 250
            }}>
            <View>
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 20
                    }}
                    horizontal={true}>
                    {getProductsByCategories().slice(0,10).map((item, index) =>
                        <HomeCard
                            getProductLink={() => navigation.navigate(routes.ACCUEIL, {...item, headerTitle: item.Categorie.libelleCateg})}
                            getProductDetails={() => navigation.navigate(routes.ACCUEIL, {...item, headerTitle: item.Categorie.libelleCateg})}
                            firstPrice={item.firstPrice}
                            secondPrice={item.secondPrice}
                            key={index.toString()}
                            item={item}
                            productLength={item.productLength}
                        />
                    )}
                </ScrollView>
                {getProductsByCategories().length === 0 &&
                <View style={{
                    position: 'absolute',
                    width: 500,
                    alignItems: 'flex-start',
                    paddingLeft: 100,
                    height: 335,
                    backgroundColor: colors.leger
                }}>
                    <LottieView source={require('../assets/animations/loading')} style={{height:100, width: 100}} loop={true} autoPlay={true}/>
                    <AppText>loading categories...</AppText>
                </View>}
            </View>
            </View>
            <View style={styles.contentStyle}>
                <AppText
                    onPress={() => {
                        setIsHotSelected(true)
                        setIsAllSelected(false)
                    }}
                    style={{
                        fontWeight: isHotSelected?'bold':'normal',
                        color: isHotSelected?colors.bleuFbi :'#4e4e4e',
                        textDecorationLine: isHotSelected? 'none' : 'underline'
                    }} >Quoi de neuf?</AppText>
                <AppText
                    onPress={() => {
                        setIsAllSelected(true)
                        setIsHotSelected(false)
                        navigation.navigate(routes.ACCUEIL, {all: true, headerTitle: 'Tous les produits'})
                    }}
                    style={{
                        fontWeight: isAllSelected?'bold':'normal',
                        color: isAllSelected?colors.bleuFbi :'#4e4e4e',
                        textDecorationLine: isAllSelected? 'none' : 'underline'
                    }}>Voir tout</AppText>
            </View>
            <View style={{
                marginVertical: 20
            }}>
                <ScrollView
                    contentContainerStyle={{
                        paddingHorizontal: 20
                    }}
                    horizontal={true}>
                    {mainDatas.map((item, index) =>
                        <HomeCard
                            getProductDetails={() => {
                                dispatch(getSelectedOptions(item))
                                navigation.navigate('AccueilNavigator',{screen:item.Categorie.typeCateg === 'article'?routes.ARTICLE_DETAIL : routes.LOCATION_DETAIL, params: item})
                            }}
                            descripLineNumber={3}
                            showCategorie={false}
                            key={index.toString()}
                            item={item}/>
                    )}
                </ScrollView>
            </View>
            <View>
                <View style={styles.infoCardContainer}>
                    <View style={[styles.infoCard, {backgroundColor: 'tomato'}]}>
                        <AppIconButton
                            onPress={() => navigation.navigate(routes.ACCUEIL, {products: getBestSellerArticles(),headerTitle: 'Best seller'})}
                            buttonContainer={styles.infoCardIcon}
                            iconColor={'#557157'}
                            iconName='caretright'/>
                        <AppText style={styles.infoText}>Mieux vaut tard que jamais.</AppText>
                        <AppText style={[styles.secondTextInfo, {marginTop: -10}]}>Nos meilleurs ventes.</AppText>
                    </View>
                    <View style={[styles.infoCard, {backgroundColor: '#b7ebbb'}]}>
                        <AppIconButton
                            onPress={() => navigation.navigate(routes.ACCUEIL, {products: getFlashPromo().currentFlash, headerTitle: 'Vente Flash du jour'})}
                            buttonContainer={styles.infoCardIcon}
                            iconColor={'#557157'}
                            iconName='caretright'/>
                        <AppText style={styles.infoText}>Ajourd'hui ou jamais!</AppText>
                        <AppText style={styles.secondTextInfo}>Les Ventes flash du jour.</AppText>
                    </View>
                </View>
                <View style={styles.infoCardContainer}>
                    <View style={[styles.infoCard, {backgroundColor: colors.bleuFbi}]}>
                        <AppIconButton
                            onPress={() => navigation.navigate(routes.ACCUEIL, {products: getFlashPromo().otherFlash, headerTitle: 'Vente Flash à venir'})}
                            buttonContainer={styles.infoCardIcon}
                            iconColor={'#557157'}
                            iconName='caretright'/>
                        <AppText style={styles.infoText}>Croire en l'avenir!</AppText>
                        <AppText style={styles.secondTextInfo}>Les ventes flash à venir.</AppText>
                    </View>
                    <View style={[styles.infoCard, {backgroundColor: colors.or}]}>
                        <AppText style={styles.infoText}>Qui dit mieux?</AppText>
                        <AppText style={styles.secondTextInfo}>Consulter toutes les categories</AppText>
                        <AppIconButton
                            onPress={() => navigation.navigate('OtherMain',{screen: routes.CATEGORIE})}
                            buttonContainer={styles.infoCardIcon}
                            iconColor={'#557157'}
                            iconName='caretright'/>
                    </View>
                </View>
            </View>
        </ScrollView>
            {/*<Modal transparent visible={getProductsByCategories().length === 0}>
                <View style={{
                    top: 200,
                    width: '100%',
                    height: 335,
                    alignItems: 'center',
                    backgroundColor: colors.leger
                }}>
                    <LottieView source={require('../assets/animations/loading')} style={{height:100, width: 100}} loop={true} autoPlay={true}/>
                    <AppText>loading categories...</AppText>
                </View>
            </Modal>*/}
            </>
    );
}

const styles = StyleSheet.create({
    avatar: {
      marginVertical: 40,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatarWithValue: {
      alignItems: 'center'
    },
    categorieList: {
      position: 'absolute',
        top: 100

    },
    infoStyle: {
        fontSize: 15,
        marginTop:-10,
        marginRight: -10,
        fontWeight: 'bold',
        color: colors.blanc
    },

    contentStyle: {
      marginTop: 160,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },

    headerStyle: {
        height: 450,
        width: '100%',
        backgroundColor: colors.rougeBordeau
    },

    headerInfo: {
        alignItems: 'flex-start',
        marginTop: -20,
        marginHorizontal: 20,
        width: 245,
        position: 'absolute',
        top: 120,
        left: 70
    },
    notif: {
      position: 'absolute',
        fontSize: 15,
      right: -25,
      top: -40,
        color: colors.blanc
    },
    secondHeader: {
        width: 0,
        height: 0,
        backgroundColor:colors.rougeBordeau,
        borderStyle: "solid",
        borderRightWidth: 200,
        borderTopWidth: 200,
        borderRightColor: "transparent",
        borderTopColor: colors.leger,
        position: 'absolute',
        bottom: 0,
        left: 0,
        transform: [{ rotate: "270deg" }]
    },
    infoCard: {
        height: 180,
        width: 170,
        borderRadius: 10
    },
    infoCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 20,

    },
    infoCardIcon: {
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 25,
        right: 0,
        bottom: 0
    },
    infoText:{
        fontSize: 22,
        color: colors.blanc,
        marginTop: 5,
    },
    refresh: {
      position: 'absolute',
      left: 20,
      top: 130,
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: colors.blanc
    },

    secondTextInfo:{
        color: colors.blanc,
        marginTop: -10}
})
export default HomeScreen;