import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {View, Text, StyleSheet, ScrollView, FlatList, Button} from 'react-native'
import * as Yup from 'yup';


import * as payementActions from '../store/actions/payementActions'
import ListFooter from "../components/list/ListFooter";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import ListItem from "../components/list/ListItem";
import {set} from "react-native-reanimated";
import AppButton from "../components/AppButton";

const validePayementSchema = Yup.object().shape({
    mode: Yup.string()
})

function PayementScreen({navigation}) {
    const dispatch = useDispatch();
    const payements = useSelector(state => state.payement.payements)
    const [mode, setMode] = useState(0);


    const addNewPayement = async (payement) => {
        try{
            await dispatch(payementActions.addPayement(payement));
            setMode(0)
        } catch (e) {
            throw new Error(e.message)
        }
    }

    useEffect(() => {
    }, [])

    return (

        <View style={styles.container}>
        <View>
           <View>
               <FlatList data={payements}
                         keyExtrator={item => item.id.toString()}
               renderItem={({item}) => <ListItem key1={item.id} key2={item.mode}/>}/>
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
    }
})
export default PayementScreen;