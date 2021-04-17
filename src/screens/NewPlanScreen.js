import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import * as Yup from 'yup'
import {useDispatch, useSelector, useStore} from 'react-redux';
import {Picker} from '@react-native-community/picker'

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addPlan} from '../store/slices/planSlice'
import FormImageListPicker from "../components/forms/FormImageListPicker";
import AppActivityIndicator from "../components/AppActivityIndicator";
import useDirectUpload from "../hooks/useDirectUpload";
import AppUploadProgress from "../components/AppUploadProgress";


const planValideSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    mensualite: Yup.number(),
    compensation: Yup.number(),
    images: Yup.array()
})

function NewPlanScreen({navigation, route}) {

    const dispatch = useDispatch();
    const store = useStore()
    const {dataTransformer, directUpload} = useDirectUpload()

    const listPayements = useSelector(state => state.entities.payement.list)
    const isLoading = useSelector(state => state.entities.plan.loadingPlan)
    const [payementId, setPayementId]  = useState(1);
    const [planUploadModal, setPlanUploadModal] = useState(false)
    const [planUploadProgress, setPlanUploadProgress] = useState(0)

    const newPlan = async (plan, planImagesUrls) => {
        const planData = {
            payementId,
            libelle: plan.libelle,
            description: plan.description,
            mensualite: plan.mensualite,
            compensation: plan.compensation,
            planImagesLinks: planImagesUrls
        }
        await dispatch(addPlan(planData));
        const error = store.getState().entities.plan.error
        if(error !== null) {
            return alert('Impossible dajouter le plan, une erreur est apparue.')
        }
        navigation.goBack();
    }

    const addNewPlan = async(plan) => {
        const planImages = plan.images
        if(planImages.length>0) {
            const transformedData = dataTransformer(planImages)
            setPlanUploadProgress(0)
            setPlanUploadModal(true)
            const uploadResult = await directUpload(transformedData, planImages, (progress) => setPlanUploadProgress(progress))
            setPlanUploadModal(false)
            if(uploadResult){
                const imagesData = store.getState().s3_upload.signedRequestArray
                const urls = imagesData.map(item => item.url)
                await newPlan(plan, urls)
            } else {
                Alert.alert("Alert", "Des images n'ont pas été chargées, voulez-vous continuer quand meme?",
                    [{text: 'oui', onPress: async () => await newPlan(plan, [])},
                        {text: 'non', onPress: () => {return;}}])
            }
        } else {
            await newPlan(plan, [])
        }

    };
            return (
                <View style={styles.container}>
                    <AppActivityIndicator visible={isLoading}/>
                    <AppUploadProgress startProgress={planUploadModal} progress={planUploadProgress}/>
                    <ScrollView>
                        <View style={styles.listContainer}>
                            <Text style={{fontWeight: 'bold', marginRight: 15}}>Payement: </Text>
                         <Picker mode='dropdown' style={styles.listStyle}
                                                                 selectedValue={payementId}
                                                                 onValueChange={(id, index) => setPayementId(id)}>
                             {listPayements.map((item, index) =>
                                 <Picker.Item label={item.mode} value={item.id} key={index}/>)}
                            </Picker>

                        </View>
                        <AppForm initialValues={{
                            libelle: '',
                            description: '',
                            mensualite: '',
                            compensation: '',
                            images: []
                        }} validationSchema={planValideSchema} onSubmit={addNewPlan}>
                            <FormImageListPicker name='images'/>
                            <AppFormField title='Libelle' name='libelle'/>
                            <AppFormField title='Description' name='description'/>
                            <AppFormField title='Nombre de mensualité' name='mensualite'/>
                            <AppFormField title='Compensation' name='compensation'/>
                            <AppSubmitButton title='Ajouter'/>
                        </AppForm>
                    </ScrollView>
                </View>
            )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    buttonStyle: {
        marginTop: 30,
        padding: 10
    },
    listStyle: {
        height: 50,
        width: 120
    },
    listContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    videContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default NewPlanScreen;