import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from "react-native";
import * as Yup from 'yup'

import {useDispatch, useSelector, useStore} from "react-redux";
import ProfileImagePicker from "../components/user/ProfileImagePicker";
import {getSaveEditInfo} from "../store/slices/userProfileSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {getAvatarChange} from "../store/slices/authSlice";

const valideEditInfo = Yup.object().shape({
    username: Yup.string(),
    email: Yup.string().email('Veillez saisir une adresse mail valide'),
    nom: Yup.string(),
    prenom: Yup.string(),
    tel: Yup.string(),
    adresse: Yup.string(),
    profession: Yup.string()
})

function EditUserInfoScreen({navigation}) {
    const dispatch = useDispatch()
    const store = useStore()

    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.profile.loading)
    const currentUser = useSelector(state => state.profile.connectedUser)


    const [showProfileModal, setShowProfileModal] = useState(false)
    const [newPhoto, setNewPhoto] = useState([user.avatar])


    const handleChangeAvatar = (imageUrl) => {
        setNewPhoto([imageUrl])
    }

    const handleChangePhoto = (url) => {
        setNewPhoto([url])
    }

    const handleSaveAvatarUpdate = async () => {
        await dispatch(getAvatarChange({images: newPhoto}))
    }

    const handleSaveEditInfo = async (info) => {
        const data = {
            userId: user.id,
            username: info.username,
            email: info.email,
            nom: info.nom,
            prenom: info.prenom,
            phone: info.phone,
            adresse: info.adresse,
            profession: info.profession
        }
        await dispatch(getSaveEditInfo(data))
        const error = store.getState().profile.error
        if(error !== null) {
            alert('Une erreur est apparue. Veillez reessayer')
        } else {
            navigation.goBack()
        }

    }

    const handleDeleteAvatar = () => {
        dispatch(getAvatarChange({images: []}))
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
        <ScrollView>
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row'
            }}>
                <ProfileImagePicker showPickerModal={showProfileModal} dismissPickerModal={() => setShowProfileModal(false)}
                                   getPickerModalShown={() => setShowProfileModal(true)}
                                   imageUrl={{uri: newPhoto[0]}} onChangeImage={handleChangeAvatar} onChangePhoto={handleChangePhoto}
                                    changeProfileAvatar={handleSaveAvatarUpdate} deleteAvatar={handleDeleteAvatar}/>
            </View>
            <AppForm initialValues={{
                username: currentUser.username,
                email: currentUser.email,
                nom: currentUser.nom,
                prenom: currentUser.prenom,
                phone: currentUser.phone,
                adresse: currentUser.adresse,
                profession: currentUser.profession
            }} validationSchema={valideEditInfo} onSubmit={handleSaveEditInfo}>
                <AppFormField title='Nom utilisateur' name='username' />
                <AppFormField title='E-mail' name='email'/>
                <AppFormField title='Nom' name='nom'/>
                <AppFormField title='Prenom' name='prenom'/>
                <AppFormField title='Telephone' name='phone'/>
                <AppFormField title='Adresse' name='adresse'/>
                <AppFormField title='Profession' name='profession'/>
                <AppSubmitButton title='Valider' showLoading={isLoading}/>
            </AppForm>
        </View>
        </ScrollView>
            </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20
    }
})

export default EditUserInfoScreen;