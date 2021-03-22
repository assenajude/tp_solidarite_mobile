import React from 'react';
import {View, StyleSheet} from "react-native";
import Avatar from "../user/Avatar";
import AppText from "../AppText";

function ParrainageHeader({ownerUserAvatar,avatarUrl, ownerUsername, ownerEmail}) {
    return (
        <View>
            <View style={styles.headerContainer}>
                <Avatar ownerUserAvatar={ownerUserAvatar} avatarUrl={avatarUrl}/>
                <View style={{alignItems: 'flex-start'}}>
                    <AppText>{ownerUsername}</AppText>
                    <AppText>{ownerEmail}</AppText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default ParrainageHeader;