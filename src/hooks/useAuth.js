import {getOrdersByUser} from "../store/slices/orderSlice";
import {getFacturesByUser} from "../store/slices/factureSlice";
import {getUserProfileAvatar} from "../store/slices/authSlice";
import {getConnectedUserData} from "../store/slices/userProfileSlice";
import {getUserFavoris} from "../store/slices/userFavoriteSlice";
import {getAdresse} from "../store/slices/userAdresseSlice";
import {getCartItems} from "../store/slices/shoppingCartSlice";
import {useDispatch, useStore} from "react-redux";

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
        const user = store.getState().auth.user
        const isLogged = Object.keys(user).length>0
        if(isLogged){
            dispatch(getUserProfileAvatar())
            dispatch(getConnectedUserData())
        }
        dispatch(getOrdersByUser())
    dispatch(getFacturesByUser())
    dispatch(getUserFavoris())
    dispatch(getAdresse())
    dispatch(getCartItems())
    }

    return {initUserDatas,userRoleAdmin}
}