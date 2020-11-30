import React from 'react';
import {View, ScrollView} from "react-native";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import colors from "../utilities/colors";
import AppText from "../components/AppText";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import * as Yup from 'yup'
import {useDispatch} from "react-redux";
import {addColor, addTaille} from "../store/slices/colorAndSizeSlice";

const colorValidSchema = Yup.object().shape({
    couleur: Yup.string()
})

const tailleValidSchema = Yup.object().shape({
    taille: Yup.string()
})

function ColorAndSizeScreen(props) {
    const dispatch = useDispatch()

    const handleAddColor = (data) => {
        dispatch(addColor({couleur: data.couleur}))
    }

    const handleAddTaille = (data) => {
        dispatch(addTaille({taille: data.taille}))
    }

    return (
        <ScrollView>
            <View style={{marginTop: 20}}>
            <View style={{
                backgroundColor: colors.rougeBordeau
            }}>
                <AppText style={{color: colors.blanc}}>Ajouter une couleur</AppText>
            </View>

                <AppForm initialValues={{
                    couleur: ''
                }} onSubmit={handleAddColor} validationSchema={colorValidSchema}>
                    <AppFormField title='Color name' name='couleur'/>
                    <AppSubmitButton title='Ajouter'/>
                </AppForm>
                </View>

            <View style={{marginTop: 20}}>
            <View style={{
                backgroundColor: colors.rougeBordeau
            }}>
                <AppText style={{color: colors.blanc}}>Ajouter une taille</AppText>
            </View>

                <AppForm initialValues={{
                    taille: ''
                }} onSubmit={handleAddTaille} validationSchema={tailleValidSchema}>
                    <AppFormField title='Color name' name='taille'/>
                    <AppSubmitButton title='Ajouter'/>
                </AppForm>
                </View>

        </ScrollView>
    );
}

export default ColorAndSizeScreen;