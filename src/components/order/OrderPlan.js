import React from 'react';
import {View, StyleSheet} from "react-native";
import AppText from "../AppText";
import AppButton from "../AppButton";

function OrderPlan({libelle, description, changePlan}) {
    return (
        <View style={styles.planMainContainer}>
            <View style={styles.planContainer}>
            <AppText style={{fontWeight: 'bold'}}>Plan:</AppText>
            <View style={styles.planContent}>
                <AppText style={{marginLeft: 20, padding: 5}}>{libelle}</AppText>
                <AppButton style={{backgroundColor: 'green', width: 60,height: 20, marginLeft: 10}} textStyle={{fontSize: 13}} title='changer' onPress={changePlan}/>
            </View>
            </View>
            <View>
               <AppText lineNumber={1} style={{marginLeft: 60, padding: 5}}>{description}</AppText>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    planContainer: {
        flexDirection: 'row',
    },
    planContent: {
      flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    planMainContainer: {
        alignItems: 'flex-start',
        marginLeft:10
    }

})
export default OrderPlan;