import React from 'react';
import {View, StyleSheet} from 'react-native'
import AppText from "../AppText";
import Color from "../../utilities/colors";
import AppButton from "../AppButton";

function CartListFooter({totalAmount, getOrder}) {
    return (
        <View style={styles.container}>
            <View style={styles.totalAmount}>
                <AppText style={{fontSize: 24, fontWeight: 'bold'}}>Montant total: </AppText>
                <AppText style={{fontWeight: 'bold', color: Color.rougeBordeau, fontSize: 24}}>{totalAmount} FCFA</AppText>
            </View>
            <View style={styles.orderButton}>
                <AppButton style={{padding: 15}} onPress={getOrder}  title='Commander'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create( {
    totalAmount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 20,
        borderColor: Color.leger,
        borderWidth: 2,
        borderRadius: 10,
        width: '100%'
    },
    container: {
        alignItems: 'center'

    },
    orderButton: {
        width: '50%',
        marginTop: 30
    }
})

export default CartListFooter;