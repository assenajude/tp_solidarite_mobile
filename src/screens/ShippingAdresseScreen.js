import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {View, FlatList, StyleSheet} from 'react-native'
import AppText from "../components/AppText";
import ListFooter from "../components/list/ListFooter";
import routes from "../navigation/routes";
import ListItem from "../components/list/ListItem";
import ItemSeparator from "../components/list/ItemSeparator";

function ShippingAdresseScreen({navigation}) {
    const dispatch = useDispatch();
    const shippingAdresses = useSelector(state =>  state.entities.shippingAddress.list)

    useEffect(() => {
    }, [])


    return (
        <View style={styles.container}>
            <FlatList ItemSeparatorComponent={ItemSeparator} data={shippingAdresses} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <ListItem propriety1={item.id} propriety2={item.region}
                                                        propriety3={item.ville} propriety4={`${item.kilometrage}  Kilometres`}/>}/>

            <ListFooter otherStyle={styles.buttonStyle} onPress={() => navigation.navigate(routes.NEW_SHIPPING)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonStyle: {
        alignSelf: 'flex-end',
        margin: 60
    }
})

export default ShippingAdresseScreen;