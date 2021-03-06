import {getConnectedOrdersReset, getOrdersByUser} from "../store/slices/orderSlice";
import {getConnectedFacturesReset, getFacturesByUser} from "../store/slices/factureSlice";
import {getUserProfileAvatar} from "../store/slices/authSlice";
import {getConnectedUserData, getConnectedUserReset} from "../store/slices/userProfileSlice";
import {getConnectedFavoritesReset, getUserFavoris} from "../store/slices/userFavoriteSlice";
import {getAdresse, getConnectedAdressesReset} from "../store/slices/userAdresseSlice";
import {getCartItems, getShoppingCartReset} from "../store/slices/shoppingCartSlice";
import {useDispatch, useSelector} from "react-redux";
import {getConnectedMessagesReset, getUserMessages} from "../store/slices/messageSlice";
import {
    getAllParrains,
    getCompteParrainReset,
    getUserParrainageCompte,
    getUserParrains
} from "../store/slices/parrainageSlice";

let useAuth;
export default useAuth = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const isUser = Object.keys(user).length>0

    const formatPrice = (price) => {
        const formated = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        return `${formated} XOF`
    }

    const userRoleAdmin = () => {
        if (Object.entries(user).length > 0){
            const adminIndex = user.roles.indexOf('ROLE_ADMIN')
            if(adminIndex !== -1) {
                return true
            } else return false
        }
        return false
    }

    const initUserDatas = () => {
        dispatch(getUserProfileAvatar())
        dispatch(getConnectedUserData())
        dispatch(getOrdersByUser())
        dispatch(getFacturesByUser())
        dispatch(getUserFavoris())
        dispatch(getAdresse())
        dispatch(getCartItems())
        dispatch(getUserMessages())
        if(isUser) {
        dispatch(getAllParrains({userId: user.id}))
        dispatch(getUserParrainageCompte({userId: user.id}))
        dispatch(getUserParrains({userId: user.id}))
        }


    }

    const resetConnectedUserData = () => {
        dispatch(getConnectedOrdersReset())
        dispatch(getConnectedFacturesReset())
        dispatch(getConnectedFavoritesReset())
        dispatch(getConnectedAdressesReset())
        dispatch(getConnectedMessagesReset())
        dispatch(getConnectedUserReset())
        dispatch(getCompteParrainReset())
        dispatch(getShoppingCartReset())
    }

    return {initUserDatas,userRoleAdmin, resetConnectedUserData, formatPrice}
}