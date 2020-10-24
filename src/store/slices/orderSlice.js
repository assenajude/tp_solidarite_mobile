import {createSlice} from "@reduxjs/toolkit";
import order from "../../models/order";
import {addToOrder} from '../actionsCreators/orderActionCreator'
import {apiRequest} from '../actionsCreators/apiActionCreator'


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        currentUserOrders: [],
        currentOrder: {},
        loading:false,
        orderSuccess: false,
        error: null,
        newAdded: {},
        userAllData: [],
        servicePayementDate: Date.now(),

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
            const orderList = action.payload
            state.loading = false
            state.currentUserOrders= orderList
            state.error = null
        },
        currentOrders: (state, action) => {
          const userOrders = state.currentUserOrders.filter(item => item.typeCmde === action.payload)
            state.currentUserOrders = userOrders
        },
        orderAdded: (state, action) => {
            state.loading = false
            state.orderSuccess = true
            state.error = null
            state.newAdded = action.payload
            state.currentUserOrders.push(action.payload)
            state.list.push(action.payload)
        },
        resetOrder: (state) => {
            state.currentOrder = {}
            state.servicePayementDate = Date.now()
        },
        showItemDetail: (state, action) => {
            const selectedItem = state.currentUserOrders.find(item => item.id === action.payload)
            if(selectedItem.showDetails) {
                selectedItem.showDetails = false
            } else {
                selectedItem.showDetails = true
            }
            const otherOrders = state.currentUserOrders.filter(item => item.id !== selectedItem.id)
            otherOrders.forEach(item => item.showDetails = false)
        },

        startEditStatus: (state, action) => {
            const selectedItem =  state.currentUserOrders.find(item => item.id === action.payload.id)

            const label = action.payload.libelle

            if(selectedItem[label]) {
            selectedItem[label] = false
            } else {
                selectedItem[label] = true
            }
            const otherItems = state.currentUserOrders.filter(item => item.id !== selectedItem.id)
            otherItems.forEach(item => {
                item[label]= false
            })
        },
        editingContrat: (state, action) => {
            const selectedOrder = state.currentUserOrders.find(order => order.id === action.payload.id)
            if(selectedOrder.editContrat) {
                selectedOrder.editContrat = false
            } else {
                selectedOrder.editContrat = true
            }
            const otherContrats = state.currentUserOrders.filter(item => item.id !== action.payload)
            otherContrats.forEach(contrat => contrat.editContrat = false)
        },
        editStatusSuccess: (state, action) => {
            state.loading = false
            let editedItem = state.currentUserOrders.find(item => item.id === action.payload.id)
            editedItem.statusAccord = action.payload.statusAccord
            editedItem.statusLivraison = action.payload.statusLivraison
            editedItem.contrats = action.payload.contrats
       /*     const itemIndex = state.currentUserOrders.findIndex(item => item.id === action.payload.id)
            state.currentUserOrders = state.currentUserOrders.splice(itemIndex, 1, action.payload)*/
        },
        itemHistory: (state, action) => {
           state.loading = false
            let selectedItem = state.currentUserOrders.find(item => item.id === action.payload.id)
            selectedItem.historique = action.payload.historique
        },
        deleteItem: (state, action) => {
            state.loading = false
           /* const deletedOrderIndex = state.currentUserOrders.findIndex(item  => item.id === action.payload.id)
            state.currentUserOrders.splice(deletedOrderIndex,1)*/
           state.currentUserOrders = state.currentUserOrders.filter(item => item.id !== action.payload.id)
        }
    },
    extraReducers: {
        [addToOrder]: (state, action) => {
            const order = {
                items: action.payload.items,
                itemsLenght: action.payload.itemsLength,
                amount: action.payload.amount,
                type: action.payload.type,
                date: action.serviceDate
            }
            state.list.push(order);
            state.currentOrder = order
        }
    }
});

export default orderSlice.reducer;
const {orderAdded,resetOrder, itemHistory, deleteItem,
    editStatusSuccess,
    orderReceived,showItemDetail, orderRequested, orderRequestFailed, editingContrat, currentOrders, startEditStatus} = orderSlice.actions

const url = '/commandes'

export const makeOrder = (order) => apiRequest({
    url,
    method: 'post',
    data: order,
    onStart: orderRequested.type,
    onSuccess: orderAdded.type,
    onError: orderRequestFailed.type
})


export const getOrdersByUser = () => apiRequest({
    url: url+'/byUser',
    method: 'get',
    onStart: orderRequested.type,
    onSuccess: orderReceived.type,
    onError: orderRequestFailed.type
})

export const getCurrentOrders = (libelle) => dispatch => {
    dispatch(currentOrders(libelle))
}



export const getOrderReset = () => dispatch => {
    dispatch(resetOrder())
}



export const getItemDetail = (orderId) => dispatch => {
    dispatch(showItemDetail(orderId))
}

export const getStatusEditing = (data) => dispatch => {
    dispatch(startEditStatus(data))
}

export const saveStatusEditing = (data) => apiRequest({
    url: url+'/update',
    data,
    method: 'patch',
    onStart: orderRequested.type,
    onSuccess: editStatusSuccess.type,
    onError: orderRequestFailed.type

})

export const updateHistory = (data) => apiRequest({
    url: url+'/update',
    data,
    method: 'patch',
    onStart: orderRequested.type,
    onSuccess: itemHistory.type,
    onError: orderRequestFailed.type
})

export const createOrderContrat = (data) => apiRequest({
    url: '/contrats',
    data,
    method: 'post',
    onStart: orderRequested.type,
    onSuccess: editStatusSuccess.type,
    onError: orderRequestFailed.type

})

export const getContratEdit = (order) => dispatch => {
    dispatch(editingContrat(order))
}
export const saveContratEdit = (data) => apiRequest({
    url: url+'/contrats',
    data,
    method: 'patch',
    onStart: orderRequested.type,
    onSuccess: editStatusSuccess.type,
    onError: orderRequestFailed.type
})


export const getOrderDeleted = (data) => apiRequest({
    url: url+'/delete',
    data,
    method: 'delete',
    onStart: orderRequested.type,
    onSuccess: deleteItem.type,
    onError: orderRequestFailed.type
})
