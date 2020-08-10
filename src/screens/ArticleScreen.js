import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {View,ScrollView, StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker'

import * as Yup from 'yup'


import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import articleService from "../api/articleService";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";


const articleValidationSchema = Yup.object().shape({
    code: Yup.string(),
    prix: Yup.number(),
    quantite: Yup.number(),
    aide: Yup.string(),
    designation: Yup.string(),
    description: Yup.string(),
    articleImage: Yup.string()
})

function ArticleScreen(props) {

    const [registerFailed, setRegisterfailed] = useState(false);
    const [image, setImage] = useState(null);
    const categories = useSelector(state => state.categorie.categories);
    const [categorieId, setCategorieId] = useState(1)
    const dispatch = useDispatch();



    useEffect(()=> {
    }, [])

    const listCategories = () => {
        return (
            categories.map((categorie, index) => <Picker.Item label={categorie.libelleCateg} value={categorie.id} key={index.toString()}/>)
        )
    }


    const handleAddArticle = async (article) => {
        try {
            console.log(article);
            const response = await articleService.createArticle(article);
            if (!response.ok) setRegisterfailed(true);
            console.log(response)
        } catch (e) {
            setRegisterfailed(true)
            throw new Error(e.message)
        }

    }

    return (
        <View style={styles.container}>
            <Picker style={{height: 50, width: 120}} selectedValue={categorieId} onValueChange={(id) => {
                console.log(id)
                setCategorieId(id)}}>
                {listCategories()}
            </Picker>
        <ScrollView>
            <AppForm initialValues={{
                code: '',
                designation: '',
                quantite: 0,
                prix: 0,
                aide: '',
                description: '',
                articleImage:null
            }}
                     validationSchema={articleValidationSchema}
                     onSubmit={handleAddArticle}

            >
                <AppFormField name='code' title='Code'/>
                <AppFormField name='designation' title='designation'/>
                <AppFormField name='qte' title='Quantite'/>
                <AppFormField name='prix' title='Prix'/>
                <AppFormField name='aide' title='Aide?'/>
                <AppFormField name='description' title='Description'/>
                 <AppFormImagePicker name='articleImage'/>
                <AppSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default ArticleScreen;