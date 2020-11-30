import React, {useEffect} from 'react';
import {View,ScrollView, Image} from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import {getRoleAdmin} from "../store/selectors/authSelector";
import colors from "../utilities/colors";
import {color} from "react-native-reanimated";
import {useDispatch, useStore} from "react-redux";

function ServiceDetailScreen({route, navigation}) {
    const store = useStore()
    const dispatch = useDispatch()

    const service = route.params

    useEffect(() => {
    }, [])

    return (
        <ScrollView>
               {getRoleAdmin(store.getState()) && <View style={{alignSelf: 'flex-end', margin: 20}}>
                    <AppButton title='edit' iconColor={colors.blanc} iconSize={15} iconName='edit'/>
                    <AppButton style={{marginTop: 10, marginBottom: 10}} title='add option' iconSize={15} iconColor={colors.blanc} iconName='plus'/>
                    <AppButton title='delete' iconColor={colors.blanc} iconSize={15} iconName='delete'/>
                </View>}
                <View>
                <Image source={{uri: service.imagesService[0]}} style={{width: '100%', height: 200}}/>
               <View style={{marginTop: 5}}>
                   <AppText style={{fontWeight: 'bold'}}>{service.libelle}</AppText>
               </View>
                </View>
                <View>
                    <View style={{alignSelf: 'flex-end',margin: 10}}>
                        <AppButton title='Utiliser'/>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <AppText style={{fontWeight: 'bold'}}>Montant minimum autorisé: </AppText>
                        <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{service.montantMin}</AppText>
                        <AppText> fcfa</AppText>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <AppText style={{fontWeight: 'bold'}}>Montant maximum autorisé: </AppText>
                        <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{service.montantMax}</AppText>
                        <AppText> fcfa</AppText>
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <AppText style={{fontWeight: 'bold'}}>Description: </AppText>
                        <AppText>{service.description}</AppText>
                    </View>
                </View>
        </ScrollView>
    );
}

export default ServiceDetailScreen;