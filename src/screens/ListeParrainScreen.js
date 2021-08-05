import React, {useEffect} from 'react';
import {FlatList, TextInput, View, StyleSheet, Alert} from "react-native";
import {useDispatch, useSelector, useStore} from "react-redux";
import { EvilIcons } from '@expo/vector-icons';

import ListParrainItem from "../components/parrainage/ListParrainItem";
import {
    getAllParrains, getManageParrainage, getParrainageRequestSent,
    getParrainageResponseEdit, getParrainageResponseSend,
    getSearchCompteParrain
} from "../store/slices/parrainageSlice";
import colors from "../utilities/colors";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppActivityIndicator from "../components/AppActivityIndicator";
import routes from "../navigation/routes";
import {getConnectedUserData, getParrainCompterReset} from "../store/slices/userProfileSlice";

function ListeParrainScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()
    const user = useSelector(state => state.auth.user)
    const currentUser = useSelector(state => state.profile.connectedUser)
    const loadingParrainage = useSelector(state => state.entities.parrainage.loading)
    const inSponsoringState = useSelector(state => state.entities.parrainage.inSponsoringState)
    const respondMessageState = useSelector(state => state.entities.parrainage.respondMessageState)
    const userParrains = useSelector(state => state.entities.parrainage.userParrains)
    const userFilleuls = useSelector(state => state.entities.parrainage.userFilleuls)
    const parrainageError = useSelector(state => state.entities.parrainage.error)
    const listeAllParrains = useSelector(state => {
      const initialList = state.entities.parrainage.searchCompteList
        const newList = initialList.filter(item => item.UserId !== user.id)
        return newList
    })

    const handleSendMessageToParrain = (parrainCompte) => {
        const userOk = Object.keys(user).length > 0
        const compteParraingeOk = () => {
            const allComptes = store.getState().entities.parrainage.comptes
            const isUserCompteCreated = allComptes.some(cpt => cpt.UserId === user.id)
            return isUserCompteCreated || false
        }

        if(!userOk) {
            return Alert.alert("Alert", "Vous devez vous connecter pour demander un parrainage",
                [{text: 'me connecter', onPress: () => {
                    navigation.navigate(routes.LOGIN)
                    }}, {text: 'retour', onPress: ()=> {return;}}])
        }
        if(!compteParraingeOk()) {
            return Alert.alert("Alert", "Vous devez creer un compte de parrainge pour demander un parrainage",
                [{text: 'creer', onPress: () => {
                    navigation.navigate('Parrainage', {screen: 'CompteParrainScreen'})
                    }}, {text: 'retour', onPress: ()=> {return;}}])
        }
        const data = {...parrainCompte, idSender: user.id, idReceiver: parrainCompte.UserId}
        dispatch(getParrainageRequestSent(data))

    }

    const handleStopParrainage = (compte) => {
        const compteOrders = compte.Commandes
        const isOrderNotEnded = compteOrders.some(order => order.OrderParrain.ended === false)
        if(isOrderNotEnded) {
            return alert("Vous ne pouvez pas arreter ce compte, des commandes en cours l'utilisent.")
        }
        Alert.alert("Alert", "Voulez-vous arreter le parrainage avec ce compte?",
            [{text: 'oui', onPress: () => {
                dispatch(getManageParrainage({...compte, senderId: user.id, receiverId: compte.UserId, label: 'stop'}))
                dispatch(getParrainageResponseEdit(compte))
                }}, {text: 'non', onPress: () => {return;}}])
    }

    const handleRepriseParrainage = (compte) => {
        Alert.alert("Alert", "Voulez-vous reprendre le parrainage avec ce compte?",
            [{text: 'oui', onPress: () => {
                    dispatch(getManageParrainage({...compte, senderId: user.id, receiverId: compte.UserId, label: 'remake'}))
                    dispatch(getParrainageResponseEdit(compte))
                }}, {text: 'non', onPress: () => {return;}}])
    }

    const handleSearch = (text) => {
        dispatch(getSearchCompteParrain(text))
    }

    const handleSendParrainageResponse = (compte) => {
        dispatch(getParrainageResponseSend({...compte, currentUserId: user.id}))
        dispatch(getParrainageResponseEdit(compte))
        dispatch(getConnectedUserData())
    }

    useEffect(() => {
        if(currentUser.parrainageCompter > 0) {
            dispatch(getParrainCompterReset({currentUserId: user.id}))
        }
    }, [])

    if(listeAllParrains.length === 0 && parrainageError === null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Aucun compte de parrainage trouvé</AppText>
        </View>
    }

    if(parrainageError !== null) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Impossible de charger la liste des comptes de parrainage, nous avons rencontré une erreur</AppText>
            <AppButton onPress={() => dispatch(getAllParrains())} title='recharger'/>
        </View>
    }

    return (
        <>
            <AppActivityIndicator visible={loadingParrainage}/>
            <View style={styles.inputContainer}>
            <TextInput onSubmitEditing={ (event) => handleSearch(event.nativeEvent.text)} style={styles.textInputStyle}
                       placeholder='chercher parrain, nom, prenom, email'/>
                <EvilIcons name="search" size={30} color="black" style={{marginLeft: -25, fontWeight: 'bold'}}/>
            </View>
          <FlatList data={listeAllParrains} keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ListParrainItem
              avatarUrl={{uri: item.User.avatar}}
              ownerUserAvatar={item.User.avatar}
              parrainUsername={item.User.username}
              parrainEmail={item.User?.email?item.User.email : item.User.tel}
              parrainQuotite={item.quotite}
              sendMessageToParrain={() => handleSendMessageToParrain(item)}
              activeCompte={item.active}
              isParrain={userParrains.some(cpte => cpte.id === item.id)}
              isFilleul={userFilleuls.some(filleul => filleul.id === item.id)}
              msgResponded={respondMessageState.some(cpt => cpt.id === item.UserId)}
              inSponsoring={inSponsoringState.some(cpt => cpt.id === item.UserId)}
              parrainageResponseEditing={item.editResponse} editParrainageResponse={() => dispatch(getParrainageResponseEdit(item))}
              sendParrainageResponse={()=> handleSendParrainageResponse(item)} stopParrainage={() => handleStopParrainage(item)}
              remakeParrainage={() => handleRepriseParrainage(item)}
              getUserProfile={() => navigation.navigate(routes.COMPTE, item.User)}/>}/>
        </>
    );
}

const styles = StyleSheet.create({
    textInputStyle: {
        width: "80%",
        backgroundColor: colors.blanc,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    inputContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    }
})
export default ListeParrainScreen;