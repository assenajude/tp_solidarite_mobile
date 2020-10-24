import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ScrollView, View, StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker'

import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import * as Yup from "yup";
import {addCategorie} from '../store/slices/categorieSlice'
import AppText from "../components/AppText";


const categorieSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
})

function NewCategorieScreen({navigation}) {

    const dispatch = useDispatch();
    const [addFailed, setAddFailed] = useState(false)
    const loading = useSelector(state => state.entities.categorie.loading)
    const [selectedType, setSelectedType] = useState('e-commerce')

    const AddNewCategorie = async (categorie) => {
        const categorieData = {
            libelle: categorie.libelle,
            description: categorie.description,
            type: selectedType
        }
        await dispatch(addCategorie(categorieData))
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
        <ScrollView>
            <View style={{
                flexDirection: 'row'

            }}>
                <AppText style={{fontSize: 18, marginRight: 20}}>Type:</AppText>
                <Picker mode='dropdown' style={{height: 50, width: 160}} selectedValue={selectedType} onValueChange={(value) => setSelectedType(value)}>
                    <Picker.Item value='e-commerce' label='e-commerce'/>
                    <Picker.Item value='e-location' label='e-location'/>
                    <Picker.Item value='e-service' label='e-service'/>
                </Picker>
            </View>
            <AppForm initialValues={{
                libelle: '',
                description: ''
            }} validationSchema={categorieSchema} onSubmit={AddNewCategorie}>
                <AppErrorMessage error='Impossible de faire lajout' visible={addFailed}/>
                <AppFormField title='Libellé' name='libelle'/>
                <AppFormField title='Description' name='description'/>
                <AppSubmitButton title='Ajouter' showLoading={loading}/>
            </AppForm>

        </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 50
    }
})

export default NewCategorieScreen;