import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {View, Text,FlatList, StyleSheet} from 'react-native';

import ListFooter from "../components/list/ListFooter";
import routes from '../navigation/routes'
import PlanListItem from "../components/plan/PlanListItem";
import ItemSeparator from "../components/list/ItemSeparator";
import {loadPlans} from "../store/slices/planSlice";
import AppText from "../components/AppText";
import {Picker} from "@react-native-community/picker";
import {getSelected, changePlan} from '../store/slices/payementSlice'

function PlanScreen({navigation}) {

    const dispatch = useDispatch();

    const plans = useSelector(state => state.entities.plan.list);
    const selectedPayment = useSelector(state => state.entities.payement.selectedPayement);
    const payements = useSelector(state => state.entities.payement.list);
    const plansOfPayement = useSelector(state => state.entities.payement.payementPlans)
    const [refreshList, setRefreshList] = useState(false)
    const [currentPayement, setCurrentPayement] = useState(selectedPayment.id);
    const currentPlan = useSelector(state => state.entities.payement.currentPlan);
    const [planChecked, setPlanChecked] = useState(false)

    const loadPlan = useCallback(async () => {
        await dispatch(loadPlans());
    }, [dispatch]);

  const getPlansPayement = () => {
        return selectedPayment.plans
  }

  const planSelected = (idPlan) => {
      console.log(idPlan)
  }

    useEffect(() => {
    }, [dispatch, selectedPayment, currentPayement, plansOfPayement])

    return (
        <View style={styles.container}>
            <View style={styles.payementStyle}>
                <AppText style={{fontWeight: 'bold'}}>Mode Payement: </AppText>
                <Picker style={{height: 50, width: 120}} mode='dropdown' selectedValue={currentPayement} onValueChange={(value) => {
                    dispatch(getSelected(value));
                    setCurrentPayement(value);
                }}>
                    {payements.map((payement, index) => <Picker.Item label={payement.mode} value={payement.id} key={index}/>)}
                </Picker>
            </View>

        <View >
            <FlatList ItemSeparatorComponent={ItemSeparator} data={plansOfPayement} keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <PlanListItem prop1={item.id} prop2={item.libelle}
                                                  prop3={item.descripPlan} onPress={() => {
                                                      dispatch(changePlan(item))
                                                  }}
                                                  showIcon={item.showIcon}/>}
            />
            {plansOfPayement.length === 0 && <View style={styles.emptyPlans}><AppText>Aucun plan trouvé</AppText></View>}
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
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        bottom: 80,
        right: 50
    },
    emptyPlans: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    payementStyle: {
        flexDirection: 'row'
    }

})

export default PlanScreen;