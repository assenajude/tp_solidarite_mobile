import React, { useEffect} from 'react';
import {View,StyleSheet, FlatList, Alert} from 'react-native'
import {useSelector, useDispatch} from "react-redux";

import ListFooter from "../components/list/ListFooter";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import UserAdresseItem from "../components/userAdresse/UserAdresseItem";
import {getAdresseDeleted, getCurrentAdresseSelected} from "../store/slices/userAdresseSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";

function UserAdresseScreen({navigation}) {
    const dispatch = useDispatch()

    const userAdresses = useSelector(state => state.entities.userAdresse.list)
    const user = useSelector(state => state.auth.user)
    const listVille = useSelector(state => state.entities.ville.list)
    const isLoading = useSelector(state => state.entities.userAdresse.loading)

    const isUser = Object.keys(user).length>0

    const getAdresseVille = (adresse) => {
        const villeId = adresse.PointRelai.VilleId
        const selectedVille = listVille.find(ville => ville.id === villeId)
        return selectedVille.nom
    }

    const handleDeleteAdresse =  (adresse) => {
        Alert.alert('Alert!', 'Voulez-vous supprimer definitivement cette adresse?', [{text: 'oui', onPress: () => dispatch(getAdresseDeleted(adresse))},
            {text: 'non', onPress: () => {return;}}
            ], {cancelable: false})
    }

    useEffect(() => {
    })

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            { userAdresses.length>0 && <FlatList data={userAdresses} keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => <UserAdresseItem villeName={getAdresseVille(item)} adresseName={item.nom}
                                                               telephone={item.tel} email={item.email} otherAdresse={item.adresse}
                                                               getAdresseEdit={() => {
                                                                   dispatch(getCurrentAdresseSelected(item))
                                                                   navigation.navigate('AccueilNavigator', {screen: routes.NEW_USER_ADDRESS, params: {mode: 'edit'}})
                                                               }}
                                                               getAdresseDelete={() => handleDeleteAdresse(item)}/>
                      }/>}
            {isUser && userAdresses.length === 0 && <View style={styles.container}>
                <AppText>vous n'avez pas encore ajouté d'adresses.</AppText>
            </View>}
            {!isUser && <View style={styles.container}>
                <AppText>Vous devez vous connecter pour ajouter des adresses.</AppText>
                <AppButton style={{padding: 5}} title='Je me connecte' onPress={() => navigation.navigate('AccueilNavigator', {screen: routes.LOGIN})}/>
            </View>}
            {isUser && <View style={styles.addNewButton}>
            <ListFooter onPress={() =>navigation.navigate('AccueilNavigator', {screen: routes.NEW_USER_ADDRESS, params: {mode: 'addNew'}})}/>
            </View>}

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addNewButton: {
        position: 'absolute',
        right: 20,
        bottom: 50,
    }
})
export default UserAdresseScreen;