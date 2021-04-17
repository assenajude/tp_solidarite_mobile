import React from 'react';
import {ScrollView, Alert} from "react-native";
import * as Yup from 'yup'
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {modifyUserInfos} from "../store/slices/authSlice";
import {useDispatch, useStore} from "react-redux";

const resetValid = Yup.object().shape({
    code: Yup.string().min(6, 'Le code est 6 caracteres minimum').required(),
    username: Yup.string(),
    newPassword: Yup.string().min(5,'saisissez au moins 5 caracteres').required('entrez un nouveau mot de passe'),
    confirmation: Yup.string().when("newPassword", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("newPassword")],
            "Les mots de passe  ne correspondent pas."
        )
    }).required("Veuillez confirmer le mot de passe.")
})

function InitInfoScreen({route, navigation}) {
    const userEmail = route.params
    const store = useStore()
    const dispatch = useDispatch()

    const handleSaveNewInfos = async (infos) => {
        const data = {
            code: infos.code,
            username: infos.username,
            password: infos.newPassword,
            email: userEmail
        }
        await dispatch(modifyUserInfos(data))
        const error = store.getState().auth.error
        if(error !== null) {
            return alert('Impossible de valider vos infos, veuillez reessayer plutard')
        }
        Alert.alert("Succès", "Vos données ont été modifiées avec succès", [{text: 'ok', onPress: () => {
            return navigation.goBack()}}])
    }


    return (
        <ScrollView>
            <AppForm validationSchema={resetValid} initialValues={{
                code: '',
                username: '',
                newPassword: '',
                confirmation: ''
            }} onSubmit={handleSaveNewInfos}>
                <AppFormField title='code' name='code'/>
                <AppFormField title='username' name='username'/>
                <AppFormField secureTextEntry title='newPassword' name='newPassword'/>
                <AppFormField secureTextEntry title='confirmation' name='confirmation'/>
                <AppSubmitButton title='valider'/>
            </AppForm>
        </ScrollView>
    );
}

export default InitInfoScreen;