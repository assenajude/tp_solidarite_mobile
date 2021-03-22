import React from 'react';
import {View, StyleSheet} from "react-native";
import * as Progress from 'react-native-progress'
import ParrainageHeader from "./ParrainageHeader";
import AppText from "../AppText";

function ParrainageEncoursItem({ownerUserAvatar, avatarUrl, ownerEmail, ownerUsername, orderTotal, parrainAction, actionProgress}) {
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
            <Progress.Bar progress={0.5} style={{width: 200}}/>
            </View>
            <ParrainageHeader ownerUserAvatar={ownerUserAvatar} avatarUrl={avatarUrl} ownerEmail={ownerEmail} ownerUsername={ownerUsername}/>
            <View>
                <AppText>{orderTotal}</AppText>
                <AppText>{parrainAction}</AppText>
                <AppText>{actionProgress}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
})
export default ParrainageEncoursItem;