import React from 'react';
import {View} from "react-native";
import AppText from "../AppText";

function UserLocationItem({locationDescrip}) {
    return (
        <View>
            <AppText>{locationDescrip}</AppText>
        </View>
    );
}

export default UserLocationItem;