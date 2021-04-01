import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, ScrollView, Alert} from "react-native";
import * as Yup from 'yup'
import {Picker} from "@react-native-community/picker";


import AppText from "../components/AppText";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addLocation, getAllLocation} from '../store/slices/locationSlice'
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppFormSwitch from "../components/forms/AppFormSwitch";
import {getHomeCounterIncrement} from "../store/slices/mainSlice";
import FormImageListPicker from "../components/forms/FormImageListPicker";
import {getSelectedEspace} from "../store/slices/categorieSlice";
import useDirectUpload from "../hooks/useDirectUpload";
import AppUploadProgress from "../components/AppUploadProgress";

const locationValideSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    adresse: Yup.string(),
    coutReel: Yup.number(),
    coutPromo: Yup.number(),
    frequence: Yup.string(),
    images: Yup.array().min(1, "Veuillez choisir au moins une image"),
    caution: Yup.number(),
    dispo: Yup.number(),
    aide: Yup.boolean()
})

function NewLocationScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const {dataTransformer, directUpload} = useDirectUpload()
    const espaces = useSelector(state => state.entities.espace.list)
    const categories = useSelector(state => state.entities.categorie.espaceCategories)
    const isLoading = useSelector(state => state.entities.location.loading)
    const[selectedCategorie, setSelectedCategorie] = useState(2)
    const [selectedEspace, setSelectedEspace] = useState(2)
    const [locationProgress, setLocationProgress] = useState(0)
    const [uploadModal, setUploadModal] = useState(false)

    const addNew = async (location, imagesArray) => {
        const locationData = {
            categoryId: selectedCategorie,
            libelle: location.libelle,
            description: location.description,
            adresse: location.adresse,
            coutReel: location.coutReel,
            coutPromo: location.coutPromo,
            locationImagesLinks: imagesArray,
            frequence: location.frequence,
            caution: location.caution,
            dispo: location.dispo,
            aide: location.aide
        }
        await dispatch(addLocation(locationData))
        const error = store.getState().entities.location.error
        if(error !== null) {
            Alert.alert('Erreur!', "Impossible de faire l'ajout,veillez reessayer plutard", [
                    {text:'ok', onPress: () =>{return;}}
                ], {cancelable: false}
            )
        } else {
            await dispatch(getAllLocation())
            dispatch(getHomeCounterIncrement())
            navigation.goBack()
        }
    }

    const addNewLocation = async(location) => {
        const locationImages = location.images
        const transformerUlrs = dataTransformer(locationImages)
        setLocationProgress(0)
        setUploadModal(true)
        const uploadResult = await directUpload(transformerUlrs, locationImages, (progress) =>setLocationProgress(progress))
        setUploadModal(false)
        if(uploadResult) {
            const uploadSuccessUrls = store.getState().s3_upload.signedRequestArray
            const urlsArray = uploadSuccessUrls.map(item => item.url)
            await addNew(location, urlsArray)
        }else {
            Alert.alert("Alert", "Les images n'ont pas été chargées, voulez-vous continuer?", [{
                text: 'oui', onPress: async () => await addNew(location, [])
            }, {
                text: 'non', onPress: () => {return;}
            }])
        }


    }

    const getEspaces = () => {
        return(
            espaces.map((item) =><Picker.Item key={item.id.toString()} label={item.nom} value={item.id}/>)
        )
    }

    const listCategories = () => {
        return (
            categories.map((categorie, index) => <Picker.Item label={categorie.libelleCateg} value={categorie.id} key={index.toString()}/>)
        )
    }

    useEffect(() => {
        dispatch(getSelectedEspace(espaces[1]))
    }, [])

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <AppUploadProgress startProgress={uploadModal} progress={locationProgress}/>
        <ScrollView contentContainerStyle={{paddingTop: 10, paddingBottom: 20}}>
            <View style={{flexDirection: 'row'}}>
                <AppText style={{fontWeight: 'bold', marginRight: 20}}>Espace:</AppText>
                <Picker style={{height: 50, width: 205}} mode='dropdown' selectedValue={selectedEspace} onValueChange={(id) => {
                    setSelectedEspace(id)
                    dispatch(getSelectedEspace(espaces.find(esp => esp.id === id)))
                }}>
                    {getEspaces()}
                </Picker>
            </View>
            <View style={{flexDirection: 'row'}}>
                <AppText style={{fontWeight: 'bold', marginRight: 20}}>Categorie:</AppText>
                <Picker style={{height: 50, width: 205}} mode='dropdown' selectedValue={selectedCategorie} onValueChange={(id) => setSelectedCategorie(id)}>
                    {listCategories()}
                </Picker>
            </View>
            <AppForm validationSchema={locationValideSchema} onSubmit={addNewLocation}
            initialValues={{
                libelle: '',
                description: '',
                adresse: '',
                coutReel: '',
                coutPromo: '',
                frequence: '',
                caution: '',
                dispo: '',
                images: [],
                aide: false
            }}>
                <FormImageListPicker name='images'/>
                <AppFormField name='libelle' title='Libelle'/>
                <AppFormField name='description' title='Description'/>
                <AppFormField title='Disponible' name='dispo'/>
                <AppFormField name='adresse' title='Adresse'/>
                <AppFormField name='coutReel' title='Coût reel'/>
                <AppFormField name='coutPromo' title='Coût promo'/>
                <AppFormField name='caution' title='Nombre de part pour la caution'/>
                <AppFormField name='frequence' title='Frequence de location'/>
                <AppFormSwitch title='Possiblité de louer à credit?' name='aide'/>
                <AppSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
     </>
    );
}

export default NewLocationScreen;