import React, {useState, useCallback, useEffect} from 'react';
import {View, ScrollView} from "react-native";
import * as Yup from 'yup'

import AppText from "../components/AppText";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";

const itemValideSchema = Yup.object().shape({
    statusLivraison: Yup.string()
})
function OrderItemEditScreen({route}) {
    const itemToEdit = route.params

    const handleEdit = (item) => {
        console.log(item);
    }

    useEffect(() => {
        console.log(itemToEdit.statusLivraison);
    }, [])

    return (
        <ScrollView>
            <AppForm initialValues={{
                statusLivraison: itemToEdit.statusLivraison
            }} validationSchema={itemValideSchema} onSubmit={handleEdit}>
                <AppFormField name='statusLivraison' title='Status de la livraison'/>
                <AppSubmitButton title='Valider'/>
            </AppForm>
        </ScrollView>
    );
}

export default OrderItemEditScreen;