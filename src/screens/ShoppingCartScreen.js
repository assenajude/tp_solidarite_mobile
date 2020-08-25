import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native'
import {useSelector} from 'react-redux';
import CartListFooter from "../components/shoppingCart/CartListFooter";


import CartItem from "../components/shoppingCart/CartItem";
import AppText from "../components/AppText";
import Color from '../utilities/colors'
import * as shoppingCartActions from '../store/actions/shoppingCartActions'
import CartListHeader from "../components/shoppingCart/CartListHeader";
import routes from "../navigation/routes";
import {addToOrder} from '../store/actionsCreators/orderActionCreator'
import {changeItemQuantity} from '../store/actionsCreators/shoppingCartActionCreator'

function ShoppingCartScreen({navigation}) {
    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.entities.shoppingCart.totalAmount);
    const itemsLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)

    const items = useSelector(state => {
        const itemsTransformed = [];
        for(key in state.entities.shoppingCart.items) {
            itemsTransformed.push({
                id: key,
                libelle: state.entities.shoppingCart.items[key].libelle,
                image: state.entities.shoppingCart.items[key].image,
                quantite: state.entities.shoppingCart.items[key].quantite,
                prix: state.entities.shoppingCart.items[key].prix,
                montant: state.entities.shoppingCart.items[key].montant
            })
        };
        return itemsTransformed;
    });

    useEffect(() => {
    }, []);

    if (items.length === 0) {
        return <View style={styles.emptyListStyle}>
            <AppText>Votre panier est vide, vous pouvez y ajouter des articles.</AppText>
        </View>
    }

    return (
        <View style={styles.mainContainer}>
       <FlatList ListHeaderComponent={() => <CartListHeader/>}
                 ListFooterComponent={() => <CartListFooter totalAmount={totalAmount} getOrder={() =>{
                     dispatch(addToOrder(items, itemsLenght, totalAmount))
                     navigation.navigate(routes.ORDER)}}/>} data={items}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({item}) => <CartItem designation={item.libelle} itemQuantite={item.quantite} changeQuantite={(itemValue, index) => {
                     dispatch(changeItemQuantity(item.id, itemValue))
                 }}
                             source={{uri: item.image}} itemBtnFirst='Détail'
                             itemBtnSecond='Supprimer' itemPrice={item.prix}
                              itemAmount={item.montant}
                 />}
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