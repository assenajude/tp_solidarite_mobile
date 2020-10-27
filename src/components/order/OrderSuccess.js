import React from 'react';
import {View, StyleSheet} from "react-native";
import AppText from "../AppText";
import Color from "../../utilities/colors";
import AppButton from "../AppButton";

function OrderSuccess({message, newOrderNum,labelNumNewOrder, goToAccueil, sectionTitle, goToOrderSection}) {
    return (
        <View style={styles.container}>
            <View>
                <AppText style={{fontSize: 30, fontWeight: 'bold', color: 'green'}}>Felicitation!!!</AppText>
                <AppText style={{fontSize: 20}}>Votre commande a été enregistrée...</AppText>
            </View>
            <View style={styles.content}>
                <View style={{
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <View style={styles.commande}>
                    <AppText style={{fontSize: 20}}>{labelNumNewOrder} </AppText>
                    <AppText style={{color: Color.or, fontSize: 20, fontWeight: 'bold'}}>{newOrderNum}</AppText>
                    </View>
                    <View>
                        <AppText>{message}</AppText>
                    </View>
                </View>

            </View>
            <View>
                <View style={styles.buttonStyle}>
                    <AppButton style={{padding: 5, width: '30%'}} title='Accueil' onPress={goToAccueil}/>
                    <AppButton style={{padding: 5, width: '30%'}} title={sectionTitle} onPress={goToOrderSection}/>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around'
    },

    commande: {
        flexDirection: 'row',
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default OrderSuccess;