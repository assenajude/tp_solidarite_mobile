import React, {useEffect} from 'react';
import {FlatList, View, ToastAndroid, Alert} from "react-native";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {useDispatch, useSelector} from "react-redux";
import {getAllQuestions, getQuestionDelete, getResponseShow} from "../store/slices/faqSlice";
import FaqListItem from "../components/faq/FaqListItem";
import QuestionScreen from "./QuestionScreen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ListFooter from "../components/list/ListFooter";
import ListItemActions from "../components/list/ListItemActions";

function FaqScreen({navigation}) {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.entities.faq.loading)
    const error = useSelector(state => state.entities.faq.error)
    const questions = useSelector(state => state.entities.faq.questions)

    const handleDeleteFaq = (faq) => {
        Alert.alert('Alert!', 'Voulez-vous supprimer definitivement cette question?', [
            {text:'oui', onPress: async() => {
                await dispatch(getQuestionDelete(faq))
                    if(error !== null) {
                        ToastAndroid.showWithGravity('Impossible de supprimer la question', ToastAndroid.LONG, ToastAndroid.TOP)
                    } else {
                        ToastAndroid.showWithGravity('La question a été supprimée avec succès.', ToastAndroid.LONG, ToastAndroid.TOP)

                    }
                }}, {text: 'non', onPress: () => {return;}}
            ])
    }

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [])

    if(!isLoading && error !== null) {
        return <View>
            <AppText>Impossible de consulter la FAQ pour le moment. Une erreur est apparue</AppText>
        </View>
    }

    if(!isLoading && error === null && questions.length ===0 ){
        return <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: "center"
        }}>
            <AppText>Il n'y a pas de question déjà posée.</AppText>
            <AppButton title='poser une question' onPress={() => navigation.navigate('QuestionScreen')}/>
        </View>
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <FlatList data={questions} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <FaqListItem renderFaqActions={() =><ListItemActions onPress={() =>handleDeleteFaq(item)}/>} itemLabel={item.libelle} showResponse={item.showResponse}
                                                           showQuestionResponse={() => dispatch(getResponseShow(item))}
                                                           response={item.Responses} addResponse={() => navigation.navigate('AccueilNavigator', {screen:'ResponseScreen', params: item})}
                                                           editQuestion={() => navigation.navigate('AccueilNavigator', {screen: 'QuestionScreen', params: item} )}/>}/>
             <View style={{
                 position: 'absolute',
                 right: 10,
                 bottom: 20
             }}>
                 <ListFooter onPress={() => navigation.navigate('QuestionScreen')}/>
             </View>
        </>
    );
}

export default FaqScreen;