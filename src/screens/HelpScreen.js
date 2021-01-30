import React from 'react';
import {ScrollView,Image, View, StyleSheet, TouchableOpacity} from 'react-native'
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

function HelpScreen({navigation}) {
    return (
        <ScrollView>

            <Image source={require('../assets/help.jpg')} style={{
                width: '100%',
                height: 300
            }}/>
            <View style={{padding: 10}}>
            <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>Avez-vous besoin d'aide?</AppText>
            <AppText style={{fontWeight: 'bold'}}>Contactez nous ici</AppText>
            <View style={{marginTop: 40}}>
                <View style={styles.phoneContact}>
                    <View style={{left: 20, flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                    <FontAwesome5 name="whatsapp-square" size={40} color="green" />
                    <AntDesign name="phone" size={30} color="black" />
                    </View>
                    <AppText style={{marginLeft: '20%', fontSize: 18, fontWeight: 'bold'}}>+225 0708525827</AppText>
                </View>
                <View style={styles.messengerContact}>
                    <View style={{left: 20, flexDirection: 'row'}}>
                    <AntDesign name="facebook-square" size={40} color="blue" />
                    <FontAwesome5 name="facebook-messenger" size={40} color="blue" />
                    </View>
                    <AppText style={{marginLeft: '20%', fontWeight: 'bold', fontSize: 18}}>Tout-Promo</AppText>
                </View>
                <View style={styles.faq}>
                <AppText>Consulter la</AppText>
                <TouchableOpacity onPress={() => navigation.navigate('AccueilNavigator', {screen: 'FaqScreen'}) }>
                    <AppText style={{color: colors.bleuFbi}}>FAQ</AppText>
                </TouchableOpacity>
                    <AppText>ou</AppText>
                    <TouchableOpacity onPress={() => navigation.navigate('AccueilNavigator', {screen: 'QuestionScreen'}) }>
                        <AppText style={{color: colors.bleuFbi}}>poser une question</AppText>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    phoneContact: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messengerContact: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    faq: {
        marginTop: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HelpScreen;