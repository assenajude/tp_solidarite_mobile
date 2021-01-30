import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {View, StyleSheet, ScrollView, FlatList} from 'react-native'
import * as Yup from 'yup';


import ListFooter from "../components/list/ListFooter";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import ListItem from "../components/list/ListItem";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import {loadPayements, createPayement} from '../store/slices/payementSlice'

const validePayementSchema = Yup.object().shape({
    mode: Yup.string()
})

function PayementScreen({navigation}) {
    const dispatch = useDispatch();
    const payements = useSelector(state => state.entities.payement.list);
    const loading = useSelector(state => state.entities.payement.loading);
    const [mode, setMode] = useState(0);


   const getAllPayements = useCallback(async () => {
        await dispatch(loadPayements())
   }, [])

    const addNewPayement = useCallback(async (payement) => {
            await dispatch(createPayement(payement));
            setMode(0)
    }, [])

    useEffect(() => {
        getAllPayements();
    }, [ getAllPayements])

    return (
        <View style={styles.container}>
        <View>
           <View>
               { payements.length === 0 &&
                   <View style={styles.vide}>
                       <AppText>Aucun payement trouvé</AppText>
                   </View>
               }
               <FlatList data={payements}
                         keyExtractor={item => item.id.toString()}
               renderItem={({item}) => <ListItem propriety1={item.id} propriety2={item.mode}/>}/>
           </View>
            {mode === 1 && <ScrollView>
                <AppForm initialValues={{
                    mode: ''
                }} validationSchema={validePayementSchema} onSubmit={addNewPayement}>
                    <AppFormField name='mode' title='Mode'/>
                    <AppSubmitButton title='Ajouter'/>
                    <AppButton style={styles.retour}  onPress={() => setMode(0)} title='retour'/>
                </AppForm>
            </ScrollView>}
        </View>
          {mode ===0 &&  <View style={styles.addButton}>
                <ListFooter onPress={() => setMode(1)} />
            </View>}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    addButton: {
        alignSelf: 'flex-end',
        margin: 50
    },
    retour: {
        padding: 2,
        width: 60,
        margin: 10
    },
    vide: {
      flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 50
    }
})
export default PayementScreen;