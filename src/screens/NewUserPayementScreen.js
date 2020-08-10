import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {View, StyleSheet, Text, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker';
import * as Yup from 'yup';
import {useFormikContext, Formik} from 'formik'

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppText from "../components/AppText";
import FormFieldMode from "../components/payement/FormFieldMode";

const validePayementSchema = Yup.object().shape({
    mode: Yup.string(),
    montant: Yup.number()
})

function NewUserPayementScreen({pickerValue, changePickerValue, ...props}) {
    const plans = useSelector(state => state.plan.plans);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const dispatch = useDispatch();
    const [mode, setMode] = useState('');

    useEffect(() => {
        console.log(mode);
    }, [mode])

    const listPlan = () => {
        return (
            plans.map((plan, index)=> <Picker.Item label={plan.libelle}  value={plan.id} key={index}/>)
        )
    };


    const handleSubmit = (payement) => {
   /*      const payementObject = {
            planId: selectedPlan,
             mode: payement.mode,
             montant: payement.montant
        };
        console.log(payementObject);*/
        console.log(payement);

    }



    return (
        <View style={styles.container}>
            <ScrollView>
        { mode === 'credit' &&  <View style={styles.pickerStyle}>
                    <AppText style={{fontWeight: 'bold'}}>Plan: </AppText>
                <Picker mode='dropdown' style={{width: 150, height: 50}} selectedValue={selectedPlan}
                        onValueChange={(plan, index) => {
                            setSelectedPlan(plan)
                        }}>
                    {listPlan()}
                </Picker>
                </View>}
            <AppForm initialValues={{
                mode: '',
                montant: 0
            }} validationSchema={validePayementSchema} onSubmit={handleSubmit}>
                <FormFieldMode title='Mode' name='mode' onModeChange={value => setMode(value)}/>
                <AppFormField title='Montant' name='montant'/>
                <AppSubmitButton title='Ajouter'/>
            </AppForm>
            </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 50
    },
    pickerStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default NewUserPayementScreen;