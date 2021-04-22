import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {ScrollView, StyleSheet, Image, View, TouchableWithoutFeedback, Alert, Keyboard, ToastAndroid} from 'react-native';
import * as yup from 'yup'
import {LinearGradient} from 'expo-linear-gradient'

import Color from "../utilities/colors"
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import {signin, getLoginReset, sendResetMail} from '../store/slices/authSlice'
import routes from '../navigation/routes'
import AppActivityIndicator from "../components/AppActivityIndicator";

import AppLabelLink from "../components/AppLabelLink";
import useAuth from "../hooks/useAuth";
import {getUserParrainageCompte} from "../store/slices/parrainageSlice";
import ResetInfoModal from "../components/user/ResetInfoModal";

const loginValidationSchema = yup.object().shape({
    username: yup.string().required("Veillez saisir un nom d'utilisateur"),
    password: yup.string().min(5, 'Le mot de passe doit contenir au moins 5 caratères').required('le mot de passe est requis')
})

function LoginScreen({navigation}) {
    const store = useStore()
    const dispatch = useDispatch();
    const {initUserDatas} = useAuth()

    const isLoading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)
    const [openResetModal, setOpenResetModal] = useState(false)
    const [resetValue, setResetValue] = useState('')
    const [showKeyboard, setShowKeyboad] = useState()
    const [isMailSent, setIsMailSent] = useState(false)

    const handleLogin = async (user) => {
        await dispatch(signin(user))
        const error = store.getState().auth.error
        const loggedInUser = store.getState().auth.user
        if(error !== null) return;
        dispatch(getUserParrainageCompte({userId: loggedInUser.id}))
        initUserDatas()
        navigation.navigate('AccueilNavigator', {screen: routes.ACCUEIL})
    }

    const handleSendResetMail = async () => {
        if(resetValue.length === 0) {
            return alert("veuillez entrer un email")
        }
        await dispatch(sendResetMail({email: resetValue}))
        setIsMailSent(true)
        const error = store.getState().auth.error
        if(error !== null) {
           return  ToastAndroid.showWithGravity('Une erreur est apparue', ToastAndroid.LONG, ToastAndroid.TOP)
        }
        setIsMailSent(true)
        ToastAndroid.showWithGravity('Un code vous été envoyé', ToastAndroid.LONG, ToastAndroid.TOP)

    }

    const keyboardIsShown = () => {
        setShowKeyboad(true)
    }

    const keyboardIsHide = () => {
        setShowKeyboad(false)
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardIsShown)
        Keyboard.addListener('keyboardDidHide', keyboardIsHide)
        return () => {
            dispatch(getLoginReset())
            Keyboard.removeListener('keyboardDidShow', keyboardIsShown)
            Keyboard.removeListener('keyboardDidHide', keyboardIsHide)
            setIsMailSent(false)
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
                        <View>
                        <TouchableWithoutFeedback onPress={() => setOpenResetModal(true)}>
                            <AppText style={{color: Color.bleuFbi}}>username/mot de passe oublié?</AppText>
                        </TouchableWithoutFeedback>
                        </View>
                        <AppSubmitButton  title='Connectez-vous'/>
                    </AppForm>
                     <View style={{
                         flexDirection: 'row',
                         justifyContent: 'center',
                         marginTop: 20
                     }}>
                         <AppText style={{color:Color.dark}}>Vous n'avez pas de compte?</AppText>
                         <AppLabelLink content='créez un' otherTextStyle={{color: Color.bleuFbi}}
                                       handleLink={() => navigation.navigate('AccueilNavigator', {screen: routes.REGISTER})}/>
                     </View>
            </ScrollView>
             </LinearGradient>
            <ResetInfoModal goToResetSreen={() => {
                setOpenResetModal(false)
                navigation.navigate(routes.INIT_INFO, resetValue)
                setResetValue('')
            }} mailSent={isMailSent} closeResetModal={() => setOpenResetModal(false)} isKeyboadShown={showKeyboard} resetModalVisible={openResetModal} resetValue={resetValue}
                            onChangeResetValue={(val) => setResetValue(val)} sendResetMail={handleSendResetMail}/>
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