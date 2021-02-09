import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, View, StyleSheet, Modal, ScrollView, Alert, ToastAndroid} from 'react-native'
import {useDispatch, useSelector, useStore} from "react-redux";
import * as Yup from 'yup'
import {
    getMsgDelete,
    getRespondeToMessage, getResponseRead,
    getUserMessages,
    getUserMessageUpdate,
    sendMessage, sendResponseToMsg,
    startReadingMessage
} from "../store/slices/messageSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import MessageItem from "../components/message/MessageItem";
import ListFooter from "../components/list/ListFooter";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppButton from "../components/AppButton";
import ListItemActions from "../components/list/ListItemActions";
import ItemSeparator from "../components/list/ItemSeparator";
import AppText from "../components/AppText";
import routes from "../navigation/routes";

const validMessage = Yup.object().shape({
    title:Yup.string(),
    message: Yup.string()
})
function UserMessageScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const sortedMessages = useSelector(state => state.entities.message.userMessages)
    const messageLoading = useSelector(state => state.entities.message.loading)
    const msgCompter = useSelector(state => state.entities.message.newMsgCompter)
    const error = useSelector(state => state.entities.message.error)
    const selectedMsgResp = useSelector(state => state.entities.message.selectedMsgResponses)

    const [selectedMessage, setSelectedMessage] = useState({})
    const [edit, setEdit] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isSwiping, setIsSwiping] = useState(false)

    const handleSendMessage = async (data) => {
        const msgData = {title:data.title || data.msgHeader,message:data.message || data.content, userId:user.id}
            if(edit) {
                const editData = {...msgData, messageId:selectedMessage.id}
                await dispatch(getUserMessageUpdate(editData))
            }else {
               await dispatch(sendMessage(msgData))
            }
           setShowModal(false)
        const error = store.getState().entities.message.error
        if(error !== null) {
            alert("une erreur est apparue, le message n'a pu être envoyé. ")
        }else {
            alert('Votre message a été envoyé avec succès.')
            setEdit(false)
            setSelectedMessage({})
        }
    }

    const getAllMessage  = useCallback(async () => {
        await dispatch(getUserMessages())
    }, [])

    const handleEdit = (message) => {
        setSelectedMessage(message)
        setShowModal(true)
        setEdit(true)

    }

    const handleResponse = (response) => {
        const data = {...response,title:'resp: '+selectedMessage.msgHeader, messageId: selectedMessage.id}
        dispatch(sendResponseToMsg(data))
        if(error !== null) {
            alert('Impossible de repondre à ce message pour le moment, veuillez reessayer plutard.')
        } else {
            dispatch(getRespondeToMessage(selectedMessage))
        }
    }

    const handleDelete = (message) => {
        Alert.alert('Alert', 'Voulez-vous supprimer definitivement ce message', [{
            text: 'oui', onPress: async () => {
                await dispatch(getMsgDelete(message))
                ToastAndroid.showWithGravity('Message supprimé avec succès.', ToastAndroid.LONG, ToastAndroid.TOP)
            }}, {text: 'non', onPress: () =>{return;}}])
    }

    useEffect(() => {
       if(msgCompter>0) getAllMessage()
    }, [])

    if(!messageLoading && sortedMessages.length === 0 && error === null ){
        return <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Vous n'avez aucun message</AppText>
        </View>
    }

    if(!messageLoading && error !== null ){
        return <View style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Une erreur est apparue, vous ne pouvez pas consulter vos messages</AppText>
        </View>
    }

    return (
        <>
            <AppActivityIndicator visible={messageLoading}/>
            <FlatList data={sortedMessages} keyExtractor={item => item.id.toString()} ItemSeparatorComponent={()=><ItemSeparator/> }
                  renderItem={({item}) => <MessageItem editMessage={() => handleEdit(item)} reSendMessage={() => handleSendMessage(item)} isReceived={user.id === item.receiverId} isRead={item.isRead} messageHeader={item.msgHeader} messageContent={item.content} getRead={item.getRead}
                                                       startReading={() => {
                                                           dispatch(startReadingMessage(item))
                                                           if(!item.isRead && user.id === item.receiverId) {
                                                           dispatch(getUserMessageUpdate({messageId:item.id,isRead: true}))
                                                           }
                                                       }}
                                                       renderRightActions={() =><ListItemActions onPress={() => handleDelete(item)}/>} swiping={isSwiping}
                                                       onSwipeableOpen={() => setIsSwiping(true)} onSwipeableClose={() => setIsSwiping(false)}
                                                       getRefence={() => navigation.navigate('AccueilNavigator', {screen: routes.ORDER_DETAILS, params:{numero: item.reference}})}
                                                       respondeToMsg={() => {
                                                           dispatch(getRespondeToMessage(item))
                                                           setSelectedMessage(item)
                                                       }} responde={item.responde}
                                                       handleResponse={handleResponse} responses={selectedMsgResp} newResponses={item.MsgResponses.filter(resp => resp.isRead === false).length}
                                                       readResponse={() => dispatch(getResponseRead(item))} responseReading={item.readResponse}
                                                       allResponses={item.MsgResponses.length} msgResponses={item.MsgResponses}/>} />
            <View style={styles.addNewButton}>
            <ListFooter onPress={() => setShowModal(true)}/>
            </View>
            <Modal visible={showModal}>
                <ScrollView>
                    <View>
                        <AppText style={{marginBottom: 50, marginTop: 20, fontWeight: 'bold'}}>Voulez-vous nous écrire un message?</AppText>
                <AppForm initialValues={{
                    title:selectedMessage.msgHeader || '',
                    message:selectedMessage.content || ''
                }} onSubmit={handleSendMessage} validationSchema={validMessage}>
                    <AppFormField name='title' title='Titre du message'/>
                    <AppFormField name='message' title='Votre message'/>
                    <AppSubmitButton title='Envoyer'/>
                </AppForm>

                   <AppButton style={{alignSelf: 'flex-start', margin: 20}} title='retour' onPress={() => setShowModal(false)}/>
                    </View>
                </ScrollView>

            </Modal>
        </>
    );

}
const styles = StyleSheet.create({
    addNewButton: {
        position: 'absolute',
        right: 40,
        bottom: 40
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default UserMessageScreen;