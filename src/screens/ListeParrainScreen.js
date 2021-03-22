import React, {useState, useEffect} from 'react';
import {FlatList, TextInput, View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { EvilIcons } from '@expo/vector-icons';

import ListParrainItem from "../components/parrainage/ListParrainItem";
import {
    getAllParrains,
    getParrainageResponseEdit, getParrainageResponseSend,
    getParrainCompteDetails,
    getSearchCompteParrain, getStopParrainage
} from "../store/slices/parrainageSlice";
import colors from "../utilities/colors";
import {sendParrainageMessage} from "../store/slices/messageSlice";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import AppActivityIndicator from "../components/AppActivityIndicator";

function ListeParrainScreen(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const parrainageState = useSelector(state => {
        const allState = state.entities.parrainage.parrainageState
        const combinedState = allState.parrainsUser?.concat(allState.filleulsUser)
        return combinedState
    })
    const loadingParrainage = useSelector(state => state.entities.parrainage.loading)
    const userParrains = useSelector(state => state.entities.parrainage.userParrains)
    const userFilleuls = useSelector(state => state.entities.parrainage.userFilleuls)
    const parrainageError = useSelector(state => state.entities.parrainage.error)
    const listeAllParrains = useSelector(state => {
      const initialList = state.entities.parrainage.searchCompteList
        const newList = initialList.filter(item => item.UserId !== user.id)
        return newList
    })

    const handleSendMessageToParrain = (parrainCompte) => {
        const data = {
            idSender: user.id,
            idReceiver: parrainCompte.User.id
        }
        dispatch(sendParrainageMessage(data))

    }

    const handleStopParrainage = (compte) => {
        dispatch(getStopParrainage(compte))
        dispatch(getParrainageResponseEdit(compte))
    }

    const handleSearch = (text) => {
        dispatch(getSearchCompteParrain(text))
    }

    const handleSendParrainageResponse = (compte) => {
        dispatch(getParrainageResponseSend(compte))
        dispatch(getParrainageResponseEdit(compte))
    }

    useEffect(() => {
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
          renderItem={({item}) => <ListParrainItem avatarUrl={{uri: item.User.avatar}} ownerUserAvatar={item.User.avatar} parrainNom={item.User.nom}
                                                   parrainPrenom={item.User.prenom} parrainUsername={item.User.username}
                                                   parrainEmail={item.User.email} parrainPhone={item.User.phone}
                                                   parrainQuotite={item.quotite} showParrainDetails={item.showDetails}
                                                   getParrainDetialsShown={() => dispatch(getParrainCompteDetails(item))}
                                                   sendMessageToParrain={() => handleSendMessageToParrain(item)}
                                                   activeCompte={item.active}
                                                   isParrain={userParrains.some(cpte => cpte.id === item.id)}
                                                   isFilleul={userFilleuls.some(filleul => filleul.id === item.id)}
                                                   compteDetailExist={item.User.nom || item.User.prenom || item.User.phone}
                                                   msgResponded={parrainageState.some(cpt => cpt.ParrainFilleul.sponsoringState !== 'pending')}
                                                   inSponsoring={parrainageState.some(cpte => cpte.ParrainFilleul.inSponsoring === true)}
                                                   parrainageResponseEditing={item.editResponse} editParrainageResponse={() => dispatch(getParrainageResponseEdit(item))}
                                                   sendParrainageResponse={()=> handleSendParrainageResponse(item)} stopParrainage={() => handleStopParrainage(item)}/>}/>
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