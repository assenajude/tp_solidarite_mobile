import React from 'react';
import  {View, Image, StyleSheet} from "react-native";
import AppText from "../AppText";
import colors from "../../utilities/colors";

function OrderItemDetails({imageSource, libelle, quantite, montant}) {
    return (
        <View style={styles.container}>
            <AppText>{quantite}</AppText>
            <View style={styles.imagesContainer}>
                <Image source={imageSource} style={styles.imageStyle}/>
                <AppText>{libelle}</AppText>
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
                <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>{montant}</AppText>
                <AppText>fcfa</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-between',
        backgroundColor: colors.blanc
    },
    imagesContainer: {
        alignItems: 'center'
    },
    imageStyle: {
        height: 50,
        width: 50
    }
})

export default OrderItemDetails;