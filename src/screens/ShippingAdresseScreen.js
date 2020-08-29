import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, FlatList} from 'react-native'
import AppText from "../components/AppText";

function ShippingAdresseScreen(props) {
    const dispatch = useDispatch();
    const shippingAdresses = useSelector(state =>  state.entities.shippingAddress.list)

    useEffect(() => {
    }, [])


    return (
        <View>
            <FlatList data={shippingAdresses} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <AppText>{item.region}</AppText>}/>
        </View>
    );
}

export default ShippingAdresseScreen;