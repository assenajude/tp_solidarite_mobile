import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {View,ImageBackground,ScrollView, TextInput, StyleSheet, Image, Text, KeyboardAvoidingView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import * as yup from 'yup'

import Color from "../utilities/colors"
import AppText from "../components/AppText";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppForm from "../components/forms/AppForm";
import * as authActions from '../store/actions/authActions'
import AppErrorMessage from "../components/forms/AppErrorMessage";

const registerValidationSchema = yup.object().shape({
    username: yup.string().min(2,'Le pseudo doit contenir au moins 2 caractère'),
    email: yup.string().email('Adresse email invalide').required("L'adresse email est requise"),
    password: yup.string().min(5, 'Le mot de passe doit contenir au moins 5 caractères').required('Le mot de passe est requis'),
    // confirmation: yup.string()
})

function RegisterScreen(props) {
    const [registerFailed, setRegisterFailed] = useState(false);
    const [registerErreur, setRegisterErreur] = useState()

    const dispatch = useDispatch();


    const handleSubmit = async({username, email, password}) => {
        try {
            const response = await dispatch(authActions.registerUser(username, email, password));
            //if (!response.ok) setRegisterFailed(true);
            console.log(response.data)
        } catch (e) {
            console.log(e.message);
            setRegisterFailed(true)
        }

        }


    return (
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <ScrollView>
            <View style={styles.mainContainer}>

            <Image resizeMode='contain' style={styles.logoStyle} source={require('../assets/logo_solidarite.png')} />
            <AppText lineNumber={1} style={{backgroundColor: Color.rougeBordeau, fontSize: 20}}>Inscription</AppText>
            <View style={styles.inputStyle}>
                <AppErrorMessage visible={registerFailed} error="erreur lors de l'enregistrement"/>
                <AppForm initialValues={{
                    username: '',
                    email: '',
                    password: ''
                }}
                   onSubmit={handleSubmit}
                  validationSchema={registerValidationSchema}
                >
                    <AppFormField title='Username' name='username'/>

                    <AppFormField title='E-mail' name='email' keyboardType='email-address'/>

                    <AppFormField title='password' name='password' secureTextEntry />

                    {/*<AppFormField title='password-confirmation' name='confirmation' secureTextEntry/>*/}

                    <AppSubmitButton title='Inscrivez-vous'/>
                </AppForm>
                <AppText iconName='warning' style={{color:'black', fontSize: 12}} lineNumber={1}>Vous devez completer votre profil plutard</AppText>

            </View>
            </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '100%',
        height: '100%'
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
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
        borderWidth: 20,
        backgroundColor: Color.blanc,
        borderColor: Color.rougeBordeau
    },
    buttonStyle: {
        color: Color.bleuFbi,
        margin: 10
    }

})

export default RegisterScreen;