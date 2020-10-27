import React, {useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from "react-redux";



import {getFactures} from '../store/slices/factureSlice'
import { getOrdersByUser} from '../store/slices/orderSlice'
import routes from "../navigation/routes";
import OrderSuccess from "../components/order/OrderSuccess";

function OrderSuccessScreen({navigation}) {
    const dispatch = useDispatch()
    const newOrder = useSelector(state => state.entities.order.newAdded)

    const getnewOrders = useCallback(async () => {
        await dispatch(getOrdersByUser())
        await dispatch(getFactures())
    }, [dispatch])

    useEffect(()=> {
        getnewOrders()
    }, [])


    if(newOrder.typeCmde === 'e-location') {
        return(
            <OrderSuccess message='Vous devez consulter son status dans vos locations'
                         labelNumNewOrder='CMD Location N°: ' newOrderNum={newOrder.numero}
                         sectionTitle='Mes Locations' goToAccueil={() => navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})}
                         goToOrderSection={() => navigation.navigate('AccueilNavigator', {screen: 'UserLocation'})}/>
        )
    }

    if(newOrder.typeCmde === 'e-service') {
        return (
            <OrderSuccess message='Vous devez consulter son status dans vos services'
                         labelNumNewOrder='CMD Service N°:' newOrderNum={newOrder.numero}
                         goToAccueil={() => navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})}
                         sectionTitle='Mes services' goToOrderSection={() => navigation.navigate('AccueilNavigator', {screen: 'UserServiceScreen'})}/>
        )
    }


    return (
        <OrderSuccess message='Vous devez consulter son status dans vos articles'
                      labelNumNewOrder='CMD Article N°: ' newOrderNum={newOrder.numero}
                      sectionTitle='Mes articles' goToAccueil={() => navigation.navigate('AccueilNavigator', {screen: 'AccueilScreen'})}
                      goToOrderSection={() => navigation.navigate(routes.USER_ORDER)}/>
    );
}


export default OrderSuccessScreen;