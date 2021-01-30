import React from 'react';
import {useSelector} from "react-redux";


import routes from "../navigation/routes";
import OrderSuccess from "../components/order/OrderSuccess";

function OrderSuccessScreen({navigation}) {
    const newOrder = useSelector(state => state.entities.order.newAdded)





    if(newOrder.typeCmde === 'location') {
        return(
            <OrderSuccess message='Vous devez consulter son status dans vos locations'
                         labelNumNewOrder='CMD Location N°: ' newOrderNum={newOrder.numero}
                         sectionTitle='Mes Locations' goToAccueil={() => navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})}
                         goToOrderSection={() => navigation.navigate('AccueilNavigator', {screen: 'UserLocation'})}/>
        )
    }

    if(newOrder.typeCmde === 'service') {
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