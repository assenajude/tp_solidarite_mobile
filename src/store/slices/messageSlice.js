import {apiRequest} from "../actionsCreators/apiActionCreator";
import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        userMessages: [],
        selectedMsgResponses: [],
        loading: false,
        error: null,
        newMsgCompter: 0
    },
    reducers: {
        messageRequested: (state)=> {
            state.laoding = true
           state.error = null
        },
        messageRequestFailed: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        messageReceived: (state, action) => {
            state.loading = false
                const messages = action.payload
                messages.sort((a, b) => {
                if(b.createdAt < a.createdAt ) return -1
                if (b.createdAt > a.createdAt) return 1
                return 0;
            })
            state.userMessages = messages

        },
        updateMessage: (state, action) => {
            state.loading = false
            state.error = null
            let selectedMessage = state.userMessages.find(item => item.id === action.payload.id)
            selectedMessage.isRead = action.payload.isRead
            selectedMessage.content = action.payload.content
            selectedMessage.mgsHeader = action.payload.msgHeader
        },
        getMessageRead: (state, action) => {
            let selectedMessage = state.userMessages.find(item => item.id === action.payload.id)
            selectedMessage.getRead = !selectedMessage.getRead
            const otherMessages = state.userMessages.filter(msg => msg.id !== selectedMessage.id)
            otherMessages.forEach(message => message.getRead = false)
            const responses = selectedMessage.MsgResponses
            state.selectedMsgResponses = responses
            state.newMsgCompter--
        },
        incrementMsgCompter:(state) =>{
            state.newMsgCompter++
        },
        messageSent:(state, action) => {
            state.loading = false
            state.error = null
            state.userMessages.unshift(action.payload)
        },
        respondeToMessage: (state, action) => {
            let selectedMessage = state.userMessages.find(item=> item.id === action.payload.id)
            selectedMessage.responde = !selectedMessage.responde
        },
        messageResponded: (state, action) => {
            state.loading = false
            state.error = null
            let selectedMsg = state.userMessages.find(item => item.id === action.payload.MessageId)
            const messages = selectedMsg.MsgResponses
            messages.push(action.payload)
            selectedMsg.MsgResponses = messages
            state.selectedMsgResponses.push(action.payload)
        },
        readResponse: (state, action) =>{
            let selectedMessage = state.userMessages.find(msg => msg.id === action.payload.id)
            selectedMessage.readResponse = !selectedMessage.readResponse
        },
        readResponseItem: (state, action) => {
            let selectedResponse = state.selectedMsgResponses.find(resp => resp.id === action.payload.id)
            selectedResponse.getRead = !selectedResponse.getRead
        },
        responseIsRead: (state, action) => {
            state.loading = false
            state.error  = null
            let selectedResponse = state.selectedMsgResponses.find(resp => resp.id === action.payload.id)
            selectedResponse.isRead = action.payload.isRead
            let selectedMessage = state.userMessages.find(msg => msg.id === action.payload.MessageId)
            selectedMessage.MsgResponses = state.selectedMsgResponses

        },
        messageDeleted: (state, action) => {
            state.loading = false
            state.error = null
            const newMessages = state.userMessages.filter(msg => msg.id !== action.payload.id)
            state.userMessages = newMessages
        },
        responseDeleted: (state, action) => {
            let selectedMessage = state.userMessages.find(msg => msg.id === action.payload.MessageId)
            const msgResponses = selectedMessage.MsgResponses
            const newMsgResp = msgResponses.filter(item => item.id !== action.payload.id)
            selectedMessage.MsgResponses = newMsgResp
        },
        resetConnectedMessage: (state) => {
            state.userMessages = []
            state.selectedMsgResponses = []
            state.loading = false
            state.error = null
            state.newMsgCompter = 0
        }
    }
})

export default messageSlice.reducer
const {messageReceived, messageRequested, messageRequestFailed, getMessageRead,
    incrementMsgCompter, messageSent, updateMessage, respondeToMessage, messageResponded,
    readResponse, readResponseItem, responseIsRead, messageDeleted, responseDeleted,
    resetConnectedMessage} = messageSlice.actions

const url =  '/messages'

export const getUserMessages = () => apiRequest({
    url,
    method: 'get',
    onStart: messageRequested.type,
    onSuccess: messageReceived.type,
    onError: messageRequestFailed.type
})

export const getUserMessageUpdate = (message) =>apiRequest({
    url:url+'/update',
    method: 'patch',
    data:message,
    onStart: messageRequested.type,
    onSuccess: updateMessage.type,
    onError: messageRequestFailed.type
})

export const startReadingMessage = (message) => dispatch => {
    dispatch(getMessageRead(message))
}

export const getMsgCompterIncremented = () => dispatch=>{
    dispatch(incrementMsgCompter())
}

export const sendMessage = (data) =>apiRequest({
    url,
    data,
    method:'post',
    onStart: messageRequested.type,
    onSuccess: messageSent.type,
    onError: messageRequestFailed.type
})

export const getRespondeToMessage = (message) => dispatch => {
    dispatch(respondeToMessage(message))
}

export const sendResponseToMsg = (data) => apiRequest({
    url:url+'/response',
    data,
    method: 'post',
    onStart: messageRequested.type,
    onSuccess: messageResponded.type,
    onError: messageRequestFailed.type
})


export const getResponseRead = (message) => dispatch => {
    dispatch(readResponse(message))
}

export const getResponseItemRead = (item) =>dispatch => {
    dispatch(readResponseItem(item))
}

export const getReadingMsgResponse = (response) => apiRequest({
    url:url+'/response',
    method: 'patch',
    data: response,
    onStart: messageRequested.type,
    onSuccess: responseIsRead.type,
    onError: messageRequestFailed.type
})

export const getMsgDelete = (message) => apiRequest({
    url:url+'/delete',
    method: 'delete',
    data: message,
    onStart: messageRequested.type,
    onSuccess: messageDeleted.type,
    onError: messageRequestFailed.type
})

export const getMsgRespDelete = (response) => apiRequest({
    url: url+'/response',
    method:'delete',
    data:response,
    onSuccess: responseDeleted.type,
    onError: messageRequestFailed.type
})


export const getConnectedMessagesReset = () => dispatch => {
    dispatch(resetConnectedMessage())
}
