import React, {useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {ScrollView, StyleSheet, Image, View} from 'react-native';
import * as yup from 'yup'
import {LinearGradient} from 'expo-linear-gradient'


import Color from "../utilities/colors"
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import {signin, getUserProfileAvatar, getLoginReset} from '../store/slices/authSlice'
import routes from '../navigation/routes'
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getOrdersByUser} from "../store/slices/orderSlice";
import {getFacturesByUser} from "../store/slices/factureSlice";
import {getAdresse} from "../store/slices/userAdresseSlice";
import {getUserFavoris} from "../store/slices/userFavoriteSlice";
import {getConnectedUserData} from "../store/slices/userProfileSlice";
import AppLabelLink from "../components/AppLabelLink";
import {getCartItems} from "../store/slices/shoppingCartSlice";

const loginValidationSchema = yup.object().shape({
    username: yup.string().required("Veillez saisir un nom d'utilisateur"),
    password: yup.string().min(5, 'Le mot de passe doit contenir au moins 5 caratères').required('le mot de passe est requis')
})

function LoginScreen({navigation}) {

    const isLoading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)


    const dispatch = useDispatch();
    const store = useStore()


    const handleLogin = async (user) => {
        await dispatch(signin(user))
        const error = store.getState().auth.error
        if(error !== null) return;
        dispatch(getOrdersByUser())
        dispatch(getFacturesByUser())
        dispatch(getUserProfileAvatar())
        dispatch(getConnectedUserData())
        dispatch(getUserFavoris())
        dispatch(getAdresse())
        dispatch(getCartItems())
        navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})
    }

    useEffect(() => {
        return () => {
            dispatch(getLoginReset())
        }
    }, [])

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
             <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                 <Image resizeMode='contain' style={styles.logoStyle} source={require('../assets/icon.png')} />
                 <ScrollView>
                <AppText style={styles.headerStyle}>Connection</AppText>
                    <AppErrorMessage visible={error !== null} error="Le nom d'utilisateur ou le mot de passe n'est pas correct"/>
                    <AppForm initialValues={{username: '', password: ''}}
                            onSubmit={handleLogin}
                            validationSchema={loginValidationSchema}
                    >
                        <AppFormField title='Username' name='username'
                                      iconName='user' autoCapitalize='none'/>
                        <AppFormField title='Password' secureTextEntry iconName='lock'
                                      name='password' autoCapitalize='none'
                        />
                        <AppSubmitButton  title='Connectez-vous'/>
                    </AppForm>
                     <View style={{
                         flexDirection: 'row',
                         marginTop: 20
                     }}>
                         <AppText style={{color: Color.bleuFbi}}>Vous n'avez pas de compte?</AppText>
                         <AppLabelLink content='créez un' otherTextStyle={{color: Color.or}}
                                       handleLink={() => navigation.navigate('AccueilNavigator', {screen: routes.REGISTER})}/>
                     </View>
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