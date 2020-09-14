import {createSlice} from "@reduxjs/toolkit";
import order from "../../models/order";
import {addToOrder} from '../actionsCreators/orderActionCreator'
import {apiRequest} from '../actionsCreators/apiActionCreator'

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        list: [],
        currentOrder: {},
        loading: false,
        orderSuccess: false,
        error: null,
        newAdded: {}
    },
    reducers: {
        orderRequested: (state, action) => {
            state.loading = true
            state.error = null
        },
        orderRequestFailed: (state, action) => {
            state.loading = false
            state.error  = action.payload
        },
        orderReceived: (state, action) => {
            state.loading = false
            state.error = null
            state.list = action.payload
        },
        orderAdded: (state, action) => {
            state.loading = false
            state.orderSuccess = true
            state.error = null
            state.newAdded = action.payload
        }
    },
    extraReducers: {
        [addToOrder]: (state, action) => {
            //const newOrder = new order(action.payload.items, action.payload.itemsLength, action.payload.amount)
            const order = {
                items: action.payload.items,
                itemsLenght: action.payload.itemsLength,
                amount: action.payload.amount
            }
            state.list.push(order);
            state.currentOrder = order
        }
    }
});

export default orderSlice.reducer;
const {orderAdded, orderReceived, orderRequested, orderRequestFailed} = orderSlice.actions

const url = '/commandes'

export const makeOrder = (order) => apiRequest({
    url,
    method: 'post',
    data: order,
    onStart: orderRequested.type,
    onSuccess: orderAdded.type,
    onError: orderRequestFailed.type
})


export const getAllOrders = () => apiRequest({
    url,
    method: 'get',
    onStart: orderRequested.type,
    onSuccess: orderReceived.type,
    onError: orderRequestFailed.type
})