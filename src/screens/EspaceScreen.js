import React, {useState} from 'react';
import {FlatList, View, StyleSheet, ScrollView} from 'react-native'
import {useSelector, useDispatch} from "react-redux";
import * as Yup from 'yup'

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addNewEspace} from "../store/slices/espaceSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ListFooter from "../components/list/ListFooter";
import FormImageListPicker from "../components/forms/FormImageListPicker";

const validEspace = Yup.object().shape({
    nom: Yup.string(),
    decsription: Yup.string()
})

function EspaceScreen(props) {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.entities.espace.loading)
    const espaces = useSelector(state => state.entities.espace.list)
    const [addMode, setAddMode] = useState(false)

    const handleAddEspace = (data) => {
        dispatch(addNewEspace(data))
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            {espaces.length>0 && <FlatList data={espaces} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) =><AppText>{item.nom}</AppText>}/>}
            {espaces.length === 0 && <View style={{
                flex:1,
                justifyContent: 'center',
                alignItems: "center"
            }}>
                <AppText>Aucun espace disponible</AppText>
            </View>}
       { addMode && <ScrollView>
           <AppForm initialValues={{
               nom: '',
               description: '',
           }} validationSchema={validEspace} onSubmit={handleAddEspace}>
               <AppFormField title='Nom:' name='nom'/>
               <AppFormField title='Description:' name='description'/>
               <AppSubmitButton title='Ajouter' showLoading={isLoading}/>
               <AppButton title='retour' onPress={() => setAddMode(false)} style={{alignSelf:'flex-start'}}/>
           </AppForm>
       </ScrollView>  }
       {!addMode && <View style={styles.addNewButton}>
       <ListFooter onPress={() => setAddMode(true)}/>
       </View>}
            </>
    );
}

const styles = StyleSheet.create({
    emptyStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addNewButton: {
        position: 'absolute',
        right: 50,
        bottom: 50,
    }
})

export default EspaceScreen;