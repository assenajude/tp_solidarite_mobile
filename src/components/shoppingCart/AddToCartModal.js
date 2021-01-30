import React from 'react';

import {Text, Modal, View, Image, StyleSheet} from 'react-native'
import AppButton from "../AppButton";
import AppText from "../AppText";
import Color from '../../utilities/colors'

function AddToCartModal({source, designation, itemModalVisible,goToHomeScreen,goToShoppingCart}) {
    return (

        <Modal transparent={true} animationType='slide' visible={itemModalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.headerStyle}>
                <AppText style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>Felicitaion!</AppText>
                </View>
                    <View style={styles.contentStyle}>
                      <View>
                        <Image resizeMode='contain' style={styles.imageStyle} source={source}/>
                        <View>
                        <AppText lineNumber={1} style={{fontWeight: 'bold'}}>{designation}</AppText>
                        </View>
                       </View>
                        <View style={styles.textStyle}>
                            <AppText style={{color: Color.or, fontWeight: 'bold'}}>a été ajouté au panier avec succès</AppText>
                        </View>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton style={{ fontSize: 15, padding: 5, width: '40%'}} title="J'achettes encors" onPress={goToHomeScreen}/>
                    <AppButton style={{fontSize: 15, padding: 5, width: '40%'}} title='je commande' onPress={goToShoppingCart}/>
                </View>
            </View>
        </Modal>

    );
}

const styles  = StyleSheet.create({
    modalContainer: {
        top: 100,
        padding: 10,
        paddingRight: 10,
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
        width: 60,
        height: 60
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textStyle : {
        position: 'absolute',
        left:60,
        bottom: 50
    }
})

export default AddToCartModal;