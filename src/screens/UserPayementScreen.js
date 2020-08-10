import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

import routes from '../navigation/routes'
import ListFooter from "../components/list/ListFooter";

function UserPayementScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View>
                <Text>List of content her</Text>
            </View>
            <View style={styles.buttonStyle}>
                <ListFooter onPress={() =>navigation.navigate(routes.NEW_USER_PAYEMENT)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    },
    buttonStyle: {
        alignSelf: 'flex-end'

    }
})

export default UserPayementScreen;