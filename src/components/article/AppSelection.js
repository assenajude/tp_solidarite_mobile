import React, {useState} from 'react';
import {StyleSheet } from 'react-native'
import {Picker} from '@react-native-community/picker'

function AppSelection(props) {
const [selected, setSelected] = useState('Tous')
    return (
        <Picker style={styles.pickerStyle}
        selectedValue={selected}
        onValueChange={(item) => setSelected(item)}>
            <Picker.Item label='Article' value='article'/>
            <Picker.Item label='Location' value='location'/>
        </Picker>
    );
}

const styles = StyleSheet.create({
    pickerStyle:{
        height: 40,
        width: 70
    }
})

export default AppSelection;