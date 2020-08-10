import React from 'react';
import {View,StyleSheet} from 'react-native'
import AppText from "../AppText";

import Color from '../../utilities/colors'
import AppButton from "../AppButton";

function OrderItem({libellePlan='CREDIT',valueSubtitle, cout,coutValue, headerTitle, subtitle,buttonTitle,planLength,changeTitle, children}) {
    return (
        <View style={styles.container}>
            <View style={styles.headerTitle} >
            <AppText style={{fontSize: 20, color: Color.or, fontWeight: 'bold'}}>{headerTitle}</AppText>
            </View>
            <View style={styles.itemContainer}>
             <View style={styles.subtitle}>
                 <AppText style={{fontSize: 15, fontWeight: 'bold'}}>{subtitle}: </AppText>
                 <AppText>{valueSubtitle}</AppText>
             </View>

            <View style={styles.sousTotal}>
                <AppText style={{fontWeight: 'bold', fontSize: 15}}>{cout}: </AppText>
                <AppText style={{fontSize: 15, fontWeight: 'bold', color:Color.rougeBordeau }}>{coutValue} FCFA</AppText>
            </View>
            </View>
            {children}
            <View style={styles.buttons}>
            <AppButton style={styles.buttonStyle} title={buttonTitle}/>
            {planLength && libellePlan && <AppButton style={{padding: 10, marginTop: 17, marginLeft: 10}} title={changeTitle}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        height: 'auto',
        paddingBottom: 20,
        marginBottom: 20,
        shadowColor: Color.leger,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        borderColor:Color.blanc,
        elevation:5,

    },
    buttons: {
      flexDirection: 'row',
        alignItems: 'center'
    },
    subtitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8
    },
    buttonStyle: {
        width: '30%',
        marginLeft: 20,
        marginTop: 20,
        padding: 10
    },
    sousTotal: {
        flexDirection: 'row'
    },
    headerTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5
    }
})
export default OrderItem;