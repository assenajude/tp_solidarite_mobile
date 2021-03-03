import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector, useStore} from "react-redux";
import {View, ScrollView, StyleSheet,TouchableHighlight} from 'react-native'
import * as Yup from 'yup'


import AppText from "../components/AppText";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppInput from "../components/AppInput";
import color from '../utilities/colors'
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {selectedVilleRelais} from "../store/slices/villeSlice";
import {
    getCurrentAdresseReset,
    getUpdateAdresse,
    saveAdresse
} from '../store/slices/userAdresseSlice';
import AppErrorMessage from "../components/forms/AppErrorMessage";
import AppActivityIndicator from "../components/AppActivityIndicator";


const adressValidSchema = Yup.object().shape({
    nom: Yup.string(),
    tel: Yup.string(),
    email: Yup.string(),
    adresse: Yup.string()
})

function NewUserAdresseScreen({navigation, route}) {
    const dispatch = useDispatch()
    const store = useStore()
    const [mode, setMode] = useState(route.params.mode)
    const currentAdresse = useSelector(state => state.entities.userAdresse.currentAdresse)
    const listRelais = useSelector(state => state.entities.pointRelais.list)
    const [editRelais, setEditRelais] = useState(Object.keys(currentAdresse).length>0?listRelais.find(item => item.id === currentAdresse.PointRelaiId):{})
    const user = useSelector(state => state.auth.user)
    const villes = useSelector(state => state.entities.ville.list)
    const pointRelais = useSelector(state => state.entities.ville.villeRelais);
    const [showVille, setShowVille] = useState(false)
    const [selectedVille, setSelectedVille] = useState(Object.keys(editRelais).length>0?editRelais.Ville.nom:'');
    const [selectedRelais, setSelectedRelais] = useState(Object.keys(editRelais).length>0?editRelais.nom:'');
    const [showRelais, setShowRelais] = useState(false);
    const [newRelais, setNewRelais] = useState({})
    const error = useSelector(state => state.entities.userAdresse.error)
    const isLoading = useSelector(state => state.entities.userAdresse.loading)
    const [errorMessage, setErrorMessage] = useState('')



    const [tabVilles, setTabVilles] = useState(() => {
        const newTabVille = []
        villes.forEach(ville => {
            newTabVille.push(ville.nom)
        })
        return newTabVille
    })


    const filteredVilles = (val) => tabVilles.filter((ville) => ville.includes(val))
    const filteredRelais = (val) => pointRelais.filter((relais) => relais.nom.includes(val))

    const handleSaveAdress = async (userAdresse) => {
        if(mode === "addNew") {
        const adressData = {
            idUser: user.id,
            relaisId: newRelais.id,
            nom: userAdresse.nom,
            tel: userAdresse.tel,
            email: userAdresse.email,
            adresse: userAdresse.adresse
        }
        await dispatch(saveAdresse(adressData))
        } else {
            const currentRelais = listRelais.find(item => item.nom === selectedRelais)
            const data = {...userAdresse, id:currentAdresse.id, relaisId: currentRelais.id}
            await dispatch(getUpdateAdresse(data))
        }
        const error = store.getState().entities.userAdresse.error
        if(error !== null) {
            if(mode === 'addNew') {
                setErrorMessage("Impossible d'ajouter l'adresse, veuillez reessayer plutard")
            } else setErrorMessage('Impossible de modifier votre adresse, Veuillez reessayer plutard')
            return;
        }
        navigation.goBack()
    }

    useEffect(() => {
        filteredVilles(selectedVille);
        filteredRelais(selectedRelais)
        return () => {
            dispatch(getCurrentAdresseReset())
        }
    }, [])

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
        <ScrollView>
        <View>
            <View>
                <View style={styles.container}>
                <View style={styles.region}>
                    <AppText>Ville: </AppText>

                     <AppInput value={selectedVille} onChangeText={(val) => {
                         setSelectedVille(val)
                        filteredVilles(val)
                     } }
                     onFocus={() => {
                         setShowVille(true)
                     }}/>
                </View>
                   {showVille && <View>
                       <ScrollView style={styles.villeList}>
                           <View style={{
                               height: 100,
                               width: 200
                           }}>
                       {filteredVilles(selectedVille).map((ville, index) =>
                           <TouchableHighlight underlayColor={color.or} key={index} onPress={() => {
                           setSelectedVille(ville)
                               dispatch(selectedVilleRelais(ville))
                               setShowVille(false);
                           setSelectedRelais('')
                               setNewRelais({})
                       }}>
                           <View style={styles.regionList}>
                               <AppText>{ville}</AppText>
                           </View>
                           </TouchableHighlight>
                       )}
                           </View>
                       </ScrollView>
                    </View>}
                </View>

                <View >
                    <View style={styles.relais}>
                        <AppText>Relais: </AppText>
                        <AppInput value={selectedRelais} onChangeText={(val) => {
                            filteredRelais(val)
                            setSelectedRelais(val)
                        }} onFocus={() => {
                            setShowRelais(true)
                        }}/>
                    </View>
                    <View>
                  { showRelais && <ScrollView style={styles.relaisList}>
                                <View style={{
                                    height: 100,
                                    width: 200
                                }}>
                          {filteredRelais(selectedRelais).map((item, index) =>
                              <TouchableHighlight key={index} underlayColor={color.or} onPress={() => {
                                  setSelectedRelais(item.nom);
                                  setShowRelais(false);
                                  setNewRelais(item)
                              }}>
                              <AppText >{item.nom}</AppText>
                              </TouchableHighlight>
                          )}
                                </View>
                  </ScrollView>}
                    </View>
                </View>
            </View>
            <View style={styles.infoPerso}>
                <AppText style={{backgroundColor: color.rougeBordeau, color: color.blanc}}>Infos perso</AppText>
                <AppErrorMessage error={errorMessage} visible={error}/>
                    <AppForm initialValues={{
                        nom: currentAdresse.nom,
                        tel: currentAdresse.tel,
                        email: currentAdresse.email,
                        adresse: currentAdresse.adresse
                    }} validationSchema={adressValidSchema} onSubmit={handleSaveAdress}>
                        <AppFormField title='Nom' name='nom'/>
                        <AppFormField title='Phone' name='tel'/>
                        <AppFormField title='E-mail' name='email' keyboardType='email-address'/>
                        <AppFormField title='Autres Adresse' name='adresse'/>
                        <AppSubmitButton title='Ajouter'/>
                    </AppForm>

            </View>

        </View>
        </ScrollView>
            </>

    );
}


const styles = StyleSheet.create({
    container: {
      padding: 5
    },
    region: {
        flexDirection: 'row'
    },
    ville: {
        flexDirection: 'row'
    },
    relaisList: {
        width: 'auto',
        alignSelf: 'center'
    },
    relais: {
        flexDirection: 'row'
    },
    villeList: {
        width: 'auto',
        alignSelf: 'center'
    },
    regionList: {
        padding: 5,
    },
    infoPerso: {
        borderWidth: 1,
        marginTop: 20
    }
})
export default NewUserAdresseScreen;