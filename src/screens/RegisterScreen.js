import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {ScrollView, StyleSheet, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import * as yup from 'yup'

import Color from "../utilities/colors"
import AppText from "../components/AppText";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppForm from "../components/forms/AppForm";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import {getLoginReset, getUserProfileAvatar, register, signin} from '../store/slices/authSlice'
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getOrdersByUser} from "../store/slices/orderSlice";
import {getFacturesByUser} from "../store/slices/factureSlice";
import {getConnectedUserData} from "../store/slices/userProfileSlice";
import {getUserFavoris} from "../store/slices/userFavoriteSlice";
import {getAdresse} from "../store/slices/userAdresseSlice";
import {getCartItems} from "../store/slices/shoppingCartSlice";

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
    }).required("Veuillez confirmer le mot de passe.")
})

function RegisterScreen({navigation}) {
    const store = useStore()
    const loading = useSelector(state => state.auth.loading)
    const [registerFailed, setRegisterFailed] = useState(false)
    const [loginError, setLogginError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch();

    const getUserData = () => {
        dispatch(getOrdersByUser())
        dispatch(getFacturesByUser())
        dispatch(getUserProfileAvatar())
        dispatch(getConnectedUserData())
        dispatch(getUserFavoris())
        dispatch(getAdresse())
        dispatch(getCartItems())
    }

    const handleSubmit = async(user) => {
        const userData = {
            username: user.username,
            email: user.email,
            password: user.password
        }
            await dispatch(register(userData));
            const error = store.getState().auth.error
            if(error !== null) {
                setRegisterFailed(true)
                setErrorMessage("Désolé, nous n'avons pas pu créer votre compte, veuillez réessayer plutard.")
                return;
            } else {
               await dispatch(signin(user))
                const loginError = store.getState().auth.error
                if(loginError !== null) {
                    setLogginError(true)
                    setErrorMessage("Votre compte a été créé mais nous n'avons pas pu vous connecter")
                    return;
                } else {
                    getUserData()
                }
            }
       navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})
    }


    useEffect(() => {
        return () => {
            dispatch(getLoginReset())
        }
    }, [])

    return (
        <>
            <AppActivityIndicator visible={loading}/>
        <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
            <Image resizeMode='contain' style={styles.logoStyle} source={require('../assets/icon.png')} />
            <ScrollView style={{marginBottom: 20}}>
            <AppText lineNumber={1} style={styles.headerStyle}>Inscription</AppText>
                <AppErrorMessage visible={registerFailed || loginError} error={errorMessage}/>
                <AppForm initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmation: ''
                }}
                   onSubmit={handleSubmit}
                  validationSchema={registerValidationSchema}
                >
                    <AppFormField title='Username' name='username' autoCapitalize='none'/>

                    <AppFormField title='E-mail' name='email' keyboardType='email-address' autoCapitalize='none'/>

                    <AppFormField title='password' name='password' secureTextEntry autoCapitalize='none' />

                    <AppFormField title='password-confirmation' name='confirmation' secureTextEntry autoCapitalize='none'/>

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