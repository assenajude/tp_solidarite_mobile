import React from 'react';
import {StyleSheet, View,ScrollView} from 'react-native'
import * as Yup from 'yup'
import {useDispatch} from "react-redux";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addShippingAdresse} from '../store/slices/shippingAdresseSlice'

const shippingSchemaValide = Yup.object().shape({
    region: Yup.string(),
    ville: Yup.string(),
    distance: Yup.string(),
    cout: Yup.number()
})

function NewShippingAdScreen(props) {
    const dispatch = useDispatch()

    const handleSubmit = (shipping) => {
        dispatch(addShippingAdresse(shipping))
    }

    return (
        <ScrollView>
            <AppForm initialValues={{
                region: '',
                ville: '',
                distance: '',
                cout:0
            }} validationSchema={shippingSchemaValide} onSubmit={handleSubmit}>
                <AppFormField title='region' name='region'/>
                <AppFormField title='ville' name='ville'/>
                <AppFormField title='distance' name='distance'/>
                <AppFormField title='Cout' name='cout'/>
                <AppSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
    );
}

export default NewShippingAdScreen;