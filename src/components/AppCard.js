import React from 'react';
import {View, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity} from "react-native";

import AppText from "./AppText";
import AppButton from "./AppButton";
import Color from '../utilities/colors'
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";

function AppCard({image, title, subtitle1, subtitle2 ,dispo, onPress, isFavorite,
                     aideInfo, button2, children, addToCart, frequence, itemType,deleteItem,
                     toggleFavorite, serviceMin, serviceMax, otherImgaeStyle, notInStock, itemReductionPercent}) {

    const {userRoleAdmin, formatPrice} = useAuth()
    return (
        <>
        <View style={{
            alignSelf: 'center',
            padding: 10
        }}>
        <TouchableHighlight onPress={onPress}>
        <View  style={[styles.mainContainer, {height: itemType==='service'?360:380}]}>
            {itemType !== 'service' && itemReductionPercent>0 &&  <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: itemType==='service'?10:20
            }}>
                <AppText style={{color: Color.rougeBordeau, fontWeight: 'bold', fontSize: 20}}>-{itemReductionPercent}%</AppText>
                <View>
                    <TouchableOpacity onPress={toggleFavorite}>
                        {isFavorite && <MaterialCommunityIcons name='heart' size={30}/>}
                        {!isFavorite && <MaterialCommunityIcons name='heart-outline' size={30}/>}
                    </TouchableOpacity>
                </View>
            </View>}
          {itemType !== 'service' && itemReductionPercent <= 0 &&  <View style={{alignItems: 'flex-end', margin: 10}}>
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
                        justifyContent: 'space-between',
                        margin: 5
                    }}>
                    <AppText style={{color: Color.or}}>{'Dispo: ' + dispo}</AppText>
                    <AppText lineNumber={2} style={{fontSize: 15, fontWeight: 'bold', marginLeft: 20, width: '60%'}}>{title}</AppText>
                    </View>
                    {aideInfo && <MaterialCommunityIcons name="help-circle-outline" size={24} color={Color.bleuFbi}/>}
                </View>
                <View style={styles.detailsStyle}>
                    {itemType !== 'service' && <View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: Color.rougeBordeau, fontWeight: 'bold'}}>{formatPrice(subtitle1)}</Text>
                            {itemType == 'location' && <Text>{frequence}</Text> }
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{textDecorationLine: 'line-through', fontSize: 12}}>{formatPrice(subtitle2)}</Text>
                            {itemType == 'location' && <Text>{frequence}</Text> }
                        </View>
                    </View>}

                    {itemType === 'service' && <View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <AppText style={{fontSize: 15, fontWeight: 'bold'}}>Min: </AppText>
                        <AppText> {formatPrice(serviceMin)}</AppText>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <AppText style={{fontSize: 15, fontWeight: 'bold'}}>Max: </AppText>
                        <AppText>{formatPrice(serviceMax)}</AppText>
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
            {notInStock && <View style={styles.notInStock}>
                {itemType !== 'service' && <AppText style={{color: Color.rougeBordeau, fontWeight: 'bold'}}>Rupture de stock</AppText>}
                {itemType === 'service' && <AppText style={{color: Color.rougeBordeau, fontWeight: 'bold'}}>Service non disponible</AppText>}
            </View>}
            {userRoleAdmin() && notInStock && <View style={styles.deleteItem}>
                <AppButton title='supprimer' onPress={deleteItem}/>
            </View>}
            </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        shadowColor: Color.leger,
        shadowOpacity: 0.26,
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: Color.blanc,
        overflow: 'hidden',
        width: 320,
    },
    buttonContainerStyle: {
      flexDirection:'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 20
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
    },
    notInStock: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        opacity: 0.6,
        zIndex: 1,
        backgroundColor: Color.blanc
    },
    deleteItem: {
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: 20,
        zIndex: 2
    }
})

export default AppCard;