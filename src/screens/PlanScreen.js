import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux'
import {View, FlatList, StyleSheet} from 'react-native';

import ListFooter from "../components/list/ListFooter";
import routes from '../navigation/routes'
import PlanListItem from "../components/plan/PlanListItem";
import AppText from "../components/AppText";
import {Picker} from "@react-native-community/picker";
import {getSelected} from '../store/slices/payementSlice'
import useAuth from "../hooks/useAuth";

function PlanScreen({navigation}) {

    const dispatch = useDispatch();
    const {userRoleAdmin} = useAuth()

    const payements = useSelector(state => state.entities.payement.list);
    const plansOfPayement = useSelector(state => state.entities.payement.payementPlans)
    const [currentPayement, setCurrentPayement] = useState(1);

    useEffect(() => {
        dispatch(getSelected(1))
    }, [])

    return (
        <>
            <View style={styles.payementStyle}>
                <AppText style={{fontWeight: 'bold'}}>Mode Payement: </AppText>
                <Picker style={{height: 50, width: 120}} mode='dropdown' selectedValue={currentPayement} onValueChange={(value) => {
                    dispatch(getSelected(value));
                    setCurrentPayement(value);
                }}>
                    {payements.map((payement, index) => <Picker.Item label={payement.mode} value={payement.id} key={index}/>)}
                </Picker>
            </View>


            <FlatList data={plansOfPayement} keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <PlanListItem planImage={{uri: item.imagesPlan[0]}} imageDispo={item.imagesPlan.length>0}
                                                  label={item.libelle} description={item.descripPlan}
                                                  getPlanDetail={() => navigation.navigate('AccueilNavigator', {screen: 'PlanDetailScreen', params: item})}
                                                  onPress={() => navigation.navigate('AccueilNavigator', {screen: 'PlanDetailScreen', params: item})}/>}
            />
            {plansOfPayement.length === 0 && <View style={styles.emptyPlans}><AppText>Aucun plan trouvé</AppText></View>}

            {userRoleAdmin() && <View style={styles.addButton}>
                <ListFooter onPress={() =>navigation.navigate('AccueilNavigator',{screen: routes.NEW_PLAN})}/>
            </View>}
       </>
);
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        bottom: 60,
        right: 50
    },
    emptyPlans: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    payementStyle: {
        flexDirection: 'row',
        top: 20
    }

})

export default PlanScreen;