import React from 'react';
import {View} from "react-native";
import {Picker} from "@react-native-community/picker";
import AppText from "../AppText";
import {getRoleAdmin} from "../../store/selectors/authSelector";
import {useStore} from "react-redux";

function StatusPicker({labelStatus, statusData, statusValue, changeStatusValue, otherStatusStyle}) {
    const store = useStore()
    return (
        <View style={{
            flexDirection: 'row'
        }}>
            <AppText style={{fontWeight: 'bold', fontSize: 15}}>{labelStatus}: </AppText>
            {getRoleAdmin(store.getState()) && <Picker style={[{height: 50, width: 150}, otherStatusStyle]} selectedValue={statusValue} onValueChange={(value) => changeStatusValue(value)}>
                {statusData.map((item, index) =><Picker.Item label={item} value={item} key={index.toString()}/>)}
            </Picker>}
            {!getRoleAdmin(store.getState()) && <AppText>{statusValue}</AppText>}
        </View>
    );
}

export default StatusPicker;