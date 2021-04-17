import React, {useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {ScrollView, View, StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker'

import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import * as Yup from "yup";
import {addCategorie} from '../store/slices/categorieSlice'
import AppText from "../components/AppText";
import PickerItem from "react-native-web/src/exports/Picker/PickerItem";
import FormImageListPicker from "../components/forms/FormImageListPicker";
import useDirectUpload from "../hooks/useDirectUpload";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppUploadProgress from "../components/AppUploadProgress";


const categorieSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    images: Yup.array()

})

function NewCategorieScreen({navigation}) {

    const dispatch = useDispatch();
    const store = useStore()
    const {dataTransformer, directUpload} = useDirectUpload()
    const espaces = useSelector(state => state.entities.espace.list)
    const addFailed = useSelector(state => state.entities.categorie.error)
    const loading = useSelector(state => state.entities.categorie.loading)
    const [selectedEspace, setSelectedEspace] = useState(1)
    const [uploadModal, setUploadModal] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const addNew = async (categorie, imagesTab) => {
        const categorieData = {
            libelle: categorie.libelle,
            description: categorie.description,
            categImagesLinks: imagesTab,
            idEspace: selectedEspace
        }
        await dispatch(addCategorie(categorieData))
        const error = store.getState().entities.categorie.error
        if(error !== null){
            alert('Impossible de faire lajour')
        } else navigation.goBack()
    }

    const AddNewCategorie = async (categorie) => {
        const images = categorie.images
        const transformedArray = dataTransformer(images)
        setUploadProgress(0)
        setUploadModal(true)
       const uploadResult =  await directUpload(transformedArray, images, (progress) => {
           setUploadProgress(progress)
       })
        setUploadModal(false)
        if(uploadResult) {
            let signedUrl = store.getState().s3_upload.signedRequestArray
            const imagesUrls = signedUrl.map(item => item.url)
           await addNew(categorie, imagesUrls)
        } else {
            await addNew(categorie, [])
        }
    }

    const getEspacePicker = () => {
        return espaces.map((item) => <PickerItem key={item.id.toString()} label={item.nom} value={item.id}/>)
    }

    return (
        <>
            <AppActivityIndicator visible={loading}/>
            <AppUploadProgress progress={uploadProgress} startProgress={uploadModal}/>
        <View style={styles.container}>
        <ScrollView>
            <View style={{
                flexDirection: 'row'

            }}>
                <AppText style={{fontSize: 18, marginRight: 20, fontWeight: 'bold'}}>Espace:</AppText>
                <Picker mode='dropdown' style={{height: 50, width: 160}} selectedValue={selectedEspace} onValueChange={(value) => {
                    setSelectedEspace(value)}}
                >
                    {getEspacePicker()}
                </Picker>
            </View>
            <AppForm initialValues={{
                libelle: '',
                description: '',
                images: []
            }} validationSchema={categorieSchema} onSubmit={AddNewCategorie}>
                <AppErrorMessage error='Impossible de faire lajout' visible={addFailed}/>
                <FormImageListPicker name='images'/>
                <AppFormField title='Libellé' name='libelle'/>
                <AppFormField title='Description' name='description'/>
                <AppSubmitButton title='Ajouter' showLoading={loading}/>
            </AppForm>

        </ScrollView>
        </View>
            </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 50
    }
})

export default NewCategorieScreen;