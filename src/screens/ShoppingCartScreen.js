import React, {useEffect, useCallback, useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native'
import CartListFooter from "../components/shoppingCart/CartListFooter";
import dayjs from "dayjs";


import CartItem from "../components/shoppingCart/CartItem";
import AppText from "../components/AppText";
import {getSelected, loadPayements} from '../store/slices/payementSlice'
import CartListHeader from "../components/shoppingCart/CartListHeader";
import routes from "../navigation/routes";
import {addToOrder} from '../store/actionsCreators/orderActionCreator'
import {changeItemQuantity} from '../store/actionsCreators/shoppingCartActionCreator'
import {loadPlans} from "../store/slices/planSlice";
import AppInput from "../components/AppInput";
import AppDateTimePicker from "../components/AppDateTimePicker";
import AppButton from "../components/AppButton";
import {getCartItemDelete, setItemServiceMontant} from "../store/slices/shoppingCartSlice";

function ShoppingCartScreen({navigation}) {
    const dispatch = useDispatch();
    const store = useStore()
    const totalAmount = useSelector(state => state.entities.shoppingCart.totalAmount);
    const itemsLenght = useSelector(state => state.entities.shoppingCart.itemsLenght);
    const cartType = useSelector(state => state.entities.shoppingCart.type)
    const payements = useSelector(state => state.entities.payement.list)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [dateMode, setDateMode] = useState('date')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [serviceMontant, setServiceMontant] = useState()

    const items = useSelector(state => {
        const itemsTransformed = [];
        if (itemsLenght>=1){
            for(key in state.entities.shoppingCart.items) {
                itemsTransformed.push({
                    id: key,
                    libelle: state.entities.shoppingCart.items[key].libelle,
                    image: state.entities.shoppingCart.items[key].image,
                    quantite: state.entities.shoppingCart.items[key].quantite,
                    prix: state.entities.shoppingCart.items[key].prix,
                    montant: state.entities.shoppingCart.items[key].montant,
                    caution: state.entities.shoppingCart.items[key].caution,
                    montantMin: state.entities.shoppingCart.items[key].montantMin,
                    montantMax: state.entities.shoppingCart.items[key].montantMax,
                })
            };
        }

        return itemsTransformed;
    });

    const changeTheDate = (event, currentSelecteddate) => {
        const currentDate = currentSelecteddate || selectedDate
        setShowDatePicker(Platform.OS === 'ios');
        setSelectedDate(currentDate)

    }

    const showMode = (currentMode) => {
        setShowDatePicker(true)
        setDateMode(currentMode)
    }

    const showDate = () => {
        showMode('date')
    }

    const showTime = () => {
        showMode('time')
    }



    const getPlans =  useCallback(async () => {
        await dispatch(loadPlans())
    }, [dispatch])


    useEffect(() => {
        getPlans();
        dispatch(loadPayements())
        if(payements.length >= 1) {
        dispatch(getSelected(1))
        }
    }, [dispatch]);

    if (items.length === 0) {
        return <View style={styles.emptyListStyle}>
            <AppText>Votre panier est vide, vous pouvez y ajouter des articles.</AppText>
        </View>
    }

    if (cartType === 'e-service') {
        return (
            <ScrollView>
                <CartListHeader min={true} max={true}/>
               <CartItem deleteItem={() => dispatch(getCartItemDelete(items[0]))} designation={items[0].libelle} source={{uri: items[0].image}}
               min={true} max={true} montantMin={items[0].montantMin} montantMax={items[0].montantMax} icon={true}/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <AppText style={{fontSize: 18, fontWeight: 'bold'}}>Montant à payer: </AppText>
                    <AppInput keyboardType='number-pad' value={serviceMontant} onChangeText={(newValue) => {
                        setServiceMontant(newValue)
                    }
                    }/>
                    <View>
                        <AppButton style={{padding: 5}} title='Appliquer' onPress={() => {
                           const montant = Number(serviceMontant)
                            dispatch(setItemServiceMontant(montant))
                        }}/>
                    </View>
                </View>
                <View style={{flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around'
                }} >
                    <AppDateTimePicker dateValue={selectedDate}
                    showPicker={showDatePicker} dateMode={dateMode}
                    dateTimeId='dateTimePicker' getDate={showDate} getTime={showTime}
                    changeDate={(e, date) =>changeTheDate(e, date)}/>
                    <View>
                        <AppText style={{fontSize: 18, fontWeight: 'bold'}}>{dayjs(selectedDate).format('DD/MM/YYYY HH:mm:ss')}</AppText>
                    </View>
                </View>
               <CartListFooter buttonIsDisabled={!totalAmount || totalAmount === 0} getOrder={() => {
                   const shoppingType = store.getState().entities.shoppingCart.type
                   dispatch(addToOrder(items, itemsLenght, totalAmount, shoppingType, selectedDate.getTime()))
                   navigation.navigate(routes.ORDER_PAYEMENT)
               }} totalAmount={totalAmount}/>
            </ScrollView>
        )
    }

    return (
        <View style={styles.mainContainer}>
       <FlatList ListHeaderComponent={() => <CartListHeader prix={true} quantite={true} montant={true}/>}
                 ListFooterComponent={() => <CartListFooter totalAmount={totalAmount} getOrder={() =>{
                     const shoppingType = store.getState().entities.shoppingCart.type
                     dispatch(addToOrder(items, itemsLenght, totalAmount, shoppingType))
                     navigation.navigate(routes.ORDER_PAYEMENT)}}/>} data={items}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({item}) => <CartItem deleteItem={() => dispatch(getCartItemDelete(item))} quantite={true} montant={true} price={true}  designation={item.libelle} itemQuantite={item.quantite} quantityDecrement={() => {
                     const newQuantite = item.quantite- 1
                     dispatch(changeItemQuantity(item.id, newQuantite))
                 }} quantityIncrement={() => {
                     const newQuantity = item.quantite + 1
                     dispatch(changeItemQuantity(item.id, newQuantity))
                 }}
                             source={{uri: item.image}} itemBtnFirst='Détail'
                             itemBtnSecond='Supprimer' itemPrice={item.prix}
                              itemAmount={item.montant}
                 activeDecrement={cartType == 'e-commerce'} activeIncrement={cartType == 'e-commerce'}/>}
       />

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 30,
        paddingTop: 20
    },
    emptyListStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


})

export default ShoppingCartScreen;