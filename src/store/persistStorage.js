import * as SecureStore from "expo-secure-store";
import jwtDecode from 'jwt-decode'
import dayjs from "dayjs";


const tokenKey = 'authToken'

const expireIn = (user) => {
    const creationDate = dayjs(user.iat)
    const maxDate = user.exp
    const now = dayjs(Date.now())
    const difference = now.diff(creationDate, 'second')
    const isExpired = difference > maxDate
    return isExpired
}

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


const removeToken = async () => {
    try{
        await SecureStore.deleteItemAsync(tokenKey)
    } catch (e) {
        console.log('Impossible de supprimer le token', e)
    }
}

const getUser = async () => {
    try{
        const token = await getStoredToken()
        if(!token) return null
        const user = jwtDecode(token)
        if(expireIn(user)) {
            await removeToken()
            return null
        }
        return user
        //return token? jwtDecode(token): null
    } catch (e) {
        console.log(`Impossible d'avoir l'utilisateur`, e)
    }
}


export default {getStoredToken,getUser, storeToken, removeToken}