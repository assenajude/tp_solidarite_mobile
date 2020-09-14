import React, {useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {ScrollView, View, StyleSheet} from 'react-native'
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import * as Yup from "yup";
import {addCategorie} from '../store/slices/categorieSlice'


const categorieSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    type: Yup.string()
})

function NewCategorieScreen({navigation}) {

    const dispatch = useDispatch();
    const [addFailed, setAddFailed] = useState(false)
    const loading = useSelector(state => state.entities.categorie.loading)

    const AddNewCategorie = async (categorie) => {
        await dispatch(addCategorie(categorie))
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
        <ScrollView>
            <AppForm initialValues={{
                libelle: '',
                description: '',
                type: ''
            }} validationSchema={categorieSchema} onSubmit={AddNewCategorie}>
                <AppErrorMessage error='Impossible de faire lajout' visible={addFailed}/>
                <AppFormField title='Libellé' name='libelle'/>
                <AppFormField title='Description' name='description'/>
                <AppFormField title='Type' name='type'/>
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