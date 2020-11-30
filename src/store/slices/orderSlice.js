import {createSlice} from "@reduxjs/toolkit";
import order from "../../models/order";
import {addToOrder} from '../actionsCreators/orderActionCreator'
import {apiRequest} from '../actionsCreators/apiActionCreator'


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        list: [],
        currentUserOrders: [],
        currentOrder: {},
        demandeCompter: 0,
        contratCompter: 0,
        historiqueCompter: 0,
        loading:false,
        orderSuccess: false,
        error: null,
        newAdded: {},
        userAllData: [],
        servicePayementDate: Date.now(),
        articleRefreshCompter: 0,
        locationRefreshCompter: 0,
        serviceRefreshCompter: 0

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
            const orderList = action.payload
            state.list= orderList
            state.articleRefreshCompter = 0
            state.locationRefreshCompter = 0
            state.serviceRefreshCompter = 0
        },
        currentOrders: (state, action) => {
         state.currentUserOrders = state.list.filter(item => item.typeCmde == action.payload)
            let compterDemande = 0
            let compterHistorique = 0
            let compterContrat = 0
            state.currentUserOrders.forEach(order => {
                if (order.historique) {
                    compterHistorique+=1
                } else if(order.Contrats.length>=1) {
                    compterContrat+=1
                } else {
                    compterDemande+=1
                }
            })
            state.demandeCompter = compterDemande
            state.historiqueCompter = compterHistorique
            state.contratCompter = compterContrat

        },
        orderAdded: (state, action) => {
           const justAdded = action.payload
            state.loading = false
            state.orderSuccess = true
            state.error = null
            state.newAdded = justAdded
            state.list.push(justAdded)
            if(justAdded.typeCmde === 'e-commerce') {
                state.articleRefreshCompter += 1
            } else if(justAdded.typeCmde === 'e-location') {
                state.locationRefreshCompter += 1
            } else {
                state.serviceRefreshCompter += 1
            }
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
        editStatusSuccess: (state, action) => {
            state.loading = false
            let compterDemande = 0
            let compterHistorique = 0
            let compterContrat = 0
            const orderIndex = state.currentUserOrders.findIndex(item => item.id === action.payload.id)
            state.currentUserOrders.splice(orderIndex, 1,action.payload)
            state.currentUserOrders.forEach(item => {
                if (item.historique) {
                    compterHistorique +=1
                } else if(item.Contrats[0] && !item.historique) {
                    compterContrat +=1
                } else {
                    compterDemande +=1
                }
            })
            state.demandeCompter = compterDemande
            state.ContratCompter = compterContrat
            state.historiqueCompter = compterHistorique
        },
        deleteSuccess: (state)=> {
          state.loading = false
          state.error = null
        },
        deleteItem: (state, action) => {
            state.loading = false
            const deletedOrderIndex = state.currentUserOrders.findIndex(item => item.id === action.payload)
           state.currentUserOrders.splice(deletedOrderIndex,1)
        },
        updateContrat: (state, action) => {
            state.error = null
            state.loading = false
            const orderIndex = state.list.findIndex(order => order.id === action.payload.id)
            if(orderIndex >= 0) {
                state.list.splice(orderIndex, 1, action.payload)
            }
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
const {orderAdded,resetOrder,deleteItem,
    editStatusSuccess,deleteSuccess,
    orderReceived,showItemDetail, orderRequested, orderRequestFailed, updateContrat, currentOrders} = orderSlice.actions

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

export const saveStatusEditing = (data) => apiRequest({
    url: url+'/update',
    data,
    method: 'patch',
    onStart: orderRequested.type,
    onSuccess: editStatusSuccess.type,
    onError: orderRequestFailed.type

})


export const createOrderContrat = (data) => apiRequest({
    url: url+'/Contrats',
    data,
    method: 'post',
    onStart: orderRequested.type,
    onSuccess: editStatusSuccess.type,
    onError: orderRequestFailed.type

})

export const getOrderDeleted = (data) => apiRequest({
    url: url+'/delete',
    data,
    method: 'delete',
    onStart: orderRequested.type,
    onSuccess: deleteSuccess.type,
    onError: orderRequestFailed.type
})


export const getDeleteUpdate = (orderId) => dispatch => {
    dispatch(deleteItem(orderId))
}


export const getOrderContratUpdate = (data) => apiRequest({
    url: url+'/contrats/update',
    data,
    method: 'patch',
    onStart: orderRequested.type,
    onSuccess: updateContrat.type,
    onError: orderRequestFailed.type
})