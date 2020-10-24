import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {View, ActivityIndicator,ScrollView, StyleSheet, Image, Text, KeyboardAvoidingView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import * as yup from 'yup'

import Color from "../utilities/colors"
import AppText from "../components/AppText";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import {register, signin} from '../store/slices/authSlice'
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {Alert} from "react-native-web";

const registerValidationSchema = yup.object().shape({
    username: yup.string().min(2,'Le pseudo doit contenir au moins 2 caractère').required('Veillez choisir un nom utilisateur'),
    email: yup.string().email('Adresse email invalide').required("L'adresse email est requise"),
    password: yup.string().min(5, 'Le mot de passe doit contenir au moins 5 caractères').required('Le mot de passe est requis'),
    confirmation: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
            [yup.ref("password")],
            "Les mots de passe  ne correspondent pas."
        )
    })
})

function RegisterScreen({navigation}) {
    const store = useStore()
    const error = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)
    const [registerFailed, setRegisterFailed] = useState(false);

    const dispatch = useDispatch();


    const handleSubmit = async(user) => {
        const userData = {
            username: user.username,
            email: user.email,
            password: user.password
        }
            await dispatch(register(userData));
            const error = store.getState().auth.error
            if(error === null) {
                await dispatch(signin(user))
                const newError = store.getState().auth.error
                if(newError === null) {
                    navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})
                } else {
                    Alert.alert('ERREUR', 'Vous avez creer votre compte avec succès mais nous ne pouvons pas vous connecter maintenant', [
                        {text: 'ok', onPress: () => {return;}}
                    ])
                }
            }


    }


    useEffect(() => {
    }, [])

    return (
        <>
            <AppActivityIndicator visible={loading}/>
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <Image resizeMode='contain' style={styles.logoStyle} source={require('../assets/logo_solidarite.png')} />
            <ScrollView style={{marginBottom: 20}}>
            <AppText lineNumber={1} style={styles.headerStyle}>Inscription</AppText>
                <AppErrorMessage visible={registerFailed} error="erreur lors de l'enregistrement"/>
                <AppForm initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmation: ''
                }}
                   onSubmit={handleSubmit}
                  validationSchema={registerValidationSchema}
                >
                    <AppFormField title='Username' name='username'/>

                    <AppFormField title='E-mail' name='email' keyboardType='email-address'/>

                    <AppFormField title='password' name='password' secureTextEntry />

                    <AppFormField title='password-confirmation' name='confirmation' secureTextEntry/>

                    <AppSubmitButton title='Inscrivez-vous' showLoading={loading}/>
                </AppForm>
                <AppText iconName='warning' style={{color:'black', fontSize: 12}} lineNumber={1}>Vous devez completer votre profil plutard</AppText>

            </ScrollView>
        </LinearGradient>
            </>
    );
}

const styles = StyleSheet.create({
    gradient: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerStyle: {
        backgroundColor: Color.rougeBordeau,
        color: Color.blanc,
        borderRadius: 10
    },
    imageContainer: {
        width: '100%',
        height: '100%'
    },

    logoStyle: {
        width:150,
        height: 150,
        top: 5,
    },
    inputStyle: {
        height: 'auto',
        width: '80%',
        maxWidth: 400,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonStyle: {
        color: Color.bleuFbi,
        margin: 10
    }

})

export default RegisterScreen;