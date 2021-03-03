import React, {useEffect} from 'react';
import {TouchableHighlight, FlatList} from 'react-native'
import AppText from "./AppText";

function AppListSelection({dataList, currentValue}) {

    const filteredData = (val) => dataList.filter(data => data.includes(val))
useEffect(() => {
    filteredData(currentValue)
}, [currentValue])

    return (
        <FlatList data={filteredData(currentValue)} keyExtractor={item => item.toString()}
        renderItem={({item}) =>
            <TouchableHighlight>
                <AppText>{item}</AppText>
            </TouchableHighlight>
        }/>
    );
}

export default AppListSelection;