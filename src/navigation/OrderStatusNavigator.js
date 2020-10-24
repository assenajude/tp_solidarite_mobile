import {createStackNavigator} from '@react-navigation/stack'

import React from 'react';
import colors from "../utilities/colors";
import OrderSuccessScreen from "../screens/OrderSuccessScreen";


const Stack = createStackNavigator()
function OrderStatusNavigator(props) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: colors.rougeBordeau},
            headerTintColor: colors.blanc
        }}>
            <Stack.Screen name='OrderSuccessScreen' component={OrderSuccessScreen} options={{title: ''}}/>
        </Stack.Navigator>
    );
}

export default OrderStatusNavigator;