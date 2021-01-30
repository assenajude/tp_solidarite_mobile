import React, {useEffect} from 'react';
import {FlatList} from "react-native";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {useDispatch, useSelector} from "react-redux";
import {getAllQuestions, getResponseShow} from "../store/slices/faqSlice";
import FaqListItem from "../components/faq/FaqListItem";
import QuestionScreen from "./QuestionScreen";

function FaqScreen({navigation}) {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.entities.faq.loading)
    const questions = useSelector(state => state.entities.faq.questions)

    useEffect(() => {
        dispatch(getAllQuestions())
    }, [])

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <FlatList data={questions} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <FaqListItem itemLabel={item.libelle} showResponse={item.showResponse}
                                                           showQuestionResponse={() => dispatch(getResponseShow(item))}
                                                           response={item.Responses} addResponse={() => navigation.navigate('AccueilNavigator', {screen:'ResponseScreen', params: item})}
                                                           editQuestion={() => navigation.navigate('AccueilNavigator', {screen: 'QuestionScreen', params: item} )}/>}/>
        </>
    );
}

export default FaqScreen;