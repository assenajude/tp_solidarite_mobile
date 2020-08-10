import React from 'react';
import {View, StyleSheet} from "react-native";

import Color from '../../utilities/colors'
import AppText from "../AppText";
import AppButton from "../AppButton";


function OrderListBottom({globalOrder}) {
    return (

            <View style={styles.container}>
                <View style={styles.montant}>
                    <AppText style={{fontSize: 18, fontWeight: 'bold'}}>Total à payer:</AppText>
                    <AppText style={{color: Color.rougeBordeau, fontSize: 18, fontWeight: 'bold'}}>{globalOrder} FCFA</AppText>
                </View>

                <View style={styles.button}>
                    <AppButton style={{padding: 10, backgroundColor:Color.rougeBordeau}} title='Finaliser la commande'/>
                </View>
            </View>
    );
}


const styles = StyleSheet.create({
    montant: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        padding: 20,
        borderRadius: 10,
        width: '90%',
        shadowColor: Color.leger,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        borderColor:Color.blanc,
        elevation:5,
    },
    button: {
        width: '50%',
        margin: 10,
        padding: 10
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrderListBottom;