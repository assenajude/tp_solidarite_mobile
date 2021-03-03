import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import * as Yup from 'yup'
import {useDispatch, useSelector, useStore} from 'react-redux';
import {Picker} from '@react-native-community/picker'

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addPlan} from '../store/slices/planSlice'
import FormImageListPicker from "../components/forms/FormImageListPicker";
import AppActivityIndicator from "../components/AppActivityIndicator";


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

    const listPayements = useSelector(state => state.entities.payement.list)
    const isLoading = useSelector(state => state.entities.plan.loadingPlan)

    const [payementId, setPayementId]  = useState(1);


    const addNewPlan = async (plan) => {
        const planData = {
            payementId,
            libelle: plan.libelle,
            description: plan.description,
            mensualite: plan.mensualite,
            compensation: plan.compensation,
            images: plan.images
        }
            await dispatch(addPlan(planData));
        const error = store.getState().entities.plan.error
        if(error !== null) {
            return alert('Impossible dajouter le plan, une erreur est apparue.')
        }
        navigation.goBack();
    };
            return (
                <View style={styles.container}>
                    <AppActivityIndicator visible={isLoading}/>
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