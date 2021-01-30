import React from 'react';
import {View,ScrollView, Image, StyleSheet} from "react-native";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import colors from "../utilities/colors";
import { useSelector} from "react-redux";
import useAuth from "../hooks/useAuth";

function ServiceDetailScreen({route}) {
    const {userRoleAdmin} = useAuth()
    const service = useSelector(state => {
        const list = state.entities.service.list
        const currentService = list.find(item => item.id === route.params.id)
        return currentService
    })

    return (
        <>
        <ScrollView>
               {userRoleAdmin() && <View style={{alignSelf: 'flex-end', margin: 20}}>
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
           {service.isDispo === false && <View style={styles.notDispo}>
                <AppText style={{color: colors.rougeBordeau}}>Ce service n'est plus disponible</AppText>
            </View>}
            </>
    );
}

const styles = StyleSheet.create({
    notDispo: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
        backgroundColor: colors.blanc
    }
})

export default ServiceDetailScreen;