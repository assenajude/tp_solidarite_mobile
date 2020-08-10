import React from 'react';
import {View, Image, StyleSheet, Text, TouchableHighlight} from "react-native";

import AppText from "./AppText";
import AppButton from "./AppButton";
import Color from '../utilities/colors'

function AppCard({image, title, subtitle,dispo, onPress, aideInfo, button1, button2, children, addToCart}) {
    return (
        <TouchableHighlight onPress={onPress}>
        <View  style={styles.mainContainer} >
            {image && <Image resizeMode='contain' style={styles.imageStyle} source={image} />}
              <View>
                <View style={styles.infoContainer}>
                    <AppText style={{color: Color.or}}>{'Dispo: ' + dispo}</AppText>
                    <AppText style={{fontSize: 15, fontWeight: 'bold', marginRight: 50}}>{title}</AppText>
                    <AppText>{aideInfo}</AppText>
                </View>
                <View style={styles.detailsStyle}>
                    <Text style={{color: Color.rougeBordeau, fontWeight: 'bold'}}>{subtitle}</Text>
                    <Text style={{textDecorationLine: 'line-through', fontSize: 12}}>{subtitle}</Text>
                </View>
              </View>
            <View style={styles.buttonContainerStyle}>
                {children}
                <AppButton onPress={addToCart} title={button2} style={{padding: 10, backgroundColor: Color.rougeBordeau, fontWeight: 'bold'}} />
            </View>
        </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        shadowColor: Color.leger,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation:5,
        borderRadius: 10,
        backgroundColor: Color.blanc,
        overflow: 'hidden',
        height: 350,
        margin:15,
        paddingBottom: 15
    },
    buttonContainerStyle: {
      flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingRight: 10,
        paddingLeft: 10
    },
    imageStyle: {
        width: '100%',
        height: '70%',
        overflow: 'hidden'
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    detailsStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AppCard;