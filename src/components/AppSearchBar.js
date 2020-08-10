import React from 'react';
import {View, TextInput,TouchableOpacity, StyleSheet} from 'react-native'
import {EvilIcons} from '@expo/vector-icons'
import Color from '../utilities/colors'

function AppSearchBar({children, style, getInput, leaveInput}) {
    return (
        <TouchableOpacity>
        <View style={[styles.searchContainer, style]}>
            <TextInput style={styles.inputStyle} autoFocus={true} onBlur={leaveInput} placeholder='chercher ici...'/>
            <EvilIcons name='search' size={24} style={styles.iconStyle}/>
            {children}
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    searchContainer:
        {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            color: Color.blanc

        },
    inputStyle:{
        width:'90%',
        paddingBottom: 5,
        borderBottomWidth: 1,
        color:Color.blanc,
        borderColor: Color.blanc
    },
    iconStyle:{
        color:Color.blanc
    }
})

export default AppSearchBar;