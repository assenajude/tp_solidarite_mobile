import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {View, ScrollView, StyleSheet, FlatList} from 'react-native'
import ListFooter from "../components/list/ListFooter";
import routes from "../navigation/routes";
import ItemSeparator from "../components/list/ItemSeparator";
import ListItem from "../components/list/ListItem";
import AppText from "../components/AppText";

function PointRelaisScreen({navigation}) {
    const pointsRelais = useSelector(state => state.entities.pointRelais.list)

    return (
        <View style={styles.container}>
          {pointsRelais.length > 1 &&  <FlatList ItemSeparatorComponent={ItemSeparator} data={pointsRelais} keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ListItem propriety1={item.nom} propriety2={item.contact} propriety3={item.adresse} propriety4={item.email}/>}/>}
            <View>
                <AppText>Aucun point relais trouvé</AppText>
            </View>
            <ListFooter otherStyle={styles.buttonStyle} onPress={() => navigation.navigate(routes.NEW_POINT_RELAIS)}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonStyle: {
        alignSelf: 'flex-end'
    }
})
export default PointRelaisScreen;