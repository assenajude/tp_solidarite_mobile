import React from 'react';
import {useSelector} from 'react-redux'
import {View, Text,FlatList, StyleSheet} from 'react-native';

import * as planActions from '../store/actions/planActions';
import ListFooter from "../components/list/ListFooter";
import routes from '../navigation/routes'
import PlanListItem from "../components/plan/PlanListItem";
import ItemSeparator from "../components/list/ItemSeparator";

function PlanScreen({navigation}) {

    const plans = useSelector(state => state.plan.plans)


    return (
        <View style={styles.container}>
        <View >
            <FlatList ItemSeparatorComponent={ItemSeparator} data={plans} keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <PlanListItem prop1={item.id} prop2={item.libelle} prop3={item.descripPlan} />}
            />
        </View>
            <View style={styles.addButton}>
                <ListFooter onPress={() =>navigation.navigate(routes.NEW_PLAN)}/>
            </View>
       </View>
);
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
        top: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        bottom: 80,
        right: 50
    }

})

export default PlanScreen;