import {ADD_ORDER} from "../actions/orderActions";
import Order from "../../models/order";

const initialState = {
    orders: []

}


export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_ORDER:
            const orderData = action.orderData;
            const newOrder = new Order(orderData.items, orderData.itemsNumber, orderData.amount);
            newState = {
                ...state,
                orders: state.orders.concat(newOrder)
            };
            return newState || state

        default:
            return state

    }
}