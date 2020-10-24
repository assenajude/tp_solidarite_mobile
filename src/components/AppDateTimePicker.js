import React from 'react';
import {ScrollView, View, Platform, Button} from "react-native";
import DateTimePicker  from '@react-native-community/datetimepicker'
import AppButton from "./AppButton";
import colors from "../utilities/colors";

function AppDateTimePicker({getDate, getTime,changeDate,dateValue,dateMode, showPicker, dateTimeId}) {
    return (
        <View>
            <View style={{margin: 10}}>
                <AppButton iconSize={20} style={{padding: 5}} textStyle={{fontSize: 18, marginLeft: 5}} iconName='calendar' iconColor={colors.blanc} title='Date' onPress={getDate}/>
            </View>
            <View style={{margin: 10}}>
                <AppButton iconColor={colors.blanc} textStyle={{fontSize: 18, marginLeft: 5}} iconSize={20} style={{padding: 5}} iconName='hourglass' title="Heure" onPress={getTime} />
            </View>
            {showPicker && <DateTimePicker
                              testID={dateTimeId}
                              value={dateValue}
                              mode={dateMode}
                             is24Hour={true}
                             display='default'
                             onChange={changeDate}/>}
        </View>
    );
}

export default AppDateTimePicker;