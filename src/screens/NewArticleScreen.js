import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {View,ScrollView,Alert, StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker'

import * as Yup from 'yup'


import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppFormImagePicker from "../components/forms/AppFormImagePicker";
import AppText from "../components/AppText";
import {loadCategories} from '../store/slices/categorieSlice';
import {saveArticle, loadArticles} from '../store/slices/articleSlice'
import AppFormSwitch from "../components/forms/AppFormSwitch";
import AppActivityIndicator from "../components/AppActivityIndicator";


const articleValidationSchema = Yup.object().shape({
    prixReel: Yup.number(),
    prixPromo: Yup.number(),
    quantite: Yup.number(),
    aide: Yup.boolean(),
    designation: Yup.string(),
    description: Yup.string(),
    articleImage: Yup.string()
})

function NewArticleScreen({navigation}) {
    const store = useStore()
    const [image, setImage] = useState(null);
    const [categorieId, setCategorieId] = useState(1)
    const loading = useSelector(state => state.entities.article.loading)
    const dispatch = useDispatch();
    const categories = useSelector(state => state.entities.categorie.list);
    const [addLoading, setAddLoading] = useState(false)

    const getCategories = useCallback(async () => {
        await dispatch(loadCategories())
    }, [dispatch])

    const getAddedStatus = state => {
        return state.entities.article.articleAddedSuccess
    }


    const handleAddArticle = async (article) => {
        const articleData = {
            categorieId,
            designation: article.designation,
            quantite: article.quantite,
            prixReel: article.prixReel,
            prixPromo: article.prixPromo,
            aide: article.aide,
            description: article.designation,
            image: article.articleImage
        }
        await dispatch(saveArticle(articleData))
        const error = store.getState().entities.article.error
       if(error === null) {
           await dispatch(loadArticles())
           navigation.goBack()
       } else {
           Alert.alert('Erreur', "Une erreur est apparue", [
               {text: 'ok', onPress: () => {return;}}
           ], {cancelable: false})
       }
    }

    useEffect(()=> {
        getCategories()
    }, [])


    const listCategories = () => {
        return (
            categories.map((categorie, index) => <Picker.Item label={categorie.libelleCateg} value={categorie.id} key={index.toString()}/>)
        )
    }



    return (
        <>
        <AppActivityIndicator visible={loading}/>
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <AppText style={{marginRight: 20, fontWeight: 'bold'}}>Categorie: </AppText>
                    <Picker mode='dropdown' style={{height: 50, width: 150}} selectedValue={categorieId} onValueChange={(id) => {
                        console.log(id)
                        setCategorieId(id)}}>
                        {listCategories()}
                    </Picker>
                </View>
                <View style={styles.formStyle}>
                    <AppForm initialValues={{
                        designation: '',
                        quantite: 0,
                        prixReel: 0,
                        prixPromo: 0,
                        aide: false,
                        description: '',
                        articleImage:null
                    }}
                             validationSchema={articleValidationSchema}
                             onSubmit={handleAddArticle}

                    >
                        <AppFormField name='designation' title='designation'/>
                        <AppFormField name='quantite' title='Quantite'/>
                        <AppFormField name='prixReel' title='Prix réel'/>
                        <AppFormField name='prixPromo' title='Prix promo'/>
                        <AppFormField name='description' title='Description'/>
                        <AppFormImagePicker name='articleImage'/>
                        <AppFormSwitch name='aide' title='Possibilité de vente à credit?'/>
                        <AppSubmitButton  title='Ajouter' showLoading={addLoading}/>
                    </AppForm>
                </View>
            </View>
        </ScrollView>
      </>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 20,
        bottom: 20
    },
    listContainer: {
        flexDirection: 'row'
    },
    formStyle: {
        padding: 10,
        paddingBottom: 30
    }
})
export default NewArticleScreen;