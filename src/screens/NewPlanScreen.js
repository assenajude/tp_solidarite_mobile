import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-community/picker'

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import * as planActions from '../store/actions/planActions'

const planValideSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    mensualite: Yup.number(),
    compensation: Yup.number()
})

function NewPlanScreen({navigation}) {
    const dispatch = useDispatch();
    const [addFailed, setAddFailed] = useState(false);
    const payements = useSelector(state => state.payement.payements);
    const [payementId, setPayementId]  = useState(1)


    const addNewPlan = async (plan) => {
        const planData = {
            idPayement: payementId,
            libelle: plan.libelle,
            description: plan.description,
            mensualite: plan.mensualite,
            compensation: plan.compensation
        }

        try {
            if(!payementId) {
                Alert.alert('Avertissement', 'Veillez choisir un payement', [
                    {
                        text: 'ok',  onPress: () => { return;}
                    }
                ], {cancelable: false});
                return ;
            }
            await dispatch(planActions.addPlan(planData));
            navigation.goBack()
        } catch (e) {
            setAddFailed(true)
           throw new Error(e.message)
        }
    }

    const listPayementItems = () => {
        return (
            payements.map((payement, index) => <Picker.Item label={payement.mode} value={payement.id} key={index}/>)
        )
    }

    return (
        <View style={styles.container}>
        <ScrollView>
            <View style={styles.listContainer}>
                <Text style={{fontWeight: 'bold', marginRight: 15}}>Payement: </Text>
                <Picker style={styles.listStyle}
                        selectedValue={payementId}
                        onValueChange={(id, index) => {
                            setPayementId(id);
                        }}>
                    {listPayementItems()}
                </Picker>
            </View>

          <AppForm initialValues={{
              libelle: '',
              description: '',
              mensualite: 0,
              compensation: 0
          }} validationSchema={planValideSchema} onSubmit={addNewPlan}>
              <AppFormField title='Libelle' name='libelle'/>
              <AppFormField title='Description' name='description'/>
              <AppFormField title='Nombre de mensualité' name='mensualite'/>
              <AppFormField title='Compensation' name='compensation'/>
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
    }
})
export default NewPlanScreen;