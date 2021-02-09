import {getConnectedOrdersReset, getOrdersByUser} from "../store/slices/orderSlice";
import {getConnectedFacturesReset, getFacturesByUser} from "../store/slices/factureSlice";
import {getUserProfileAvatar} from "../store/slices/authSlice";
import {getConnectedUserData, getConnectedUserReset} from "../store/slices/userProfileSlice";
import {getConnectedFavoritesReset, getUserFavoris} from "../store/slices/userFavoriteSlice";
import {getAdresse, getConnectedAdressesReset} from "../store/slices/userAdresseSlice";
import {getCartItems} from "../store/slices/shoppingCartSlice";
import {useDispatch, useStore} from "react-redux";
import {getConnectedMessagesReset, getUserMessages} from "../store/slices/messageSlice";

let useAuth;
export default useAuth = () => {
    const dispatch = useDispatch()
    const store = useStore()


    const userRoleAdmin = () => {
        const user = store.getState().auth.user
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

    }

    const resetConnectedUserData = () => {
        dispatch(getConnectedOrdersReset())
        dispatch(getConnectedFacturesReset())
        dispatch(getConnectedFavoritesReset())
        dispatch(getConnectedAdressesReset())
        dispatch(getConnectedMessagesReset())
        dispatch(getConnectedUserReset())
    }

    return {initUserDatas,userRoleAdmin, resetConnectedUserData}
}