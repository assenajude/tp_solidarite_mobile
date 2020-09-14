

import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, StyleSheet, Alert, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'
import * as Yup from 'yup'

import AppText from "../components/AppText";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {addRelais} from "../store/slices/pointRelaisSlice";
import {getSelectedRegion} from "../store/slices/regionSlice";


const relaisValideSchema = Yup.object().shape({
    nom: Yup.string(),
    contact: Yup.string(),
    adresse: Yup.string(),
    email: Yup.string(),
    adresseLivraisonId: Yup.number()
})


function NewPointRelaisScreen(props) {
    const dispatch = useDispatch()

const regions = useSelector(state => state.entities.region.list);
const selectedVilles = useSelector(state => state.entities.region.regionVilles);
const [selectedRegion, setSelectedRegion] = useState(1)
const [selectedVille, setSelectedVille] = useState(1)

    const handleAddRelais = async (relais) => {
        const relaisData = {
            villeId: selectedVille,
            nom: relais.nom,
            contact: relais.contact,
            adresse: relais.adresse,
            email: relais.email
        }

                try {
                    await dispatch(addRelais(relaisData))
                } catch (e) {
                    Alert.alert('Error', `Impossible d'ajouter le point relais, essayez encore..`, [
                        {text: 'ok', onPress: () => {return;}}
                    ])
                }
    }

    useEffect(() => {
        dispatch(getSelectedRegion(1))
    }, [setSelectedRegion, setSelectedVille])



    return (
        <>
            <View style={styles.adresse}>
               <AppText style={{fontWeight: 'bold', marginRight: 20}}>region:</AppText>
                <Picker style={{height: 50, width: 150}} mode='dropdown' selectedValue={selectedRegion} onValueChange={(value) => {
                    setSelectedRegion(value)
                    dispatch(getSelectedRegion(value))

                }}>
                    {regions.map((region, index) => <Picker.Item label={region.nom} value={region.id} key={index}/>)}
                </Picker>
            </View>
            <View style={styles.adresse}>
               <AppText style={{fontWeight: 'bold', marginRight: 20}}>Ville:</AppText>
              {selectedVilles.length >= 1 &&  <Picker style={{height: 50, width: 150}} mode='dropdown' selectedValue={selectedVille} onValueChange={(value) => setSelectedVille(value)}>
                    {selectedVilles.map((ville, index) => <Picker.Item label={ville.nom} value={ville.id} key={index}/>)}
                </Picker>}
                {selectedVilles.length === 0 && <AppText>Aucune ville pour cette region</AppText>}
            </View>

        <ScrollView>
            <AppForm initialValues={{
                nom: '',
                contact: '',
                adresse: '',
                email: ''
            }} validationSchema={relaisValideSchema} onSubmit={handleAddRelais}>
                <AppFormField title='Nom' name='nom' />
                <AppFormField title='Contact' name='contact' />
                <AppFormField title='Adresse' name='adresse' />
                <AppFormField title='E-mail' name='email' />
                <AppSubmitButton title='Ajouter'/>
            </AppForm>
        </ScrollView>
            </>
    );
}

const styles = StyleSheet.create({
    adresse: {
        flexDirection: 'row'
    }
})
export default NewPointRelaisScreen;