import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, StyleSheet, FlatList, ScrollView} from "react-native";
import * as Yup from 'yup'
import {Picker} from "@react-native-community/picker";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import {saveVille, getAllVilles} from '../store/slices/villeSlice'
import AppText from "../components/AppText";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import ListItem from "../components/list/ListItem";
import ListFooter from "../components/list/ListFooter";
import AppButton from "../components/AppButton";

const villeValideSchema = Yup.object().shape({
    nom: Yup.string(),
    kilometrage: Yup.number(),
    prixkilo: Yup.number()
})

function VilleScreen(props) {
    const dispatch = useDispatch();

    const regions = useSelector(state => state.entities.region.list);
    const villes = useSelector(state => state.entities.ville.list);
    const [listMode, setListMode] = useState(true);
    const [addMode, setAddMode] = useState(false)

    const [selectedRegion, setSelectedRegion] = useState(1)

    const handleSaveVille = async(ville) => {
        const villeData = {
            regionId: selectedRegion,
            nom: ville.nom,
            kilometrage: ville.kilometrage,
            prixKilo: ville.prixKilo

        }
        await dispatch(saveVille(villeData));
        setAddMode(false);
        setListMode(true);
    }
    useEffect(() => {
    }, [dispatch])

    return (
        <View style={styles.container}>
            <FlatList data={villes} keyExtractor={item => item.id.toString()}
            renderItem={({item}) =><ListItem propriety1={item.id} propriety2={item.nom} propriety3={item.localisation} propriety4={`${item.kilometrage}  km`}/>}/>
      {  addMode && <ScrollView>
                <View style={styles.regionStyle}>
                    <AppText>Region: </AppText>
                    <Picker style={{width: 140, height: 50}} selectedValue={selectedRegion} onValueChange={(value) => setSelectedRegion(value)} mode='dropdown'>
                        {regions.map((item, index) => <Picker.Item label={item.nom} value={item.id} key={index}/>)}
                    </Picker>
                </View>
                <AppForm initialValues={{
                    nom: '',
                    kilometrage: '',
                    prixKilo: ''
                }} validationSchema={villeValideSchema} onSubmit={handleSaveVille}>
                    <AppFormField title='nom' name='nom'/>
                    <AppFormField title='distance' name='kilometrage'/>
                    <AppFormField title='prix au km' name='prixKilo'/>
                    <AppSubmitButton title='Ajouter'/>
                </AppForm>
         { addMode && <AppButton style={{width: 50, backgroundColor: 'green'}} title='retour' onPress={() => {
                setListMode(true);
                setAddMode(false)
            }}/>}
            </ScrollView>}
          {listMode && <ListFooter otherStyle={styles.newButton} onPress={() => {
                setAddMode(true);
                setListMode(false)
            }}/>}
        </View>

    );
}

const styles = StyleSheet.create({
    regionStyle: {
        flexDirection: 'row',
        padding: 10
    },
    container: {
        flex: 1
    },
    newButton: {
        alignSelf: 'flex-end',
        margin: 60
    }
})

export default VilleScreen;