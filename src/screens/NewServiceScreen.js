import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useStore,useSelector} from "react-redux";
import {View, StyleSheet, ScrollView, Alert} from "react-native"
import {Picker} from "@react-native-community/picker";
import * as Yup from 'yup'

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppText from "../components/AppText";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import {addService} from '../store/slices/serviceSlice'
import {getAllOrders} from "../store/slices/orderSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";

const serviceValideSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    montantMin: Yup.number(),
    montantMax: Yup.number(),
    imageService: Yup.string()
})

function NewServiceScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()

    const categories = useSelector(state => state.entities.categorie.list)
    const [selectedCategorie, setSelectedCategorie] = useState(3)
    const loading = useSelector(state => state.entities.service.loading)

    const getCategorieItems = () => {
        return (
            categories.map((item, index) => <Picker.Item value={item.id} label={item.libelleCateg} key={index.toString()}/>)
        )
    }
    const handleNewService = async (service) => {
        const serviceData = {
            categoryId: selectedCategorie,
            libelle: service.libelle,
            description: service.description,
            montantMin: service.montantMin,
            montantMax: service.montantMax,
            image: service.imageService
        }
        await dispatch(addService(serviceData))
        const error = store.getState().entities.order.error
        if(!error) {
        await dispatch(getAllOrders())
         navigation.goBack()
        } else {
            Alert.alert('ERROR!', 'Une erreur est apparue, Veillez reessayer plutard', [
                {text: 'ok', onPress: () => {return;}}
                ], {cancelable: false} )
        }
    }

    return (
        <>
        <AppActivityIndicator visible={loading}/>
        <ScrollView>
            <View style={{flexDirection: 'row'}}>
                <AppText style={{fontWeight: 'bold'}}>Categorie:</AppText>
                <Picker style={{width: 180, height: 50, marginLeft: 20}} selectedValue={selectedCategorie} onValueChange={(id) => setSelectedCategorie(id)}>
                    {getCategorieItems()}
                </Picker>
            </View>
            <AppForm initialValues={{
                libelle: '',
                description: '',
                montantMin: 0,
                montantMax: 0,
                imageService: ''
            }} validationSchema={serviceValideSchema} onSubmit={handleNewService}>
                <AppFormField name='libelle' title='Libelle'/>
                <AppFormField name='description' title='Description'/>
                <AppFormField name='montantMin' title='Montant minimum'/>
                <AppFormField name='montantMax' title='Montant Maximum'/>
                <AppFormImagePicker name='imageService'/>
                <AppSubmitButton showLoading={loading} title='Ajouter'/>
            </AppForm>
        </ScrollView>
       </>
    );
}

export default NewServiceScreen;