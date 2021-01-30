import React, {useEffect, useState} from 'react';
import {ScrollView, View, Alert} from "react-native";
import * as Yup from 'yup'
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import FormImageListPicker from "../components/forms/FormImageListPicker";
import {
    addNewProposition,
    getPropositionEdit,
    getSelectedPropositionReset
} from "../store/slices/propositionSlice";
import {useDispatch, useSelector, useStore} from "react-redux";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppFormSwitch from "../components/forms/AppFormSwitch";
import AppFormOption from "../components/forms/AppFormOption";
import useAuth from "../hooks/useAuth";

const propositionValidSchema = Yup.object().shape({
    images: Yup.array().min(1, 'Vous devez choisir au moins une image'),
    desciptionList: Yup.array(),
    designation:Yup.string()
})

function NewPropositionScreen({navigation, route}) {
    const mode = route.params.mode
    const dispatch = useDispatch()
    const store = useStore()
    const {userRoleAdmin} = useAuth()

    const selected = useSelector(state => state.entities.proposition.selected)
    const isLoading = useSelector(state => state.entities.proposition.loading)
    const [addNewMode, setAddNewMode] = useState(false)
    const [newOptionLabel, setNewOptionLabel]  = useState('')
    const [newOptionValue, setNewOptionValue] = useState('')
    const [optionsList, setOptionsList] = useState([])




    const handleSaveProposition = async (proposition) => {
        let formData = {
            designation: proposition.designation,
            images: proposition.images,
            type: proposition.type,
            idReference: proposition.idReference,
            isOk: proposition.isOk
        }

            const optionsList = proposition.desciptionList
            optionsList.forEach(proposition => {
                formData[proposition.label] = proposition.value
            })
        if(mode === 'add'){
                    await dispatch(addNewProposition(formData))
                } else {
                  const data = {...formData, id: selected.id}
            await dispatch(getPropositionEdit(data))
                }
                const error = store.getState().entities.proposition.error
                if(error !== null) {
                  return   alert('Impossible de faire lajout, une erreur est apparue.')
                } else {
                    Alert.alert('Félicitation', 'Votre proposition a été envoyée et est en cours de traitement.',[
                        {text:'ok', onPress: () => {return;}}
                    ])
                    return navigation.goBack()
                }
    }


    useEffect(()=> {
        return () => {
            dispatch(getSelectedPropositionReset())
        }
    }, [])



    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
        <ScrollView>
            <View style={{margin: 10}}>
           <AppForm validationSchema={propositionValidSchema} initialValues={{
               designation: selected.designation,
               desciptionList: selected.description || [],
               images: selected.images || selected.imagesProposition,
               type: selected.type || '',
               idReference: String(selected.idReference) || '',
               isOk: selected.isOk

           }} onSubmit={handleSaveProposition}>
               <FormImageListPicker name='images'/>
               <AppFormField name='designation' title='Nom de votre produit'/>
               <AppFormOption name='desciptionList'/>
               {userRoleAdmin() && mode==='edit' && <AppFormSwitch name='isOk' title='is Ok?'/>}
               {userRoleAdmin() && mode==='edit' && <AppFormField name='idReference' title='Id de la reference'/>}
               {userRoleAdmin() && mode==='edit' && <AppFormField name='type' title='Type de la proposition'/>}
               <AppSubmitButton title='Envoyez votre proposition'/>
           </AppForm>

            </View>
        </ScrollView>
        </>
    );
}

export default NewPropositionScreen;