import React from 'react';
import {View, StyleSheet} from 'react-native'
import AppText from "../AppText";

function CartListHeader(props) {
    return (
        <View style={styles.header}>
            <AppText style={{fontWeight: 'bold',}}>Produit</AppText>
            <AppText style={{fontWeight: 'bold', marginLeft: 60}}>Prix</AppText>
            <AppText style={{fontWeight: 'bold'}} >Quantité</AppText>
            <AppText style={{fontWeight: 'bold'}}>Montant</AppText>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
})

export default CartListHeader;