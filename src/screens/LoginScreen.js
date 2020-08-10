import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import {View, KeyboardAvoidingView,ScrollView, StyleSheet, Image, Keyboard, TouchableWithoutFeedback, Platform} from 'react-native';
import * as yup from 'yup'
import {LinearGradient} from 'expo-linear-gradient'

import Color from "../utilities/colors"
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import User from "../models/user";
import * as authAction from '../store/actions/authActions'
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AccueilNavigation from '../navigation/AccueilNavigator';
import routes from '../navigation/routes'

const loginValidationSchema = yup.object().shape({
    username: yup.string().required("Veillez saisir un nom d'utilisateur"),
    password: yup.string().min(5, 'Le mot de passe doit contenir au moins 5 caratères').required('le mot de passe est requis')
})

function LoginScreen({navigation}) {
    const loginUser = new User({
        email: '',
        password: ''
    });

    const [authenticated, setAuthenticated] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false)

    const dispatch = useDispatch();

    const handleLogin = async (values) => {
        try{
            setAuthenticated(false);
            setLoginFailed(false)
            const userData = await dispatch(authAction.login(values.username, values.password));
            setAuthenticated(true);
            navigation.navigate(routes.ACCUEIL)
           // console.log(userData.data);
        } catch (e) {
            setAuthenticated(false);
            setLoginFailed(true)
            throw new Error(e.message)

        }

    }

    return (

            // <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={100} style={styles.screen}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
             <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <ScrollView>
                <View  style={styles.mainContainer}>
                <Image resizeMode='contain' style={styles.logoStyle} source={require('../assets/logo_solidarite.png')} />
                <AppText style={{backgroundColor: Color.rougeBordeau, fontSize: 20}}>Connection</AppText>
                <View style={styles.inputStyle}>
                    <AppErrorMessage visible={loginFailed} error='erreur lors de la connection'/>
                    <AppForm initialValues={{username: '', password: ''}}
                            onSubmit={handleLogin}
                            validationSchema={loginValidationSchema}
                    >
                        <AppFormField title='Username' name='username'
                                      iconName='user'/>
                        <AppFormField title='Password' secureTextEntry iconName='lock'
                                      name='password'
                        />
                        <AppSubmitButton  title='Connectez-vous'/>

                    </AppForm>
                </View>
                </View>
            </ScrollView>
             </LinearGradient>
            </TouchableWithoutFeedback>
            // </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1

    },
    imageContainer: {
        width: '100%',
        height: '100%'

    },
    gradient: {
        width: '100%',
        height: '100%'
    },
    mainContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        borderColor: Color.rougeBordeau
    },
    buttonStyle: {
        color: Color.bleuFbi,
        margin: 10
    }

})

export default LoginScreen;