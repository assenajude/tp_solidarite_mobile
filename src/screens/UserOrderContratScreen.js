import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, FlatList} from "react-native";

import {
  getOrdersByUser
} from "../store/slices/orderSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";
import GetLogin from "../components/user/GetLogin";
import UserOrderItem from "../components/list/UserOrderItem";


function UserOrderContratScreen() {
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.entities.order.loading)
    const listArticleContrat = useSelector(state => state.entities.order.listArticles)
    const error = useSelector(state => state.entities.order.error)
    const user = useSelector(state => state.auth.user)
    const orderRefreshCompter = useSelector(state => state.entities.order.articleRefreshCompter)
    const localContratList = listArticleContrat.filter(item => item.Contrats.length>0 && !item.historique)




    useEffect(() => {
        if(orderRefreshCompter>0) {
            dispatch(getOrdersByUser())
        }
    }, [localContratList])

    if(!user) {
        return <GetLogin message='Veuillez vous connecter pour consulter vos articles..'/>
    }

    if (error !== null) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Erreur...Impossible de consulter vos contrats. Veillez reessayer plutard.</AppText>
            </View>
        )
    }


    return (
        <>
        <AppActivityIndicator visible={isLoading}/>
       {localContratList.length > 0 && !isLoading && error === null && <FlatList data={localContratList} keyExtractor={(item, index) => item.id.toString()}
           renderItem={({item}) =>
               <UserOrderItem
                   order={item}
                   header='A'
                   isContrat={true}
               />
           }/>}
            {localContratList.length === 0 && !isLoading && error === null &&
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AppText>Vous n'avez pas de contrats de commande en cours...</AppText>
            </View> }
            </>
    );
}

export default UserOrderContratScreen;