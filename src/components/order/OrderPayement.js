import React from 'react';
import {View, StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker'



import OrderItem from "./OrderItem";
import AppText from "../AppText";


function OrderPayement({payementHeader, planHeader,planDescrip, payementDetail,libellePlan,
                           payementSubtitle, payementSubtitleValue, payementCout,
                           payementCoutValue, changePayementSubtitleValue, planDataLength, changePlanTitle, payementData}) {
    return (
        <View>
            <OrderItem libellePlan={libellePlan}  headerTitle={payementHeader} buttonTitle={payementDetail} changeTitle={changePlanTitle} planLength={planDataLength}
                       subtitle={payementSubtitle} valueSubtitle={<Picker mode='dropdown' selectedValue={payementSubtitleValue} onValueChange={changePayementSubtitleValue} style={styles.picker}>
                {payementData.map((item, index) => <Picker.Item label={item.mode} value={item.id} key={index}/>)}
            </Picker> }
                       cout={payementCout} coutValue={payementCoutValue}>
            {payementSubtitleValue == 'credit' && <View style={styles.planContainer}>
                <View style={styles.planHeader}>
                <AppText style={{fontWeight: 'bold'}}>Plan: </AppText>
                <AppText style={{marginLeft: 20, fontWeight: 'bold'}}>{planHeader}</AppText>
                </View>
                <View style={styles.planInfo}>
                    <AppText lineNumber={2}>{planDescrip}</AppText>
                </View>
            </View>}
            </OrderItem>

            <View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: 120
    },
    planContainer: {
        flexDirection: 'column'
    },
    planHeader: {
        flexDirection:'row',
        marginLeft: 5,
        paddingLeft: 5

    },
    planInfo: {
        width: '50%',
        marginLeft: '20%'
    }
})
export default OrderPayement;