import * as SecureStore from "expo-secure-store";
import jwtDecode from 'jwt-decode'


const tokenKey = 'authToken'

const storeToken  = async authToken => {
    try{
    await SecureStore.setItemAsync(tokenKey, authToken)
    } catch (e) {
        console.log('Impossible de persister le token', e)
    }
}



const getStoredToken = async () => {
    try {
        return SecureStore.getItemAsync(tokenKey)
    } catch (e) {
        console.log(`Impossible d'obtenir le token,  ${e}`)
    }
}


const getUser = async () => {
    try{
        const token = await getStoredToken()
        return token? jwtDecode(token): null
    } catch (e) {
        console.log(`Impossible d'avoir l'utilisateur`, e)
    }
}

const removeToken = async () => {
    try{
        await SecureStore.deleteItemAsync(tokenKey)
    } catch (e) {
        console.log('Impossible de supprimer le token', e)
    }
}


export default {getStoredToken,getUser, storeToken, removeToken}