import React from 'react';
import {TouchableOpacity, StyleSheet} from "react-native";
import {EvilIcons} from '@expo/vector-icons';
import colors from "../utilities/colors";

function AppAddNewButton(props) {
    return (
        <TouchableOpacity >
            <EvilIcons style={styles.iconStyle} name='plus' size={24} color='white'/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconStyle: {
        marginLeft: 30,
        backgroundColor: colors.info,
        borderRadius: 40

    }
})
export default AppAddNewButton;