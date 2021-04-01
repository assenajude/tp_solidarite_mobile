import React from 'react';
import {View,StyleSheet} from "react-native";
import AppText from "../AppText";
import colors from "../../utilities/colors";
import AppButton from "../AppButton";
import useAuth from "../../hooks/useAuth";

function FinalOrderItem({header,label1,label1Value,changeLabel3, label2, label2Value, label3,label3Value,label4,label4Value,
                            detailsInfo, getOrderItemDetails, children}) {

    const {formatPrice} = useAuth()
    return (
        <View style={styles.livraisonContainer}>
            <View style={styles.header}>
            <AppText style={{color: colors.or, fontWeight: 'bold', fontSize: 20 }}>{header}</AppText>
            </View>
            <View style={styles.coutSection}>
                <View style={styles.cout}>
                    <AppText style={{fontWeight: 'bold', fontSize: 15}}>{label2}</AppText>
                    <AppText style={{fontWeight: 'bold', fontSize: 15, color: colors.rougeBordeau}}>{formatPrice(label2Value)}</AppText>
                </View>
                <View style={styles.agence}>
                <AppText style={{fontWeight: 'bold', fontSize: 15}}>{label1}</AppText>
                <AppText>{label1Value}</AppText>
                </View>

            </View>
            <View>
           {label3Value && <View style={styles.label3}>
                    <AppText style={{fontWeight: 'bold', fontSize: 15}}>{label3}</AppText>
                    <AppText>{label3Value}</AppText>
                    <AppButton title='changer' onPress={changeLabel3} style={styles.changeButton}/>
                </View>}
            {label4Value &&   <View style={styles.label4}>
                    <AppText style={{fontWeight: 'bold', fontSize: 15}} lineNumber={1}>{label4}</AppText>
                    {!detailsInfo && <AppText lineNumber={1} style={{width: 'auto', padding: 5,paddingRight: 40}}>{label4Value}</AppText>}
                </View>}
            </View>
            {detailsInfo && <View>
                {children}
            </View>}
            <AppButton iconName={detailsInfo ?'caretup':'caretdown'} iconColor={colors.blanc} style={{width: 'auto', alignSelf: 'flex-start'}} textStyle={{marginLeft: 5}} title={detailsInfo?'Fermer':'Deplier'} onPress={getOrderItemDetails}/>
        </View>
    );
}

const styles = StyleSheet.create({
    livraisonContainer: {
        height: 'auto',
        marginBottom: 10,
        padding: 10,
        borderTopWidth: 0.5
    },
    coutSection: {
        justifyContent: 'space-between'
    },
    contactSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    agence: {
        flexDirection: 'row'
    },
    cout: {
        flexDirection: 'row'
    },
    header: {
        alignSelf: 'flex-start'
    },
    label3: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label4: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '80%'
    },
    detailsButton: {
        width: 'auto',
        alignSelf: 'flex-start'
    },
    changeButton: {
        backgroundColor: 'green',
        height: 'auto',
        width: 'auto'
    }

})

export default FinalOrderItem;