import {getConnectedOrdersReset, getOrdersByUser} from "../store/slices/orderSlice";
import {getConnectedFacturesReset, getFacturesByUser} from "../store/slices/factureSlice";
import {getUserProfileAvatar} from "../store/slices/authSlice";
import {getConnectedUserData, getConnectedUserReset} from "../store/slices/userProfileSlice";
import {getConnectedFavoritesReset, getUserFavoris} from "../store/slices/userFavoriteSlice";
import {getAdresse, getConnectedAdressesReset} from "../store/slices/userAdresseSlice";
import {getCartItems, getShoppingCartReset} from "../store/slices/shoppingCartSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllParrains,
    getCompteParrainReset,
    getUserParrainageCompte,
    getUserParrains
} from "../store/slices/parrainageSlice";
import dayjs from "dayjs";

let useAuth;
export default useAuth = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const isUser = Object.keys(user).length>0

    const formatPrice = (price) => {
        let formated = 0;
        if(price) {
            formated = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }
        return `${formated} XOF`
    }

    const formatDate = (date) => {
        let formated = 'no date found'
        if(date) formated = dayjs(date).format('DD/MM/YYYY HH:mm:ss')
        return formated
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

    const initUserDatas =  () => {
        dispatch(getUserProfileAvatar())
        dispatch(getConnectedUserData())
        dispatch(getOrdersByUser())
        dispatch(getFacturesByUser())
        dispatch(getUserFavoris())
        dispatch(getAdresse())
        dispatch(getCartItems())
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
        dispatch(getConnectedUserReset())
        dispatch(getCompteParrainReset())
        dispatch(getShoppingCartReset())
    }

    const dataSorter = (data) => {
        let sorTable = data
        if (data && data.length >0) {
            sorTable.sort((a, b) => {
                if(a.createdAt > b.createdAt) return -1
                if(a.createdAt < b.createdAt) return 1
                return 0
            })
        }
        return sorTable
    }

    return {initUserDatas,userRoleAdmin, resetConnectedUserData, formatPrice, formatDate, dataSorter}
}