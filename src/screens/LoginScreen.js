import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {View, Alert,ScrollView, StyleSheet, Image, Keyboard, TouchableWithoutFeedback, Platform} from 'react-native';
import * as yup from 'yup'
import {LinearGradient} from 'expo-linear-gradient'


import Color from "../utilities/colors"
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import User from "../models/user";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import {signin, autoLogin} from '../store/slices/authSlice'
import authStorage from '../store/persistStorage'
import routes from '../navigation/routes'
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getOrdersByUser} from "../store/slices/orderSlice";
import {getFacturesByUser} from "../store/slices/factureSlice";
import {getTranches} from "../store/slices/trancheSlice";
import {getUserProfileAvatar} from "../store/slices/userProfileSlice";
import {getAdresse} from "../store/slices/userAdresseSlice";
import {getAllVilles} from "../store/slices/villeSlice";
import {getUserFavoris} from "../store/slices/userFavoriteSlice";

const loginValidationSchema = yup.object().shape({
    username: yup.string().required("Veillez saisir un nom d'utilisateur"),
    password: yup.string().min(5, 'Le mot de passe doit contenir au moins 5 caratères').required('le mot de passe est requis')
})

function LoginScreen({navigation}) {
    const loginUser = new User({
        email: '',
        password: ''
    });

    const [loginFailed, setLoginFailed] = useState(false);
    const isLoading = useSelector(state => state.auth.loading)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const token = useSelector(state => state.auth.token);


    const dispatch = useDispatch();
    const store = useStore()


    const getNewUser = (state) => {
        return state.auth.user
    }

    const handleLogin = async (user) => {
        await dispatch(signin(user))
        const error = store.getState().auth.error
        if(error !== null) {
            Alert.alert('Erreur', 'Impossible de vous connecter maintenant. Veuillez reessayer plutard', [
                {text: 'ok', onPress: () => {return}}
            ])
        }
        dispatch(getOrdersByUser())
        dispatch(getFacturesByUser())
        dispatch(getTranches())
        dispatch(getUserProfileAvatar())
        dispatch(getUserFavoris())
        dispatch(getAdresse())
        dispatch(getAllVilles())
        navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
             <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                 <Image resizeMode='contain' style={styles.logoStyle} source={require('../assets/logo_solidarite.png')} />
                 <ScrollView>
                <AppText style={styles.headerStyle}>Connection</AppText>
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
            </ScrollView>
             </LinearGradient>
            </>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '100%'

    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerStyle: {
      backgroundColor: Color.rougeBordeau,
      color: Color.blanc,
      borderRadius: 10,
        margin: 20
    },

    logoStyle: {
        width:150,
        height: 150,
        top: 5,
    },
    buttonStyle: {
        color: Color.bleuFbi,
        margin: 10
    }

})

export default LoginScreen;