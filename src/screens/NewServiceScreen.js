import React, { useState, useEffect} from 'react';
import {useDispatch, useStore,useSelector} from "react-redux";
import {View, ScrollView, Alert} from "react-native"
import {Picker} from "@react-native-community/picker";
import * as Yup from 'yup'

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppText from "../components/AppText";
import {addService, getServices} from '../store/slices/serviceSlice'
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppFormSwitch from "../components/forms/AppFormSwitch";
import FormImageListPicker from "../components/forms/FormImageListPicker";
import {getSelectedEspace} from "../store/slices/categorieSlice";
import useDirectUpload from "../hooks/useDirectUpload";
import AppUploadProgress from "../components/AppUploadProgress";

const serviceValideSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    montantMin: Yup.number(),
    montantMax: Yup.number(),
    images: Yup.array().min(1, "Veuillez choisir au moins une image"),
    isDispo: Yup.boolean()
})

function NewServiceScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const {dataTransformer, directUpload} = useDirectUpload()

    const espaces = useSelector(state => state.entities.espace.list)
    const categories = useSelector(state => state.entities.categorie.espaceCategories)
    const [selectedCategorie, setSelectedCategorie] = useState(3)
    const loading = useSelector(state => state.entities.service.loading)
    const [espace, setEspace] = useState(3)
    const [serviceUploadProgress, setServiceUploadProgress] = useState(0)
    const [serviceUploadModal, setServiceUploadModal] = useState(false)

    const getCategorieItems = () => {
        return (
            categories.map((item, index) => <Picker.Item value={item.id} label={item.libelleCateg} key={index.toString()}/>)
        )
    }

    const getEspaces = () => {
        return (
            espaces.map((item) => <Picker.Item key={item.id.toString()} label={item.nom} value={item.id}/>)
        )
    }

    const addNewService = async (service, urlsArray) => {
        const serviceData = {
            categoryId: selectedCategorie,
            libelle: service.libelle,
            description: service.description,
            montantMin: service.montantMin,
            montantMax: service.montantMax,
            serviceImagesLinks: urlsArray,
            isDispo:service.isDispo
        }
        await dispatch(addService(serviceData))
        const error = store.getState().entities.service.error
        if(error !== null) {
            alert("Impossible de faire l'ajout, une erreur est apparue.")
        } else {
            await dispatch(getServices())
            navigation.goBack()
        }
    }

    const handleNewService = async (service) => {
        const serviceImages = service.images
        const transformArray = dataTransformer(serviceImages)
        setServiceUploadProgress(0)
        setServiceUploadModal(true)
        const uploadResult = await directUpload(transformArray, serviceImages, (progress) => setServiceUploadProgress(progress))
        setServiceUploadModal(false)
        if(uploadResult) {
            const signedData = store.getState().s3_upload.signedRequestArray
            const signedUrls = signedData.map(item => item.url)
            await addNewService(service, signedUrls)
        } else {
            Alert.alert("Alert", "Les images n'ont pas été chargées, voulez-vous continuer?",
                [{text: 'oui', onPress: async() => await addNewService(service, [])},
                    {text: 'non', onPress: () => {return;}}])
        }

    }

    useEffect(() => {
        dispatch(getSelectedEspace(espaces[2]))
    }, [])

    return (
        <>
        <AppActivityIndicator visible={loading}/>
        <AppUploadProgress startProgress={serviceUploadModal} progress={serviceUploadProgress}/>
        <ScrollView>
            <View style={{paddingTop: 10, paddingBottom: 20}}>
            <View style={{flexDirection: 'row'}}>
                <AppText style={{fontWeight: 'bold'}}>Espace:</AppText>
                <Picker style={{width: 180, height: 50, marginLeft: 20}} selectedValue={espace} onValueChange={(id) => {
                    setEspace(id)
                    dispatch(getSelectedEspace(espaces.find(esp => esp.id === id)))
                }}>
                    {getEspaces()}
                </Picker>
            </View>
            <View style={{flexDirection: 'row'}}>
                <AppText style={{fontWeight: 'bold'}}>Categorie:</AppText>
                <Picker style={{width: 180, height: 50, marginLeft: 20}} selectedValue={selectedCategorie} onValueChange={(id) => setSelectedCategorie(id)}>
                    {getCategorieItems()}
                </Picker>
            </View>
            <AppForm initialValues={{
                libelle: '',
                description: '',
                montantMin: '',
                montantMax: '',
                images: [],
                isDispo: false
            }} validationSchema={serviceValideSchema} onSubmit={handleNewService}>
                <FormImageListPicker name='images'/>
                <AppFormField name='libelle' title='Libelle'/>
                <AppFormField name='description' title='Description'/>
                <AppFormField name='montantMin' title='Montant minimum'/>
                <AppFormField name='montantMax' title='Montant Maximum'/>
                <AppFormSwitch title='Service disponible? ' name='isDispo'/>
                <AppSubmitButton title='Ajouter'/>
            </AppForm>
            </View>
        </ScrollView>
       </>
    );
}

export default NewServiceScreen;