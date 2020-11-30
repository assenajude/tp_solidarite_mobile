import React from 'react';
import {View, TextInput,TouchableOpacity, StyleSheet} from 'react-native'
import {EvilIcons} from '@expo/vector-icons'
import Color from '../utilities/colors'

function AppSearchBar({style, leaveInput, changeSearchValue, searchValue}) {
    return (

        <View style={[styles.searchContainer, style]}>
            <TextInput style={styles.inputStyle} onBlur={leaveInput} value={searchValue} onChangeText={changeSearchValue} placeholder='chercher ici...'/>
            <TouchableOpacity>
            <EvilIcons name='search' size={24} style={styles.iconStyle}/>
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer:
        {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            color: Color.blanc,
            borderWidth: 1,
            backgroundColor: Color.blanc,
            borderRadius: 20

        },
    inputStyle:{
        width:'80%',
        paddingBottom: 5,
        color:Color.dark,
        borderColor: Color.blanc
    },
    iconStyle:{
        color:Color.dark
    }
})

export default AppSearchBar;