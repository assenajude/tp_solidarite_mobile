import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {View,ScrollView,Alert, StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker'

import * as Yup from 'yup'


import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppText from "../components/AppText";
import {loadCategories} from '../store/slices/categorieSlice';
import {saveArticle, loadArticles, saveEditedArticle} from '../store/slices/articleSlice'
import AppFormSwitch from "../components/forms/AppFormSwitch";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getHomeCounterIncrement} from "../store/slices/mainSlice";
import FormImageListPicker from "../components/forms/FormImageListPicker";


const articleValidationSchema = Yup.object().shape({
    prixReel: Yup.number(),
    prixPromo: Yup.number(),
    quantite: Yup.number(),
    aide: Yup.boolean(),
    designation: Yup.string(),
    description: Yup.string(),
    images: Yup.array().min(1, 'Veuillez choisir au moins une image')
})

function NewArticleScreen({route, navigation}) {
    const store = useStore()
    const article = route.params
    const [categorieId, setCategorieId] = useState(1)
    const loading = useSelector(state => state.entities.article.loading)
    const dispatch = useDispatch();
    const categories = useSelector(state => state.entities.categorie.list);
    const [addLoading, setAddLoading] = useState(false)
    const [initValues, setInitValues] = useState({})
    const [editMode, setEditMode] = useState(false)


    const getCategories = useCallback(async () => {
        await dispatch(loadCategories())
    }, [dispatch])

    const getAddedStatus = state => {
        return state.entities.article.articleAddedSuccess
    }


    const handleAddArticle = async (newArticle) => {
        if(!editMode) {
            const articleData = {
                categorieId,
                designation: newArticle.designation,
                quantite: newArticle.quantite,
                prixReel: newArticle.prixReel,
                prixPromo: newArticle.prixPromo,
                aide: newArticle.aide,
                description: newArticle.description,
                images: newArticle.images
            }
            await dispatch(saveArticle(articleData))
            const error = store.getState().entities.article.error
            if(error === null) {
                await dispatch(loadArticles())
                dispatch(getHomeCounterIncrement())
                navigation.goBack()
            } else {
                Alert.alert('Erreur', "Une erreur est apparue", [
                    {text: 'ok', onPress: () => {return;}}
                ], {cancelable: false})
            }
        } else {
            const editedData= {
                categorieId,
                articleId: article.id,
                designation: newArticle.designation,
                quantite: newArticle.quantite,
                prixReel: newArticle.prixReel,
                prixPromo: newArticle.prixPromo,
                aide: newArticle.aide,
                description: newArticle.designation,
                images: newArticle.images
            }
            await dispatch(saveEditedArticle(editedData))
        }
    }

    useEffect(()=> {
        if(article) {
          setInitValues({
              designation: article.designArticle,
              quantite: String(article.qteStock),
              prixReel: String(article.prixReel),
              prixPromo: String(article.prixPromo),
              aide: article.aide,
              description: article.descripArticle,
              images: article.imagesArticle
          })
            setEditMode(true)
        } else {
            setInitValues({
                designation: '',
                quantite: '',
                prixReel: '',
                prixPromo: '',
                aide: false,
                description: '',
                images: []
            })
        }
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
                        setCategorieId(id)}}>
                        {listCategories()}
                    </Picker>
                </View>
                <View style={styles.formStyle}>
                    <AppForm initialValues={{
                        designation: initValues.designation,
                        quantite: initValues.quantite,
                        prixReel: initValues.prixReel,
                        prixPromo: initValues.prixPromo,
                        aide: initValues.aide,
                        description: initValues.description,
                        images: initValues.images
                    }}
                             validationSchema={articleValidationSchema}
                             onSubmit={handleAddArticle}>
                        <FormImageListPicker name='images'/>
                        <AppFormField name='designation' title='designation'/>
                        <AppFormField name='quantite' title='Quantite'/>
                        <AppFormField name='prixReel' title='Prix réel'/>
                        <AppFormField name='prixPromo' title='Prix promo'/>
                        <AppFormField name='description' title='Description'/>
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