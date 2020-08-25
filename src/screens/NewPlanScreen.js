import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator} from 'react-native'
import * as Yup from 'yup'
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {createSelector} from 'reselect'
import {Picker} from '@react-native-community/picker'

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addPlan} from '../store/slices/planSlice'
import {loadPayements} from "../store/slices/payementSlice";


const planValideSchema = Yup.object().shape({
    libelle: Yup.string(),
    description: Yup.string(),
    mensualite: Yup.number(),
    compensation: Yup.number()
})

function NewPlanScreen({navigation, route}) {

    const dispatch = useDispatch();
    const listPayements = useSelector(state => state.entities.payement.list)

    const [addFailed, setAddFailed] = useState(false);
    const [payementId, setPayementId]  = useState(1);
    const [allPayements, setAllPayements] = useState([]);

    const [showPicker, setShowPicker] = useState(false);

    const loadPayement = useCallback(async () => {
        await dispatch(loadPayements());
    }, [dispatch]);


    const payementsPlan = [
           {
               id: 1,
               modePayement: 'Cash'
           },
           {
             id: 2,
             modePayement: 'Credit'
           },
           {
               id: 3,
               modePayement: 'Cheque'
           }

        ]
    const [listPayement, setListPayement] = useState([]);






        useEffect(() => {
            loadPayement()
            setAllPayements(listPayements)

        }, [dispatch, loadPayement])



    const getList = () => {
        return (
            allPayements.map((item, index) => <Picker.Item label={item.modePayement} value={item.id} key={index}/>)
        )
    }

     /*   const getList = () => {
            return (
                planPayements.map((item, index) =>
                    <Picker.Item label={item.modePayement} value={item.id} key={index}/>)
            )
        }*/

     const areEqual = (prevList, nextList) => true;

    const ListPicker = React.memo(({list})=> {
        return (
            <Picker mode='dropdown' style={styles.listStyle}
                    selectedValue={payementId}
                    onValueChange={(id) => setPayementId(id)}>
                {listPayements.map((item, index) =>
                    <Picker.Item label={item.mode} value={item.id} key={index}/>)}
            </Picker>
        )
    }, areEqual)


    const addNewPlan = async (plan) => {
        const planData = {
            payementId,
            libelle: plan.libelle,
            description: plan.description,
            mensualite: plan.mensualite,
            compensation: plan.compensation
        }
            await dispatch(addPlan(planData));
            navigation.goBack();
    };
            return (
                <View style={styles.container}>
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