import React from 'react';
import {StyleSheet, View,ScrollView, Alert} from 'react-native'
import * as Yup from 'yup'
import {useDispatch} from "react-redux";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addShippingAdresse} from '../store/slices/shippingAdresseSlice'

const shippingSchemaValide = Yup.object().shape({
    region: Yup.string(),
    ville: Yup.string(),
    kilometrage: Yup.number(),
    coutKilo: Yup.number()
})

function NewShippingAdScreen({navigation}) {
    const dispatch = useDispatch()

    const handleSubmit = async (shipping) => {
        try{
            await dispatch(addShippingAdresse(shipping))
            navigation.goBack()
        } catch (e) {
           Alert.alert('Error',
               `Impossible d'ajouter l'adresse veillez reessayer`,
               [{
               text: 'ok', onPress:() => {return;}
               }])
        }
    }

    return (
        <View>
        <ScrollView>
            <AppForm initialValues={{
                region: '',
                ville: '',
                kilometrage: 0,
                coutKilo:0
            }} validationSchema={shippingSchemaValide} onSubmit={handleSubmit}>
                <AppFormField title='region' name='region'/>
                <AppFormField title='ville' name='ville'/>
                <AppFormField title='distance' name='kilometrage'/>
                <AppFormField title='Cout' name='coutKilo'/>
                <AppSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
        </View>
    );
}

export default NewShippingAdScreen;