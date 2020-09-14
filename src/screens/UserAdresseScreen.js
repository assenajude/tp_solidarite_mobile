import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet, FlatList} from 'react-native'
import {useSelector, useDispatch} from "react-redux";

import AppText from "../components/AppText";
import ListFooter from "../components/list/ListFooter";
import routes from "../navigation/routes";

function UserAdresseScreen({navigation}) {
    const userAdresses = useSelector(state => state.entities.userAdresse.list)

    useEffect(() => {
        console.log(userAdresses);
    })

    return (
        <View>
            <AppText>User adresse screen her</AppText>
            <ListFooter onPress={() =>navigation.navigate(routes.NEW_USER_ADDRESS)}/>
        </View>
    );
}

export default UserAdresseScreen;