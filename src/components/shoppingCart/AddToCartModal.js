import React from 'react';

import {Text, Modal, View, Image, StyleSheet} from 'react-native'
import AppButton from "../AppButton";
import AppText from "../AppText";
import Color from '../../utilities/colors'

function AddToCartModal({source, designation, itemModalVisible, addItemToCart,goToHomeScreen,goToShoppingCart}) {
    return (

        <Modal transparent={true} animationType='slide' visible={itemModalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.headerStyle}>
                <AppText style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>Felicitaion!</AppText>
                </View>
                    <View style={styles.contentStyle}>
                    <AppText style={{color: Color.or,fontWeight: 'bold' }}>Ce produit</AppText>
                    <View>
                        <Image resizeMode='contain' style={styles.imageStyle} source={source}/>
                        <AppText style={{fontWeight: 'bold'}}>{designation}</AppText>
                    </View>
                <AppText style={{color: Color.or, fontWeight: 'bold'}}>a été ajouté au panier avec succès</AppText>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton style={{padding: 10}} title='Poursuivre mes achats' onPress={goToHomeScreen}/>
                    <AppButton style={{padding: 10}} title='Commander maintenant' onPress={goToShoppingCart}/>
                </View>
            </View>
        </Modal>

    );
}

const styles  = StyleSheet.create({
    modalContainer: {
        top: 100,
        padding: 10,
        height: 'auto',
        width: '100%',
        borderWidth: 2,
        borderColor: Color.leger,
        borderRadius: 20
    },
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 30
    },
    contentStyle: {
        flexDirection: 'row',
        marginBottom: 20
    },
    imageStyle: {
        width: 80,
        height: 80
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default AddToCartModal;