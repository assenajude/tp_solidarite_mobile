import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, ScrollView, StyleSheet,Text,  FlatList, TouchableOpacity, TouchableHighlight, Alert} from 'react-native'
import * as Yup from 'yup'
import decode from 'jwt-decode'


import AppText from "../components/AppText";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppInput from "../components/AppInput";
import color from '../utilities/colors'
import AppSubmitButton from "../components/forms/AppSubmitButton";
import {selectedVilleRelais} from "../store/slices/villeSlice";
import {getSelectedRelais} from "../store/slices/pointRelaisSlice";
import {getAdresse, saveAdresse} from '../store/slices/userAdresseSlice';
import authStorage from '../store/persistStorage'
import routes from "../navigation/routes";


const adressValidSchema = Yup.object().shape({
    nom: Yup.string(),
    tel: Yup.string(),
    email: Yup.string(),
    adresse: Yup.string()
})

function NewUserAdresseScreen({navigation}) {
    const dispatch = useDispatch()

    const villes = useSelector(state => state.entities.ville.list)
    const pointRelais = useSelector(state => state.entities.ville.villeRelais);
    const [showVille, setShowVille] = useState(false)
    const [selectedVille, setSelectedVille] = useState('');
    const [selectedRelais, setSelectedRelais] = useState('');
    const [showRelais, setShowRelais] = useState(false);
    const [newRelais, setNewRelais] = useState({})


    const getUser = async () => {
        const user = await authStorage.getUser();
        if (!user) {
            Alert.alert('Info', 'veillez vous connecter pour ajouter vos addresses', [
                {text: 'annuler', onPress: () => navigation.goBack()},
                {text: 'ok', onPress: () => navigation.navigate(routes.LOGIN)}
            ], {cancelable: false})
        }
        return user;
    }

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
        const user = await authStorage.getUser()
        const adressData = {
            idUser: user.id,
            relaisId: newRelais.id,
            nom: userAdresse.nom,
            tel: userAdresse.tel,
            email: userAdresse.email,
            adresse: userAdresse.adresse
        }
        dispatch(saveAdresse(adressData))
    }

    useEffect(() => {
        getUser()
        filteredVilles(selectedVille);
        filteredRelais(selectedRelais)
    }, [setSelectedVille, setSelectedRelais, pointRelais, setNewRelais])

    return (
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

                          {filteredRelais(selectedRelais).map((item, index) =>
                              <TouchableHighlight key={index} underlayColor={color.or} onPress={() => {
                                  setSelectedRelais(item.nom);
                                  setShowRelais(false);
                                  setNewRelais(item)
                                  console.log(newRelais);
                              }}>
                              <AppText >{item.nom}</AppText>
                              </TouchableHighlight>
                          )}
                  </ScrollView>}
                    </View>
                </View>
            </View>
            <View style={styles.infoPerso}>
                <AppText style={{backgroundColor: color.rougeBordeau, color: color.blanc}}>Infos perso</AppText>
                    <AppForm initialValues={{
                        nom: '',
                        tel: '',
                        email: '',
                        adresse: ''
                    }} validationSchema={adressValidSchema} onSubmit={handleSaveAdress}>
                        <AppFormField title='Nom' name='nom'/>
                        <AppFormField title='Phone' name='tel'/>
                        <AppFormField title='E-mail' name='email'/>
                        <AppFormField title='Autres Adresse' name='adresse'/>
                        <AppSubmitButton title='Ajouter'/>
                    </AppForm>

            </View>

        </View>
        </ScrollView>

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