import React from 'react';
import {TouchableOpacity, View, ScrollView, FlatList, Alert, ToastAndroid} from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Yup from 'yup'


import AppText from "../AppText";
import AppButton from "../AppButton";
import colors from "../../utilities/colors";
import AppFormField from "../forms/AppFormField";
import AppForm from "../forms/AppForm";
import AppSubmitButton from "../forms/AppSubmitButton";
import ResponseItem from "./ResponseItem";
import ItemSeparator from "../list/ItemSeparator";
import {getMsgRespDelete, getReadingMsgResponse, getResponseItemRead} from "../../store/slices/messageSlice";
import {useDispatch, useStore} from "react-redux";
import ResponseLabel from "./ResponseLabel";
import ListItemActions from "../list/ListItemActions";

const responseValid = Yup.object().shape({
    reponse: Yup.string()
})
function MessageItem({messageContent, getRead, startReading, renderRightActions,messageHeader, isRead, onSwipeableOpen,
                         onSwipeableClose, isReceived, editMessage, reSendMessage, getRefence, respondeToMsg, responde,
                         handleResponse, responses, newResponses, readResponse, responseReading, msgResponses}) {

    const dispatch = useDispatch()
    const store = useStore()

    const handleDeleteResponse = (response) => {
        Alert.alert('Alert', 'Voulez-vous supprimer definitivement cette reponse?', [{text: 'oui', onPress: async () => {
                await dispatch(getMsgRespDelete(response))
                const error = store.getState().entities.message.error
                if(error !== null){
                    ToastAndroid.showWithGravity('Impossible de supprimer cette reponse', ToastAndroid.LONG, ToastAndroid.TOP)
                } else {
                    ToastAndroid.showWithGravity('Reponse supprimé avec succès', ToastAndroid.LONG, ToastAndroid.TOP)
                }
            }}, {text: 'non', onPress:() => {return;}}])
    }

    return (
            <View style={{padding: 5, backgroundColor: colors.blanc, paddingBottom: 10}}>
                <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={onSwipeableOpen} onSwipeableClose={onSwipeableClose}>
                    <View>
              <View style={{flexDirection: 'row'}}>
                  {isReceived? <MaterialCommunityIcons name="account-arrow-left-outline" size={40} color={isRead?colors.leger:colors.dark} />:<MaterialCommunityIcons name="account-arrow-right-outline" size={40} color={isRead?colors.leger:colors.dark} />}
                  {isReceived?<AppText style={{fontWeight:isRead?'normal':'bold'}}>Vous avez reçu de Tout-Promo</AppText>:<AppText style={{fontWeight:isRead?'normal':'bold'}}>Vous avez envoyé à Tout-Promo</AppText>}
                 {isRead && <AppText style={{color: colors.vert, fontWeight:'bold'}}> lu </AppText>}
              </View>

            {!getRead && <View style={{
                flexDirection:'row',
                justifyContent: 'space-around',
                alignItems: "center"
            }}>
                <View style={{alignItems:'flex-start', width: '80%'}}>

                        <AppText lineNumber={1} style={{color:colors.dark, fontWeight:isRead?'normal':'bold'}}>{messageHeader}</AppText>

                    <AppText lineNumber={1}>{messageContent}</AppText>
                    <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity onPress={startReading}>
                    <View style={{ marginTop: 10, paddingLeft: 5, paddingRight: 5}}>
                        <Entypo name="chevron-thin-down" size={30} color="black" />
                    </View>
                    </TouchableOpacity>
                    </View>
                </View>

            </View>}
                </View>
                </Swipeable>
                {getRead && <View style={{alignItems: "flex-start"}}>
                <AppText style={{color:colors.dark, fontWeight:isRead?'normal':'bold'}}>{messageHeader}</AppText>
                <AppText>{messageContent}</AppText>
                <View style={{alignSelf: 'center', margin: 10}}>
                <ResponseLabel readResponse={readResponse} nonReadResponse={newResponses}/>
                </View>
                {responseReading && msgResponses.length>0 &&
                    <FlatList ItemSeparatorComponent={ItemSeparator} data={responses} keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <ResponseItem startReadingResponse={() => {
                        dispatch(getResponseItemRead(item))
                        if(!item.isRead) dispatch(getReadingMsgResponse({id: item.id,isRead: true}))
                    }} respIsRead={item.isRead} getRespRead={item.getRead} respHeader={item.respHeader} respContent={item.respContent}
                                         renderRespRightActions={() =><ListItemActions onPress={() => handleDeleteResponse(item)}/>}/>}/>
                }
                {responseReading && msgResponses.length === 0 && <View style={{alignSelf: "center"}}>
                    <AppText>Il n'y a aucune reponse à ce message</AppText>
                </View>}
                {responde && <ScrollView>
                <AppForm initialValues={{
                    reponse: ''
                }} validationSchema={responseValid} onSubmit={handleResponse}>
                    <AppFormField title='votre reponse' name='reponse'/>
                    <AppSubmitButton title='repondre'/>
                </AppForm>
                    <AppButton style={{alignSelf: 'flex-start'}} title='retour' onPress={respondeToMsg}/>
                </ScrollView>}
                {isReceived && !responde && <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <AppButton title='voir la reference' onPress={getRefence}/>
                <AppButton style={{marginLeft: '50%'}} title='repondre' onPress={respondeToMsg}/>
                </View>}
                {!isReceived && <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <AppButton title='editer' onPress={editMessage}/>
                <AppButton style={{marginLeft: '50%'}} title='renvoyer' onPress={reSendMessage}/>
                </View>}
                <View style={{alignSelf: 'center'}}>
                    <TouchableOpacity onPress={startReading}>
                        <View style={{ marginTop: 10, paddingLeft: 5, paddingRight: 5}}>
                            <Entypo name="chevron-thin-up" size={30} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>}
            </View>
    );
}

export default MessageItem;