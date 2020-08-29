import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import AppText from "../AppText";

function PlanListItem({prop1, prop2, prop3, onPress, showIcon}) {
    return (
        <TouchableOpacity onPress={onPress}>
         <View style={styles.container}>
             {showIcon && <AntDesign name="check" size={24} color="green" />}
             <View style={styles.idStyle}>
                <AppText>{prop1}</AppText>
            </View>
            <View style={styles.propStyle}>
                <AppText style={{fontWeight: 'bold'}}>{prop2}</AppText>
                <AppText lineNumber={1}>{prop3}</AppText>
            </View>
          </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '95%',
        margin: 10
    },
    idStyle: {
    },
    propStyle: {
        alignItems: 'flex-start',
        width: '90%',
        marginLeft: 10
    }
})

export default PlanListItem;