import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {View, FlatList, StyleSheet, ScrollView} from 'react-native'
import CartListFooter from "../components/shoppingCart/CartListFooter";
import dayjs from "dayjs";


import CartItem from "../components/shoppingCart/CartItem";
import AppText from "../components/AppText";
import CartListHeader from "../components/shoppingCart/CartListHeader";
import routes from "../navigation/routes";
import {addToOrder} from '../store/actionsCreators/orderActionCreator'
import AppInput from "../components/AppInput";
import AppDateTimePicker from "../components/AppDateTimePicker";
import AppButton from "../components/AppButton";
import {
    getCartItemDelete,
    getItemQtyDecrement,
    getItemQtyIncrement,
    setItemServiceMontant
} from "../store/slices/shoppingCartSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";

function ShoppingCartScreen({navigation}) {
    const dispatch = useDispatch();
    const store = useStore()
    const totalAmount = useSelector(state => state.entities.shoppingCart.totalAmount);
    const itemsLenght = useSelector(state => state.entities.shoppingCart.itemsLenght);
    const cartType = useSelector(state => state.entities.shoppingCart.type)
    const isLoading = useSelector(state => state.entities.shoppingCart.loading)
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [dateMode, setDateMode] = useState('date')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [serviceMontant, setServiceMontant] = useState()

    const items = useSelector(state => {
        const itemsTransformed = [];
        if (itemsLenght>=1){
            const cartItems = state.entities.shoppingCart.items
            for(key in cartItems ) {
                itemsTransformed.push({
                    id: key,
                    libelle: cartItems[key].designArticle || cartItems[key].libelleLocation || cartItems[key].libelle ,
                    image:cartItems[key].CartItem.itemType === 'article'? cartItems[key].imagesArticle[0]:cartItems[key].CartItem.itemType ==='location'?cartItems[key].imagesLocation[0]: cartItems[key].imagesService[0],
                    quantite: cartItems[key].CartItem.quantite,
                    frequence: cartItems[key].frequenceLocation || '',
                    prix: cartItems[key].CartItem.prix || 0,
                    montant: cartItems[key].CartItem.montant,
                    caution: cartItems[key].nombreCaution || 0,
                    montantMin: cartItems[key].montantMin || 0,
                    montantMax: cartItems[key].montantMax || 0,
                    typeCmde: cartItems[key].CartItem.itemType,
                    aide: cartItems[key].aide || '',
                    shoppingCartId: cartItems[key].CartItem.shoppingCartId
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

    const handleDeleteItem = (item) => {
        const itemData = {
            id: item.id,
            libelle: item.libelle,
            image: item.image,
            prix: item.prix,
            quantite: 1,
            montant: item.prix,
            couleur: item.couleur,
            taille: item.taille,
            typeCmde: item.typeCmde,
            shoppingCartId: item.shoppingCartId,
        }
        dispatch(getCartItemDelete(itemData))

    }

    const handleUpdateMontant = (item, montant) => {
        if(montant<item.montantMin || montant>item.montantMax) {
           return  alert(`Le montant doit etre compris entre ${item.montantMin} et ${item.montantMax}`)
        }
        const itemData = {...item, montant}
        dispatch(setItemServiceMontant(itemData))
    }

    const getQuantiteInStock = (item) => {
        const typeOrder = item.typeCmde
        let quantite = 0
        if(typeOrder.toLowerCase() === 'article') {
           const  listArticles = store.getState().entities.article.availableArticles
            const selected = listArticles.find(article => article.id === Number(item.id))
            quantite = selected.qteStock
        } else {
        const locationList = store.getState().entities.location.list
        const selectedLocation = locationList.find(location => location.id === Number(item.id))
        quantite = selectedLocation.qteDispo
        }
        return quantite
    }

    const checkIfCartIsNotOutOfStock = () => {
        let cartIsvalide = 0
        items.forEach(item => {
            const itemQte = item.quantite
            if(itemQte>0) cartIsvalide ++
        })
        if(cartIsvalide>0) return true
        return false
    }

    useEffect(() => {
    }, [])

    if (items.length === 0) {
        return <View style={styles.emptyListStyle}>
            <AppText>Votre panier est vide, vous pouvez y ajouter des articles.</AppText>
        </View>
    }

    if (cartType === 'service') {
        return (
            <>
                <AppActivityIndicator visible={isLoading}/>
            <ScrollView>
                <CartListHeader min={true} max={true}/>
               <CartItem showItemDetails={() => navigation.navigate(routes.SERVICE_DETAIL, items[0])} deleteItem={() => handleDeleteItem(items[0])} designation={items[0].libelle} source={{uri: items[0].image}}
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
                            handleUpdateMontant(items[0],montant)
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
               <CartListFooter readyToGo={itemsLenght>=1 && totalAmount>0} getOrder={() => {
                   dispatch(addToOrder(items, itemsLenght, totalAmount,cartType, selectedDate.getTime()))
                   navigation.navigate(routes.ORDER_PAYEMENT)
               }} totalAmount={totalAmount}/>
            </ScrollView>
                </>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <AppActivityIndicator visible={isLoading}/>
       <FlatList ListHeaderComponent={() => <CartListHeader prix={true} quantite={true} montant={true}/>}
                 data={items} keyExtractor={(item) => item.id.toString()}
                 renderItem={({item}) =>
                     <CartItem itemType={cartType} caution={item.caution} frequence={item.frequence} notInStock={getQuantiteInStock(item) === 0} deleteItem={() => handleDeleteItem(item)} quantite={true} montant={true} price={true}  designation={item.libelle} itemQuantite={item.quantite}
                               quantityDecrement={() => {dispatch(getItemQtyDecrement(item))}}
                               quantityIncrement={() => {dispatch(getItemQtyIncrement(item))}}
                               source={{uri: item.image}} itemBtnFirst='Détail'
                               itemBtnSecond='Supprimer' itemPrice={item.prix}
                              itemAmount={item.montant}
                              activeDecrement={cartType == 'article'} disabledDecrement={item.quantite === 1}
                               activeIncrement={cartType == 'article'} disabledIncrement={item.quantite === getQuantiteInStock(item)}/>}
                 ListFooterComponent={() =>
                     <CartListFooter totalAmount={totalAmount} getOrder={() =>{
                     const shoppingType = store.getState().entities.shoppingCart.type
                     dispatch(addToOrder(items, itemsLenght, totalAmount, shoppingType))
                     navigation.navigate(routes.ORDER_PAYEMENT)}} readyToGo={itemsLenght>=1 && totalAmount>0 && checkIfCartIsNotOutOfStock()}/>}
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