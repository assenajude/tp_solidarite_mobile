import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import { Entypo } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppText from "../AppText";

function ResponseItem({respHeader, respContent, respIsRead,getRespRead, startReadingResponse, renderRespRightActions,
                          onRespSwipeableOpen, onRespSwipeableClose}) {
    return (
        <Swipeable renderRightActions={renderRespRightActions} onSwipeableOpen={onRespSwipeableOpen} onSwipeableClose={onRespSwipeableClose}>
        <View style={styles.container}>
            {!getRespRead && <View>
                <TouchableOpacity onPress={startReadingResponse}>
                    <View style={{flexDirection: 'row'}}>
                    <AppText style={{fontWeight:respIsRead?'normal': 'bold'}}>{respHeader}</AppText>
                    <Entypo name="chevron-small-down" size={24} color="black" />
                    </View>
                </TouchableOpacity>

            </View>}
           {getRespRead && <View>
               <TouchableOpacity onPress={startReadingResponse}>
                   <View style={{flexDirection: 'row'}}>
                       <AppText style={{fontWeight: 'normal'}}>{respHeader}</AppText>
                       <Entypo name="chevron-small-up" size={24} color="black" />
                   </View>
               </TouchableOpacity>
            <AppText>{respContent}</AppText>
            </View>}
        </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
     padding: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems:'center'
    }
})

export default ResponseItem;