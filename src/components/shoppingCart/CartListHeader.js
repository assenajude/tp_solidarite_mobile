import React from 'react';
import {View, StyleSheet} from 'react-native'
import AppText from "../AppText";

function CartListHeader({prix, quantite, montant, min, max}) {
    return (
        <View style={styles.header}>
            <AppText style={{fontWeight: 'bold',}}>Produit</AppText>
           {prix && <AppText style={{fontWeight: 'bold', marginLeft: 60}}>Prix</AppText>}
            { quantite && <AppText style={{fontWeight: 'bold'}} >Quantité</AppText>}
           {montant && <AppText style={{fontWeight: 'bold'}}>Montant</AppText>}
            {min && <AppText style={{fontWeight: 'bold'}}>Montant minimum</AppText>}
            {max && <AppText style={{fontWeight: 'bold'}}>Montant maximum</AppText>}
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