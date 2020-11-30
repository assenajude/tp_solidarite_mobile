import React from 'react';
import {View, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity} from "react-native";

import AppText from "./AppText";
import AppButton from "./AppButton";
import Color from '../utilities/colors'
import {MaterialCommunityIcons} from "@expo/vector-icons";

function AppCard({image, title, subtitle1, subtitle2 ,dispo, onPress, isFavorite,
                     aideInfo, button2, children, addToCart, frequence, itemType,
                     toggleFavorite, serviceMin, serviceMax, otherImgaeStyle}) {
    return (
        <View style={{
            alignSelf: 'center',
            padding: 10,
            margin: 20
        }}>
        <TouchableHighlight onPress={onPress}>
        <View  style={styles.mainContainer}>
            {itemType !== 'e-service' && <View style={{
                alignSelf: 'flex-end',
            }}>
                <TouchableOpacity onPress={toggleFavorite}>
                {isFavorite && <MaterialCommunityIcons name='heart' size={30}/>}
                {!isFavorite && <MaterialCommunityIcons name='heart-outline' size={30}/>}
                </TouchableOpacity>
            </View>}
            {image && <Image resizeMode='contain' style={[styles.imageStyle, otherImgaeStyle]} source={image}/>}
              <View>
                <View style={styles.infoContainer}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <AppText style={{color: Color.or}}>{'Dispo: ' + dispo}</AppText>
                    <AppText style={{fontSize: 15, fontWeight: 'bold', marginLeft: 20}}>{title}</AppText>
                    </View>
                    {aideInfo && <MaterialCommunityIcons name="help-circle-outline" size={24} color={Color.bleuFbi}/>}
                </View>
                <View style={styles.detailsStyle}>
                    {itemType !== 'e-service' && <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: Color.rougeBordeau, fontWeight: 'bold'}}>{subtitle1}</Text>
                            {itemType == 'e-location' && <Text>{frequence}</Text> }
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{textDecorationLine: 'line-through', fontSize: 12}}>{subtitle2}</Text>
                            {itemType == 'e-location' && <Text>{frequence}</Text> }
                        </View>
                    </View>}

                    {itemType === 'e-service' && <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <AppText style={{fontSize: 15, fontWeight: 'bold'}}>Min: </AppText>
                        <AppText> {serviceMin} fcfa</AppText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <AppText style={{fontSize: 15, fontWeight: 'bold'}}>Max: </AppText>
                        <AppText>{serviceMax} fcfa</AppText>
                        </View>
                    </View>}
                </View>
              </View>
            <View style={styles.buttonContainerStyle}>
                {children}
                <AppButton onPress={addToCart} title={button2} textStyle={{fontSize: 10}} style={{width: '20%',padding:5, backgroundColor: Color.rougeBordeau,fontWeight: 'bold'}} />
            </View>
        </View>
        </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        shadowColor: Color.leger,
        shadowOpacity: 0.26,
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: Color.blanc,
        overflow: 'hidden',
        height: 350,
        width: 320,
        paddingBottom: 20
    },
    buttonContainerStyle: {
      flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingRight: 10,
        paddingLeft: 10
    },
    imageStyle: {
        width: '100%',
        height: 220,
        overflow: 'hidden',
        alignSelf: 'center'
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