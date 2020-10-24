import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, useStore} from "react-redux";
import {View, ScrollView, Alert} from "react-native";
import * as Yup from 'yup'
import {Picker} from "@react-native-community/picker";


import AppText from "../components/AppText";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addLocation, getAllLocation} from '../store/slices/locationSlice'
import ActivityIndicator from "react-native-web/src/exports/ActivityIndicator";
import AppActivityIndicator from "../components/AppActivityIndicator";

const locationValideSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    adresse: Yup.string(),
    cout: Yup.number(),
    frequence: Yup.string(),
    image: Yup.string(),
    caution: Yup.number(),

})

function NewLocationScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch()
    const categories = useSelector(state => state.entities.categorie.list)
    const isLoading = useSelector(state => state.entities.location.loading)
    const[selectedCategorie, setSelectedCategorie] = useState(2)
    const [addLoading, setAddLoading] = useState(false)


    const addNewLocation = async(location) => {
        const locationData = {
            categoryId: selectedCategorie,
            libelle: location.libelle,
            description: location.description,
            adresse: location.adresse,
            cout: location.cout,
            image: location.image,
            frequence: location.frequence,
            caution: location.caution,
        }
        await dispatch(addLocation(locationData))
        const error = store.getState().entities.location.error
        if(error === null) {
            await dispatch(getAllLocation())
            navigation.goBack()
        } else {
            Alert.alert('Erreur!', "Impossible de faire l'ajout,veillez reessayer plutard", [
                {text:'ok', onPress: () =>{return;}}
                ], {cancelable: false}
            )
        }

    }

    const listCategories = () => {
        return (
            categories.map((categorie, index) => <Picker.Item label={categorie.libelleCateg} value={categorie.id} key={index.toString()}/>)
        )
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
        <ScrollView style={{bottom: 20}}>
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
                cout: 0,
                frequence: '',
                caution: 1
            }}>
                <AppFormField name='libelle' title='Libelle'/>
                <AppFormField name='description' title='Description'/>
                <AppFormField name='adresse' title='Adresse'/>
                <AppFormField name='cout' title='Coût'/>
                <AppFormField name='caution' title='Nombre de part pour la caution'/>
                <AppFormField name='frequence' title='Frequence de location'/>
                <AppFormImagePicker name='image'/>
                <AppSubmitButton showLoading={addLoading} title='Ajouter'/>
            </AppForm>
        </ScrollView>
     </>
    );
}

export default NewLocationScreen;